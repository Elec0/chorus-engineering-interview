import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Pokemon } from "./entities/pokemon.entity";

@Injectable()
export class DbConfigService {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'pokemon',
      entities: [Pokemon],
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    };
  }
}
