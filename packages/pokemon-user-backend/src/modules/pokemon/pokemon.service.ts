import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from "../database/entities/pokemon.entity";

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    // Temporary static data
    return [
      {
        id: 1, name: 'Bulbasaur',
        type: "grass"
      },
      {
        id: 2, name: 'Ivysaur',
        type: "grass"
      },
      {
        id: 3, name: 'Venusaur',
        type: "grass"
      },
    ];
    // return this.pokemonRepository.find();
  }

  async create(pokemonData: Partial<Pokemon>): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(pokemonData);
    return this.pokemonRepository.save(pokemon);
  }
}