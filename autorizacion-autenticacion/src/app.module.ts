import { Module } from '@nestjs/common'
import { ResourcesModule } from './resources/resources.module'
import { ConfigModule } from '@nestjs/config'

/**
 * Modulo principal de la aplicacion
 */
@Module({
  // El primer modulo que se carga es el modulo de configuración
  imports: [ConfigModule.forRoot(), ResourcesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
