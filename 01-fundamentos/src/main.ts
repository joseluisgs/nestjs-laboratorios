import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// Fichero principal de la aplicación
// Se crea la aplicación con NestFactory carga el módulo principal AppModule
// Se define el puerto en el que se ejecuta la aplicación
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

// Se ejecuta la aplicación
bootstrap().then(() => {
  console.log('🚀 Server is running on port 3000')
})
