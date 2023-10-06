import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Configuramos Swagger
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Images API')
      .setDescription(
        'API para subida de imágenes y procesamiento de las mismas',
      )
      .setVersion(process.env.API_VERSION || 'v1')
      .addTag('images')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document) // http://localhost:3000/api
  }
  app.setGlobalPrefix(process.env.API_VERSION || 'v1')
  await app.listen(process.env.API_PORT || 3000)
}

bootstrap()
