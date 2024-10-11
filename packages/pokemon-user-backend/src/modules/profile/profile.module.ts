import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from "../database/entities/profile.entity";
import { PokemonModule } from "../pokemon/pokemon.module";
import { Pokemon } from "../database/entities/pokemon.entity";
import { PokemonService } from "../pokemon/pokemon.service";

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Pokemon]), PokemonModule],
  providers: [ProfileService, PokemonService],
  controllers: [ProfileController],
  exports: [TypeOrmModule],
})
export class ProfileModule {}