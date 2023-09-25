import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Configuramos el prefijo de la API
  app.setGlobalPrefix('v1')
  // Configuramos swagger dependiendo del ENV
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Clinic API') // Título de la API
      .setDescription('Clinic REST API') // Descripción de la API
      .setVersion('1.0') // Versión de la API
      .setContact('JLGS', 'https://github.com/joseluisgs', '')
      // Tags a los que pertenecen los endpoints
      .addTag(
        'HealthCheck',
        'endpoint encargado de verificar el status de la API',
      )
      .addTag('Patients', 'Endpoints del recurso pacientes')
      .addTag('Insurances', 'Endpoints del recurso aseguradoras')
      // Añadimos la seguridad de Basic Auth
      .addBasicAuth()
      .build()
    // Generamos la documentación de Swagger
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }
  // Configuramos el uso de validaciones de pipes de manera global
  app.useGlobalPipes(new ValidationPipe())
  // Lanzamos la aplicación en el puerto indicado en el fichero .env
  await app.listen(process.env.PORT || 3000)
  console.log(`🚀 Servidor iniciado en puerto: ${process.env.PORT || 3000}`)
}

bootstrap()
