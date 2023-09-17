import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    // Configuración de la conexión a la base de datos a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: 'localhost', // Dirección del servidor
      port: 5432, // Puerto del servidor
      username: 'admin', // Nombre de usuario
      password: 'adminPassword123', // Contraseña de usuario
      database: 'NEST_DB', // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entidades de la base de datos (buscar archivos con extensión .entity.ts o .entity.js)
      synchronize: true, // Sincronizar la base de datos
    }),
    // Configuración para la conexión a la base de datos a MongoDB
    MongooseModule.forRoot(
      'mongodb://admin:adminPassword123@localhost:27017/NEST_DB', // Dirección de la base de datos
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
