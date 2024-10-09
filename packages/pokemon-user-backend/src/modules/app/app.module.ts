import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { ProfileModule } from "../profile/profile.module";
import { PokemonModule } from "../pokemon/pokemon.module";

@Module({
  imports: [DbModule, ProfileModule, PokemonModule],
})
export class AppModule {}
