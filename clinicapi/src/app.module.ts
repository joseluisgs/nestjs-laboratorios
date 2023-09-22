import { Module } from '@nestjs/common'
import { PatientsModule } from './resources/patients/patients.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { HealthCheckModule } from './resources/health-check/health-check.module'

@Module({
  imports: [
    // Cargamos los ficheros de .env
    ConfigModule.forRoot({
      envFilePath: ['.prod.env', '.test.env', '.env'],
    }),
    PatientsModule,
    DatabaseModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
