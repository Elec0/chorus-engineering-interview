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
}