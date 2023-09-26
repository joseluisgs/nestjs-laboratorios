import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // le configuramos el logger segun el entorno
    logger:
      process.env.NODE_ENV === 'development'
        ? ['log', 'error', 'warn', 'debug', 'verbose']
        : ['error', 'warn'],
  })
  // le configuramos el prefijo a las rutas
  app.setGlobalPrefix(process.env.API_PREFIX || 'v1')
  // le configuramos el pipe de validacion
  app.useGlobalPipes(new ValidationPipe())
  // iniciamos el servidor
  await app.listen(process.env.PORT || 3000)
  console.log(`🚀 Servidor iniciado en puerto: ${process.env.PORT || 3000}`)
}

bootstrap()
