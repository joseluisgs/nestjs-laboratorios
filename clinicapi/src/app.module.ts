import { Module } from '@nestjs/common'
import { PatientsModule } from './patients/patients.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // Cargamos los ficheros de .env
    ConfigModule.forRoot({
      envFilePath: ['.prod.env', '.test.env', '.env'],
    }),
    PatientsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
