import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Put(':id/pokemons')
  assignPokemon(@Param('id') id: number, @Body() pokemonIds: number[]) {
    return this.profileService.assignPokemon(id, pokemonIds);
  }
}
