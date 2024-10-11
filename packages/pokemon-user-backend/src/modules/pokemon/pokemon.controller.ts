import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

/**
 * Controller for the Pokemon module, aka the API endpoints for /api/pokemon.
 */
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  /** 
   * Get pokemon data for the provided IDs. 
   * @param ids Comma-separated list of Pokemon IDs
   */
  @Get(':ids')
  findByIds(ids: string) {
    const idList = ids.split(',').map((id) => parseInt(id, 10));
    return this.pokemonService.findByIds(idList);
  }
}