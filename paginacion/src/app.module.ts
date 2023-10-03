import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ResourcesModule } from './resources/resources.module'
import { City } from './resources/cities/models/city.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from './resources/countries/entities/country.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Sequelize
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'database',
      autoLoadModels: true, // carregando as models automaticamente
      // models: [`${__dirname}/**/*.model{.ts,.js}`], // carregando as models automaticamente
      models: [City],
      synchronize: process.env.NODE_ENV === 'development',
      logging:
        process.env.NODE_ENV === 'development'
          ? (sql, timing) => Logger.debug(`${sql} - ${timing}`)
          : false,
    }),
    // TypeOrm
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'database',
      autoLoadEntities: true,
      entities: [Country],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development' ? 'all' : false,
    }),
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
