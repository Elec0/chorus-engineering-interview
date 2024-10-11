import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePokemonDto } from './pokemon.interface';
import { Pokemon } from "../database/entities/pokemon.entity";

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  async findByName(name: string): Promise<Pokemon | undefined> {
    return this.pokemonRepository.findOne({ where: { name } });
  }

  /**
   * Retrieve full pokemon data for the provided IDs.
   * @param ids Pokemon ID numbers
   * @returns 
   */
  async findByIds(ids: number[]): Promise<Pokemon[]> {
    return this.pokemonRepository.find({ where: { id: In(ids)} });
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const newPokemon = this.pokemonRepository.create(createPokemonDto);
    return this.pokemonRepository.save(newPokemon);
  }

  async count(): Promise<number> {
    return this.pokemonRepository.count();
  }
}