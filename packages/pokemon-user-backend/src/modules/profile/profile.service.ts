import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Profile } from '../database/entities/profile.entity';
import { Pokemon } from '../database/entities/pokemon.entity';
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
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  /** Get all of the profiles in the database. */
  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
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
      throw new Error('Profile not found');
    }
    
    const pokemon = await this.pokemonRepository.findBy({ id: In(pokemonIds) });
    profile.pokemon = pokemon;
    return this.profileRepository.save(profile);
  }
}
