import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [PatientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
