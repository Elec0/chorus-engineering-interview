import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  Logger,
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
  private readonly logger = new Logger(ProfileController.name);

  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll() ?? {};
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  /**
   * 
   * @param id Profile ID
   * @returns Array of `Pokemon` objects associated with the profile
   */
  @Get(':id/pokemon')
  findProfilePokemon(@Param('id') id: number) {
    return this.profileService.findProfilePokemon(id);
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    this.logger.debug(`Creating profile with name: ${createProfileDto.name}`);
    return this.profileService.create(createProfileDto);
  }

  @Put(':id/pokemon')
  assignPokemon(@Param('id') id: number, @Body() pokemonIds: number[]) {
    this.logger.debug(`Assigning to profile (${id}): ${pokemonIds}`);
    return this.profileService.assignPokemon(id, pokemonIds);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.logger.debug(`Deleting profile with ID: ${id}`);
    return this.profileService.delete(id);
  }
}
