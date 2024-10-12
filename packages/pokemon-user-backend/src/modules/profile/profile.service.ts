import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Profile } from '../database/entities/profile.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreateProfileDto } from './dto/create-profile.dto';

/**
 * Business logic for the Profile module.
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly pokemonService: PokemonService
  ) {}

  /**
   * Find all the pokemon associated with a profile by the profile's ID.
   *
   * This method retrieves a profile by its ID and then returns the list of Pokémon associated with that profile.
   * @param profileId
   * @returns the full pokemon objects for each of the Pokémon IDs associated with the profile.
   */
  async findProfilePokemon(profileId: number): Promise<Pokemon[]> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['pokemon'],
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    const pokemonIds = profile.pokemon.map((p) => p.id);
    return this.pokemonService.findByIds(pokemonIds);
  }

  /** Get all of the profiles in the database. */
  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  /** Get a profile by ID. */
  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  /** Create a new profile by name. */
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  /** Delete a profile by ID. */
  async delete(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }

  /**
   * Assigns a list of Pokémon to an existing profile.
   *
   * @param profileId - The ID of the profile to which Pokémon will be assigned.
   * @param pokemonIds - An array of Pokémon IDs to be assigned to the profile.
   * @returns A promise that resolves to the updated Profile object.
   * @throws Will throw an error if the profile is not found.
   */
  async assignPokemon(
    profileId: number,
    pokemonIds: number[]
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['pokemon'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (profile.pokemon.length + pokemonIds.length > 6) {
      throw new BadRequestException('Cannot assign more than 6 Pokémon to a profile');
    }
    
    const pokemon = await this.pokemonRepository.findByIds(pokemonIds);
    profile.pokemon = [...profile.pokemon, ...pokemon];
    return this.profileRepository.save(profile);
  }
}
