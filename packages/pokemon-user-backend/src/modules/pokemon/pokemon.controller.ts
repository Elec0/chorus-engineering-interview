import { Controller, Get, Param } from '@nestjs/common';
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
   * @returns Array of Pokemon objects
   */
  @Get(':ids')
  findByIds(@Param('ids') ids: string) {
    // TODO: Malformed input handling
    const idList = ids.split(',').map((id) => parseInt(id, 10));
    return this.pokemonService.findByIds(idList);
  }
}