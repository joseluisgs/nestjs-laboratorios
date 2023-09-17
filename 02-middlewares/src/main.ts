import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {loggerMiddleware} from "./middlewares/logger/logger.middleware";

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(loggerMiddleware) // Esto es lo que hace que el logger vaya para todo (antes de levantar el servidor)
    await app.listen(3000)
}

bootstrap()
