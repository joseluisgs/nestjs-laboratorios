import { Module } from '@nestjs/common'
import { ResourcesModule } from './resources/resources.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './auth/auth.module'

/**
 * Modulo principal de la aplicacion
 */
@Module({
  // El primer modulo que se carga es el modulo de configuración
  imports: [
    ConfigModule.forRoot(),
    // Inyectamos TypeOrme
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`], // se cargan todas las entidades de la base de datos
      autoLoadEntities: true, // si no se especifica, se carga todas las entidades de la base de datos
      synchronize: process.env.NODE_ENV === 'development', // si ha cambia el modelo, se sincroniza con la base de datos
      logging: process.env.NODE_ENV === 'development' ? 'all' : false, // si esta en modo desarrollo, se muestra los logs
    }),
    ResourcesModule, // Inyectamos el modulo de recursos o endpoints
    SharedModule, // Inyectamos el modulo de shared
    AuthModule, // Inyectamos el modulo de autenticacion (JWT y Guards)
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
