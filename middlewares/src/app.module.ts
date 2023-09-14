import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { UserValidatorMiddleware } from './middlewares/validators/user/user-validator.middleware'

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

// Para el middleware
export class AppModule implements NestModule {
  // Le indicamos que el middleware ValidatorMiddleware se aplicará a todas las rutas que empiecen por users
  // Ademas ademas podemos por metodos, por ejemplo post y put o patch
  // También podemos excluirlas, por ejemplo, excluimos el metodo get
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserValidatorMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.DELETE },
      )
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/(*)', method: RequestMethod.PUT },
        { path: 'users/(*)', method: RequestMethod.PATCH },
      )
  }
}
