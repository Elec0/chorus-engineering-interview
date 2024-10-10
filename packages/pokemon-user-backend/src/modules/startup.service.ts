import { Injectable, Logger } from '@nestjs/common';
import { PokemonService } from "./pokemon/pokemon.service";

@Injectable()
export class StartupService {
  private readonly logger = new Logger(StartupService.name);

  constructor(private readonly pokemonService: PokemonService) {}
  async runOnStartup() {
    this.logger.log('Running startup tasks...');
    await this.checkAndInsertPokemon();
  }

  private async checkAndInsertPokemon() {
    const pokemonList = await this.pokemonService.findAll();
    const requiredPokemon = [
      { id: 1, name: 'Bulbasaur', type: 'grass' },
      { id: 2, name: 'Ivysaur', type: 'grass' },
      { id: 3, name: 'Venusaur', type: 'grass' },
    ];

    for (const pokemon of requiredPokemon) {
      if (!pokemonList.some((p) => p.name === pokemon.name)) {
        await this.pokemonService.create(pokemon);
        this.logger.log(`Inserted ${pokemon.name} into the database.`);
      }
    }
  }
}
