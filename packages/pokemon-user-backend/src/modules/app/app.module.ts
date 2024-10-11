import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
// import { ProfileModule } from "../profile/profile.module";
import { PokemonModule } from "../pokemon/pokemon.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { StartupService } from "../startup.service";
import { PokemonService } from "../pokemon/pokemon.service";
import { ProfileModule } from "../profile/profile.module";
import { ProfileService } from "../profile/profile.service";

@Module({
  imports: [DbModule, ProfileModule, PokemonModule],
  providers: [StartupService, PokemonService, ProfileService],
})
export class AppModule {}
