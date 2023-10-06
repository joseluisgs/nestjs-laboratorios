import { Module } from '@nestjs/common'
import { ImagesModule } from './resources/images/images.module'
import { ConfigModule } from '@nestjs/config'
import { ProcessorModule } from './resources/processor/processor.module'

@Module({
  imports: [
    // Siempre leemos el módulo de configuración el primero, pues puede contener
    // información que necesitemos en otros módulos
    ConfigModule.forRoot(),
    ImagesModule,
    ProcessorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
