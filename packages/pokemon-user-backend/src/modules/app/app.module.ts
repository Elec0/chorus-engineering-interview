import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
// import { ProfileModule } from "../profile/profile.module";
import { PokemonModule } from "../pokemon/pokemon.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { StartupService } from "../startup.service";
import { PokemonService } from "../pokemon/pokemon.service";

@Module({
  imports: [DbModule, /*ProfileModule,*/ PokemonModule],
  providers: [StartupService, PokemonService],
})
export class AppModule {}
