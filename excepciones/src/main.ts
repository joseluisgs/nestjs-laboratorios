import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalFilters(new GeneralExceptionFilter()) // Para todos los controladores
  await app.listen(3000)
}

bootstrap()
