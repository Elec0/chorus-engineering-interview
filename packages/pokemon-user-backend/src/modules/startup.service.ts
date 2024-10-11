import { Injectable, Logger } from '@nestjs/common';
import { Pokemon } from './database/entities/pokemon.entity';
import { PokemonService } from './pokemon/pokemon.service';
import { CreatePokemonDto } from './pokemon/pokemon.interface';

@Injectable()
export class StartupService {
  private readonly logger = new Logger(StartupService.name);
  private readonly maxId = Number(process.env.MAX_POKEMON_ID) || 151;

  constructor(private readonly pokemonService: PokemonService) {}

  async runOnStartup() {
    this.logger.log('Running startup tasks...');
    const isDatabasePopulated = await this.isDatabasePopulated();

    if (!isDatabasePopulated) {
      this.logger.log(
        'Database is not populated. Fetching and inserting Pokémon data...'
      );
      await this.fetchAndInsertAllPokemon(this.maxId);
    } else {
      this.logger.log('Database is already populated with Pokémon data.');
    }
  }

  /**
   * Checks if the database is populated with any Pokémon data.
   */
  private async isDatabasePopulated(): Promise<boolean> {
    const pokemonCount = await this.pokemonService.count();
    return pokemonCount > 0;
  }

  /**
   * Fetches a list of Pokémon up to a specified maximum ID and inserts each Pokémon into the database.
   *
   * This method retrieves Pokémon data from an external source and then iterates through the list,
   * inserting each Pokémon into the database using the `pokemonService.create` method. A log entry
   * is created for each Pokémon inserted.
   *
   * @returns A promise that resolves when all Pokémon have been inserted.
   */
  private async fetchAndInsertAllPokemon(maxId: number): Promise<void> {
    const pokemonList = await this.fetchAllPokemon(maxId);

    for (const pokemon of pokemonList) {
      await this.pokemonService.create(pokemon);
      this.logger.log(
        `Inserted ${pokemon.name} (${pokemon.id}/${maxId}) into the database.`
      );
    }
  }

  /**
   * Fetches a list of Pokémon with detailed information up to the specified maximum ID.
   *
   * @param maxId - The maximum ID of Pokémon to fetch.
   * @returns A promise that resolves to an array of Pokémon objects with detailed information.
   *
   * @example
   * ```typescript
   * const pokemonList = await fetchAllPokemon(150);
   * console.log(pokemonList);
   * // Output: [{ id: 1, name: 'bulbasaur', types: ['grass', 'poison'] }, ...]
   * ```
   */
  private async fetchAllPokemon(maxId: number): Promise<CreatePokemonDto[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${maxId}&offset=0`;
    this.logger.log(`Fetching Pokémon data from ${url}...`);
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    const detailedPokemonList: Pokemon[] = await Promise.all(
      results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        return this.convertToPokemon(pokemonData);
      })
    );

    return detailedPokemonList;
  }

  /**
   * Converts raw Pokémon data from the PokéAPI into a simplified Pokémon object.
   *
   * FUTURE: Handle possible error cases where the data is missing or malformed.
   *
   * @param data
   */
  private convertToPokemon(data): CreatePokemonDto {
    return {
      id: data.id,
      name: data.name,
      types: data.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      // Optional field for pokemon image url
      imageUrl: data?.sprites?.front_default,
    };
  }
}
