import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

/**
 * Controller for the Profile module, aka the API endpoints for /api/profiles.
 * 
 * * `GET /api/profiles` - Get all profiles
 * * `POST /api/profiles` - Create a new profile, requires a name in the request body
 * * `PUT /api/profiles/:id/pokemon` - Assign a list of Pokémon to a profile
 * * `DELETE /api/profiles/:id` - Delete a profile by ID
 */
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll() ?? {};
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Put(':id/pokemon')
  assignPokemon(@Param('id') id: number, @Body() pokemonIds: number[]) {
    return this.profileService.assignPokemon(id, pokemonIds);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.profileService.delete(id);
  }
}
