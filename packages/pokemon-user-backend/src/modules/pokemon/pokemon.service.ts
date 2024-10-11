import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const newPokemon = this.pokemonRepository.create(createPokemonDto);
    return this.pokemonRepository.save(newPokemon);
  }

  async count(): Promise<number> {
    return this.pokemonRepository.count();
  }
}