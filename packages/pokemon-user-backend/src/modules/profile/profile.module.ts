import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from "../database/entities/profile.entity";
import { PokemonModule } from "../pokemon/pokemon.module";

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), PokemonModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [TypeOrmModule],
})
export class ProfileModule {}