import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthCheckModule } from './resources/health-check/health-check.module'
import { SequelizeModule } from '@nestjs/sequelize'

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
      models: [`${__dirname}/**/*.model{.ts,.js}`], // carregando as models automaticamente
      synchronize: process.env.NODE_ENV === 'development',
      logging:
        process.env.NODE_ENV === 'development'
          ? (sql, timing) => Logger.debug(`${sql} - ${timing}`)
          : false,
    }),
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
