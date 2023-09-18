import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Swagger Ejemplo')
    .setDescription('Api de ejemplo para documentar con Swagger')
    .setVersion('1.0')
    .addTag('users') // Añadimos un tag al endpoint
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Lanzamos el servidor
  await app.listen(3000)
}
bootstrap()
