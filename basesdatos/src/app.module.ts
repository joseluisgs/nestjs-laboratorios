import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'

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
      entities: [], // Archivos de entidades
      synchronize: true, // Sincronizar la base de datos
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
