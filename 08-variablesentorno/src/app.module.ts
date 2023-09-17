import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import * as process from 'process'

@Module({
  imports: [
    // La configuración el primero
    // Cargamos el módulo de configuración donde se encuentra el archivo .enbv a nivel global
    ConfigModule.forRoot(),
    UsersModule,
    ProductsModule,
    // Configuración de la conexión a la base de datos a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: process.env.DATABASE_HOST, // Dirección del servidor
      port: Number(process.env.DATABASE_PORT_POSTGRES), // Puerto del servidor
      username: process.env.DATABASE_USER, // Nombre de usuario
      password: process.env.DATABASE_PASSWORD, // Contraseña de usuario
      database: process.env.DATABASE_NAME, // Nombre de la base de datos
      entities: [`${__dirname}/**/*.entity{.ts,.js}`], // Entidades de la base de datos (buscar archivos con extensión .entity.ts o .entity.js)
      synchronize: true, // Sincronizar la base de datos con las entidades (crea las tablas si hay diferencias)
    }),
    // Configuración para la conexión a la base de datos a MongoDB
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${
        process.env.DATABASE_PASSWORD
      }@${process.env.DATABASE_HOST}:${Number(
        process.env.DATABASE_PORT_MONGODB,
      )}/${process.env.DATABASE_NAME}`, // Dirección de la base de datos
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
