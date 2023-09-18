# Nest.js Laboratorios

Proyectos de ejemplo y explicaciones de algunos conceptos de Nest.js

[![Nest](https://img.shields.io/badge/Code-Nest.js-red)](https://kotlinlang.org/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/nestjs-laboratorios)
[![LICENSE](https://img.shields.io/badge/Lisence-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)

![imagen](https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png)

- [Nest.js Laboratorios](#nestjs-laboratorios)
  - [Acerca de](#acerca-de)
  - [Creando una aplicación](#creando-una-aplicación)
  - [Estructura de de un proyecto Nest.js](#estructura-de-de-un-proyecto-nestjs)
    - [Decoradores](#decoradores)
    - [Controller](#controller)
      - [CRUD operations](#crud-operations)
      - [Obtener información del Request](#obtener-información-del-request)
    - [Providers](#providers)
    - [Module](#module)
  - [Generador de CRUDS](#generador-de-cruds)
  - [Middlewares](#middlewares)
  - [Excepciones](#excepciones)
  - [Pipes](#pipes)
      - [Validaciones de Pipe](#validaciones-de-pipe)
  - [Validaciones](#validaciones)
  - [Logging](#logging)
  - [Bases de Datos](#bases-de-datos)
    - [Ejemplo con PostgreSQL](#ejemplo-con-postgresql)
    - [Ejemplo con MongoDB](#ejemplo-con-mongodb)
  - [Variables de entorno](#variables-de-entorno)
  - [Testing](#testing)
    - [Test unitarios de servicios](#test-unitarios-de-servicios)
    - [Test unitarios de controladores](#test-unitarios-de-controladores)
    - [Testing E2E](#testing-e2e)
    - [Testing Coverage](#testing-coverage)
  - [Documentación con Swagger](#documentación-con-swagger)
  - [Autor](#autor)
    - [Contacto](#contacto)
  - [Licencia de uso](#licencia-de-uso)


## Acerca de

Ejemplos de uso de Nest.js, un framework de Node.js para crear aplicaciones escalables y robustas.

## Creando una aplicación
Puedes hacerlo con el comando:
```bash
nest g application 
```

## Estructura de de un proyecto Nest.js

Un proyecto de Nest.js nos podemos encontrar:

### Decoradores
Los decoradores en Nest.js son expanden la funcionalidad de el método, propiedad o clase a la cual se adjuntan. Nest.js busca aplicar el principio DRY fuertemente con decoradores.
Ej: @Controller(‘usuarios’), @Ip(), @CustomDecorator()

### Controller
Los [controladores](https://docs.nestjs.com/controllers) son los encargados de recibir las peticiones HTTP y devolver una respuesta. Los controladores son clases decoradas con @Controller() y que contienen métodos decorados con @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head(), @All().

![](https://docs.nestjs.com/assets/Controllers_1.png)

Se crea con el comando de nest
```bash
nest g co mod mo usuarios
```

```ts
@Controller('usuarios')
export class UsuariosController {
  @Get()
  getUsuarios() {
    return 'Todos los usuarios';
  }
}
```
#### CRUD operations
```ts
@Controller('usuarios')
export class UsuariosController {
  @Get(@Query('nombre') nombre: string)
  getUsuarios() {
    return 'Todos los usuarios';
  }

  @Get('usuarios')
  getUsuariosFiltradoPorNombre(@Query('nombre') nombre: string) {
    return `Todos los usuarios con nombre: ${nombre}`;
  }

  @Get(':id')
  getUsuario(@Param('id') id: string) {
    return `Usuario con id: ${id}`;
  }

  @Post()
  createUsuario(@Body() usuario: any) {
    return usuario;
  }

  @Put(':id')
  updateUsuario(@Param('id') id: string, @Body() usuario: any) {
    return `Usuario con id: ${id} actualizado`;
  }

  @Patch(':id')

  @Delete(':id')
  deleteUsuario(@Param('id') id: string) {
    return `Usuario con id: ${id} eliminado`;
  }
}
```

#### Obtener información del Request
- Obtener parámetros / segmentos: @Param('id')
- Obtener el body de la petición: @Body(), si queremos recoger un objeto que noe ste completo podemos usar `@Body() product:Partial<Product>`,
- Obtener los parámetros de query: @Query()
- Obtener respose (Express/Fastify)/Importarse desde express/fastify: @Res()
- Obtener todo con @Req(): El decorador @Req nos permite acceder a todos los datos de una petición a traves del objeto req (param, query, etc). Si hiciéramos la petición http://localhost:3000/api/v1/books?order=1&limit=10, request.query contendría lo siguiente: `{ order: '1', limit: '10' }`
- Para actualizar solo un objeto parcial podemos usar `@Body() product:Partial<Product>`. O definir la Entidad como `export class UpdateProductDto extends PartialType(ProductDto) {}`

```ts
@Get()
findAll(@Req() request: Request) { 
  return this.booksService.findAll(request.query); 
}
```

Por ejemplo cómo forzar que el id sea un número al hacer un get
```ts
@Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return `Usuario con id: ${id}`;
  }
```

### Providers
Los servicios, repositorios son [Providers](https://docs.nestjs.com/providers) son clases que contienen la lógica de negocio de nuestra aplicación. Los servicios son clases decoradas con @Injectable() y que pueden ser inyectadas en los controladores, módulos u otros servicios. Por lo tanto alojan la lógica de negocio de tal manera que sea reutilizable mediante inyección de dependencias.

![](https://docs.nestjs.com/assets/Components_1.png)

De hecho, lo que hacemos con ellos es liberar al controlador de toda la lógica, pues el controlador se encarga de recibir la petición y devolver una respuesta, y la lógica de negocio se la delega al servicio o repositorios (principios de responsabilidad única).

Por ejemplo un servicio se crea con:
```bash
nest g s usuarios
```

```ts
@Injectable()
export class UsuariosService {
  getUsuarios() {
    return 'Todos los usuarios';
  }
}
```

### Module
Los [módulos](https://docs.nestjs.com/modules) son clases que contienen los controladores y servicios que se van a utilizar en nuestra aplicación. Los módulos son clases decoradas con @Module() y que pueden ser inyectadas en otros módulos. Agrupan y desacoplan un conjunto de funcionalidad específica por dominio. Gracias a ellos podemos hacer el IoC (Sistema de Inversión de Control).

![](https://docs.nestjs.com/assets/Modules_1.png)

El módulo principal para la aplicación es: AppModule

Se crea en nest con el comando de nest:
```bash
nest g mo usuarios
```

```ts
@Module({
  imports: [], // import de otros modulos para usarlos
  controllers: [UsuariosController], // controllers que contiene
  providers: [UsuariosService], // providers que contiene
  exports: [UsuariosService], // Exportamos el servicio para poder usarlo en otros módulos
})
```

Podemos crear todos los módulos para separar la funcionalidad, e importarlos en el principal (imports) o desde otros, para así separar la lógica de la aplicación por funcionalidad o casos de uso. OJO cuidado si usamos un servicio en otro módulo, porque debemos exportarlo.

## Generador de CRUDS
Muchas veces lo que hacemos es generar CRUDS completos, Nest tiene el comando para hacerlo, creando toda la estructura necesaria:
```bash
nest g res usuarios
```

Podemos elegir entre distintos servicios (REST, GraphQL, Websockets, ...) y si queremos todo el esqueleto o solo parte.

## Middlewares
Un [middleware](https://docs.nestjs.com/middleware) es una función que se ejecuta antes de que se ejecute el controlador. Se pueden usar para comprobar si el usuario está autenticado, si tiene permisos, pre-validar bodies, etc. Es decir, cuando nos llega una petición, antes de entregarla al controlador, se ejecuta el middleware para ver si se puede ejecutar o no. 

![](https://docs.nestjs.com/assets/Middlewares_1.png)

Puedes crearlo con la orden:
```bash
nest g mi auth
```
```ts
// Clase de Middlware donde procesa las peticiones y respuestas
// Importante importarlos de Express: Request, Response, NextFunction
@Injectable()
export class ValidatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user: User = req.body
    if (!user.name || !user.surname) {
      res.status(400).json({ error: 'name and surname are required' })
      return
    }
    next()
  }
}
```
Importante, luego lo debes usar en el módulo donde quieras que se aplique, por ejemplo en el Módulo de usuarios o el general de AppModule

```ts
// Para el middleware
export class AppModule implements NestModule {
  // Le indicamos que el middleware ValidatorMiddleware se aplicará a todas las rutas que empiecen por users
  // Ademas ademas podemos por metodos, por ejemplo post y put o patch
  // También podemos excluirlas, por ejemplo, excluimos el metodo get
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidatorMiddleware)
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
```

## Excepciones
Las [excepciones](https://docs.nestjs.com/exception-filters) nos serán para devolver código de estado y mensajes ante operaciones que no se han realizado correctamente.
Podemos usar en servicios los objetos `HttpException` o algunos más personalizados como `BadRequestException`, `NotFoundException`, `ConflictException`, `ForbiddenException`, `UnauthorizedException`...

![](https://docs.nestjs.com/assets/Filter_1.png)

```ts
@Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    if (id === 1) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
      // throw new HttpException(`Usuario con id: ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return `Usuario con id: ${id}`;
  }
```

Podemos usar un filtro para capturar las excepciones, con @Catch que implementa ExeptionFilter
```ts
@Catch(HttpException)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Generamos el contexto de la petición
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exceptionResponse['message'] ||
        exceptionResponse['error'] ||
        exceptionResponse['statusCode'],
    })
  }
}
```

Para usarla la podemos usar en el módulo o en el controlador con @UseFilters en un método del controlador, para todo el controlador o app (para todos) antes de lanzar el servidor. Todo depende de donde pongas la anotacion @UseFilters

```ts
@Controller('users')
@UseFilters(new GeneralExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(new GeneralExceptionFilter())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

```

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new GeneralExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

## Pipes
Los [pipes](https://docs.nestjs.com/pipes) en Nest.js se usan verificar aspectos concretos de una ruta para validarlos antes de que pasen al controlador. Puede ser como un middleware pero específico para una ruta. Por ejemplo, podemos usarlo para validar que un id sea un número, que un email sea un email, etc. Nos sirven para transformar un dato de entrada que puede ser de un tipo al requerido. Por ejemplo, si queremos que un id sea un número, podemos usar el pipe ParseIntPipe, que transforma el string a un número. Si no es un número, lanza una excepción BadRequestException.

![](https://docs.nestjs.com/assets/Pipe_1.png)


#### Validaciones de Pipe
- ValidationPipe
- ParseIntPipe: Si es entero
- ParseBoolPipe: Si es booleano
- ParseArrayPipe: Si es un array
- ParseFloatPipe: si es un float
- ParseUUIDPipe: si es un uuid.

```ts
@Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id)
  }
```

Podemos crear nuestro propio pipe para validar, por ejemplo, que un email sea un email, o que un id sea un uuid, etc. Para ello debemos crear una clase que implemente PipeTransform y usarla en el controlador o en el módulo.
También lo puedes hacer con el comando:
```bash
nest g pi parse-int
```

```ts
@Injectable()
export class CustomPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not an number`)
    }
    return val
  }
}
```

```ts
@Get(':id')
  findOne(@Param('id', new CustomPipe()) id: string) {
    return this.usersService.findOne(+id)
  }
```

Usando joi podemos validar los datos de un un cuerpo completo en el controlador con restricciones específicas
````ts
import * as Joi from 'joi' // Se debe instalar con npm i joi
export const CreateUserSchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.string(),
  age: Joi.number().min(10).max(80).required(),
})
````

```ts
@Injectable()
export class CreateUserPipe
  implements PipeTransform<CreateUserDto, CreateUserDto>
{
  constructor(private schema: ObjectSchema) {}

  transform(createSchema: CreateUserDto, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(createSchema) // Se valida el schema
    if (error) {
      throw new BadRequestException(error.message) // Si hay error se lanza una excepción
    }
    return createSchema // Si no hay error se retorna el schema
  }
}
```

```ts
@Post()
@UsePipes(new CreateUserValidationPipe(createUserSchema))
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

## Validaciones
Vamos a profundizar validaciones sin hacer uso de Joi, para validar los datos con esquemas, si no de las clases de Node:
- class-validator
- class-transformer

Lo primero es activar las validaciones globales en nuestro main:
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

Ahora podemos hacer nuestras validaciones en los DTOs con decoradores y si queremos podemos personalizar las respuestas del error que se obtendrá al no pasar las validaciones. El locale no es obligatorio:
```ts
enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsAlpha('es-ES', { message: 'El nombre solo puede contener letras' })
  //@IsNotEmpty()
  readonly name: string

  @IsAlpha()
  //@IsNotEmpty()
  readonly surname: string

  @IsInt()
  @Min(18)
  @Max(90)
  readonly age: number

  @IsEmail()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly address: string

  @IsBoolean()
  readonly single: boolean

  @IsEnum(UserType)
  readonly userType: string
}

// Al usar un tipo parcial, obtenemos lo que hemos ya implementado con anotaciones.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

## Logging
Podemos usar logs personalizados para nuestra aplicación.
Lo primero es usar el objeto Logger en nuestros servicios y llamarlo cuando queramos en nuestro código. 
```ts
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    this.logger.log('estas acción ejecuta findAll') // puedes usar warn, error, etc.
    return `This action returns all users`
  }
}
```

También en nuestro main podemos activar o desactivar los loggers (false) o algunos de sus tipos.
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })
  await app.listen(3000)
}

bootstrap()
```

O decirle que lo haga el console
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  })
  await app.listen(3000)
}
```

También me puedo hacer mi propio log, de una clase que implemente la interfaz LoggerService

## Bases de Datos
Para trabajar con Bases de Datos nos vamos a ayudar de Docker y Docker Compose y sobre todo de [TypeORM](https://typeorm.io/), que es on ORM para JS/TypeScript y compatible totalmente con [Nest.js](https://docs.nestjs.com/techniques/database).

### Ejemplo con PostgreSQL

Lo primero es instalar su módulo y las dependencias a TypeORM y a cada uno de los SGDB que usemos, por ejemplo, para PostgreSQL:
```bash
npm install --save @nestjs/typeorm typeorm pg
```

Luego configuramos la conexión en nuestro app.module.ts
```ts
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Luego nos creamos las entidades de datos, que son las clases que representan las tablas de la base de datos en base a anotaciones de TypeORM cons sus opciones si no queremos que tomen las opciones por defecto. Por ejemplo, para un usuario:
```ts
@Entity('users') // Nombre de la tabla
export class User {
  @PrimaryGeneratedColumn() // Columna de clave primaria autoincrementable
  id: number

  @Column('varchar', { length: 255, nullable: false, name: 'first_name' })
  firstname: string

  @Column('varchar', { length: 255, nullable: false, name: 'last_name' })
  lastname: string

  @Column('varchar', { length: 255, nullable: true, default: 'no address' })
  address: string

  @Column('varchar', {
    length: 150,
    nullable: false,
    name: 'single_status',
    default: false,
  })
  single: boolean
}
```	

El siguiente paso es registrar las entidades de datos en el módulo, se puede hacer con ` entities: [__dirname + '/**/*.entity{.ts,.js}']` o poniendo el nombre de la entidad a mano. Se crearán las tablas en la base de datos.

Ahora vamos a usar el patrón repositorio. Lo primero es registrar nuestra entidad en el controlador (usuarios).
```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // Importamos el módulo de TypeORM y le pasamos la entidad a usar
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
```

Luego en nuestro servicio importamos el repositorio de la entidad y lo usamos en los métodos del servicio. Importante los métdodos devuelven una promesa, por lo que debemos usar async/await o then/catch y también en el controlador!!!.
```ts
@Injectable()
export class UsersService {
  // Nos creamos el repositorio de usuarios, que es el que se encarga de la lógica de negocio
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}


  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return this.userRepository.delete({ id })
  }
}
```
### Ejemplo con MongoDB

Instalamos sus dependencias tanto para Nest.js como la de MongoDB
```bash
npm install --save @nestjs/mongoose mongoose
```

Creamos la conexión en app.module.ts con MongooseModule
```ts
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    // Configuración para la conexión a la base de datos a MongoDB
    MongooseModule.forRoot(
      'mongodb://admin:adminPassword123@localhost:27017/NEST_DB', // Dirección de la base de datos
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Luego nos creamos el esquema de datos para la colecciones, porque no usamos "entidades" al ser NoSQL. Para ello nos creamos un archivo con el definimos el esquema de datos, por ejemplo, para un productos. Además debemos crear un tipo de dato para que lo pueda manejar los documentos y finalmente el esquema de los repositorios:
```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product {
  // No hace falta definir el id, pero lo dejo para que veas cómo se haría
  /* @ObjectIdColumn()
   id: ObjectId*/

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: Number, default: 0, required: true })
  quantity: number
}

// Definimos el tipo de documento de la colección de productos como union type
export type ProductDocument = Product & Document

// Definimos el schema de la colección de productos para el repositorio de TypeORM
export const ProductSchema = SchemaFactory.createForClass(Product)

```

Luego importamos el esquema en el módulo donde va a ser usado, por ejemplo en productos
```ts	
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  // importamos el módulo de TypeORM Mongoose y le pasamos el schema a usar
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
```

Finalmente inyectamos el documento para trabajar en nuestro servicio, ojo, cuidado con el id que tiene que ser en formato mongo, y no olvides ejecutar la consulta con exec y por supuesto el manejo de promesas
```ts
@Injectable()
export class ProductsService {
  // Inyectamos el documento de productos de Mongoose
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    return this.productModel.find().find().exec()
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec()
  }

  async remove(id: string) {
    //const myId = new mongoose.Types.ObjectId(id)
    return this.productModel.findByIdAndRemove(id).exec()
  }
}

```

## Variables de entorno
Meter los datos sensibles, como contraseñas y cadenas de conexión en el código no es lo recomendable, o simplemente para adaptar a distintos entornos, por lo que debemos trabajar con variables de entorno para solucionar este hecho usamos los ficheros .env

Para ello instalamos el paquete config de Nest.js
```bash
npm install --save @nestjs/config
```

Luego lo importamos en nuestro app.module.ts, cuidado que el módulo de config debe ser el primero en cargarse
```ts
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
```

## Testing
Para hacer el testing con [Nest.js](https://docs.nestjs.com/fundamentals/testing) haremos uso de [Jest](https://jestjs.io/es-ES/docs/getting-started) y [Supertest](https://github.com/ladjs/supertest).

### Test unitarios de servicios
Se usara Jest, debemos cargar el módulo del test
```ts
// Describe, es como se agrupan las pruebas, Test suite
describe('UsersService', () => {
  let service: UsersService

  // beforeEach, se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Se crea un modulo de testing para poder hacer las pruebas unitarias
    // cargando el servicio que se quiere probar
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  // It, es una prueba
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // Creamos una prueba para el metodo create
  it('should create a user', () => {
    // Creamos el mock del usuario
    const mockUser = {
      id: 99,
      name: 'mockName',
      surname: 'mockSurname',
    }
    // Llamamos al metodo create del servicio
    const result = service.create(mockUser)
    // Comprobamos que el resultado sea un objeto con las propiedades que esperamos
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        surname: expect.any(String),
      }),
    )
  })

  // Creamos una prueba para el metodo findAll
  it('should return all users', () => {
    // Llamamos al metodo findAll del servicio
    const result = service.findAll()
    // Comprobamos que el resultado sea un array
    expect(Array.isArray(result)).toBe(true)
  })

  // Creamos una prueba para el metodo findOne
  it('should return an user by id', () => {
    const mockID = 1 // Mock del id
    // Llamamos al metodo findOne del servicio
    const result = service.findOne(mockID)
    // Comprobamos que el resultado sea un objeto con las propiedades que esperamos
    // También podríamos crearnos el mock del usuario y comprobar que el resultado es igual al mock
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        surname: expect.any(String),
      }),
    )
  })

  // Creamos una prueba para el metodo update
  it('should update a user by id', () => {
    // Creamos el mock del usuario
    const mockUser = {
      name: 'mockName',
      surname: 'mockSurname',
    }
    const mockID = 1
    // Llamamos al metodo update del servicio
    const result = service.update(mockID, mockUser)
    // Comprobamos que el resultado sea un objeto con las propiedades que esperamos
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        surname: expect.any(String),
      }),
    )
    // Comprobamos que el resultado sea igual al mock (los campos que hemos actualizado)
    expect(result.name).toEqual(mockUser.name)
    expect(result.surname).toEqual(mockUser.surname)
  })
})

```

### Test unitarios de controladores
Para haver el test unitario de controladores, lo que debemos es cargar nuestro controlador y servicio en el módulo de test y luego hacer mocks, con la función spy con [mockImplementation](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn) de los métodos del servicio. Usamos un describe por cada método is este tiene distintos resultados (correcto o excepciones)
```ts
// Suite del test
describe('UsersController', () => {
  let userController: UsersController // Variable para almacenar el controlador a testear
  let userService: UsersService // Variable para almacenar el servicio a testear

  // beforeEach, se ejecuta antes de cada prueba
  // Cargamos el controlador y el servicio que queremos probar
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    userService = module.get<UsersService>(UsersService)
    userController = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  // Creamos una suite para los casos de prueba del metodo create
  describe('create user test bed', () => {
    // Creamos una prueba para el caso de que se cree un usuario correctamente
    it('should create a new user', async () => {
      const mockUser = {
        id: 1,
        name: 'name',
        surname: 'surname',
      }
      // Creamos un mock del metodo create del servicio, cuando se llame al método create del servicio
      // devolverá el mockUser
      jest.spyOn(userService, 'create').mockImplementation(() => mockUser)
      // Llamamos al metodo create del controlador
      const result = await userController.create(mockUser)
      // Comprobamos que el resultado sea el mockUser
      expect(result).toBe(mockUser)
    })

    // Creamos una prueba para el caso de que se cree un usuario con datos incorrectos
    it('should return a not acceptable exception', async () => {
      const mockUSer = {
        id: 0,
        name: '',
        surname: '',
      }
      // Creamos un mock del metodo create del servicio, cuando se llame al método create del servicio
      jest.spyOn(userService, 'create').mockImplementation(() => mockUSer)
      // Llamamos al metodo create del controlador y comprbamos que se lanza una excepción
      try {
        await userController.create(mockUSer)
      } catch (e) {
        // Comprobamos que el mensaje de la excepción sea el esperado
        expect(e.message).toBe('invalid user data')
      }
    })
  })

  // Creamos una suite para los casos de prueba del metodo findOne
  describe('find all users test bd', () => {
    it('should return all users', async () => {
      const mockResult = [
        {
          id: 1,
          name: 'name',
          surname: 'surname',
        },
      ]
      // Creamos un mock del metodo findAll del servicio, cuando se llame al método findAll del servicio
      jest.spyOn(userService, 'findAll').mockImplementation(() => mockResult)
      const result = await userController.findAll()
      // Comprobamos que el resultado sea el mock
      expect(result).toBe(mockResult)
    })
  })
})
```

### Testing E2E
Para el testing E2E usaremos Supertest. Es importante cargar Nest y poder mockear los elementos que queramos con su comportamiento. Si no lo hacemos estamos aplicando test de integración, si fuese una Base de Datos lo que usa el servicio accederíamos a ella pero no queremos eso, queremos mockear y solo comprobar el controlador. Pero ya dependerá del problema y tipo de test que busquemos dentro del E2E.
```ts
// Suite del test
describe('UsersController (e2e)', () => {
  let app: INestApplication // almacena la aplicación
  const mockUSer = {
    id: 1,
    name: 'name',
    surname: 'surname',
  }

  // Creamos un mock del servicio global con los métodos que vamos a utilizar y su comportamiento
  // Si no usamos el mock hacemos un test de integración con los elemetos reales, pero si tuviesemos una BD
  // la usaríamos para hacer las pruebas, y no queremos eso, queremos probar el controlador
  const mockUserService = {
    // Todos los métodos que vamos a utilizar o mockear
    findAll: () => [mockUSer],
    create: (user: any) => {
      if (user.name.length > 0 && user.surname.length > 0) {
        return mockUSer
      }
      throw new NotAcceptableException('invalid user data')
    },
    // Si hay mas métodos ponerlos aquí
  }

  // beforeAll, se ejecuta antes de todas las pruebas
  beforeAll(async () => {
    // Se carga un modulo de testing para poder hacer las pruebas e2e
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      // Se sobreescribe el servicio global por el mock
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile()

    // Se crea la aplicación y esperamos que se inicie el servidor
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // Creamos una prueba para la ruta GET /users
  it('/GET users', () => {
    // Llamamos a la ruta y comprobamos que el resultado es el esperado
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockUserService.findAll())
  })

  // Creamos una prueba para la ruta POST /users
  describe('/POST users', () => {
    // Creamos una prueba para el caso de que se cree un usuario correctamente
    it('should create a user', () => {
      const mockUSer = {
        id: 1,
        name: 'name',
        surname: 'surname',
      }
      // Llamamos a la ruta y comprobamos que el resultado es el esperado
      return request(app.getHttpServer())
        .post('/users')
        .send(mockUSer) // Enviamos el mock del usuario
        .expect(201)
        .expect(mockUSer)
    })

    // Creamos una prueba para el caso de que se cree un usuario con datos incorrectos
    it('should return an invalid exception', async () => {
      const mockUSer = {
        id: 0,
        name: '',
        surname: '',
      }
      // Llamamos a la ruta y comprobamos que el resultado es el esperado
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(mockUSer)

      // Comprobamos que el resultado es el esperado
      expect(response.statusCode).toBe(406)
      expect(response.body.message).toBe('invalid user data')
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
```

### Testing Coverage
Nos indica el grado de cobertura de nuestro código.

## Documentación con Swagger
Para comenzar a documentar un proyecto con [OpenAPI y Swagger](https://docs.nestjs.com/openapi/introduction), debes instalar la dependencia `@nestjs/swagger` y `swagger-ui-express`:
```bash
$ npm install --save @nestjs/swagger
```

Luego configuramos nuestro fichero main, con los datos de la documentación y los tags a recursos. Estará disponible en: http://localhost:3000/api.

```ts
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
```

A partir de este momento podemos documentar usando decoradores.


## Autor

Codificado con :sparkling*heart: por [José Luis González Sánchez](https://twitter.com/JoseLuisGS*)

[![Twitter](https://img.shields.io/twitter/follow/JoseLuisGS_?style=social)](https://twitter.com/JoseLuisGS_)
[![GitHub](https://img.shields.io/github/followers/joseluisgs?style=social)](https://github.com/joseluisgs)
[![GitHub](https://img.shields.io/github/stars/joseluisgs?style=social)](https://github.com/joseluisgs)

### Contacto

<p>
  Cualquier cosa que necesites házmelo saber por si puedo ayudarte 💬.
</p>
<p>
 <a href="https://joseluisgs.dev" target="_blank">
        <img src="https://joseluisgs.github.io/img/favicon.png" 
    height="30">
    </a>  &nbsp;&nbsp;
    <a href="https://github.com/joseluisgs" target="_blank">
        <img src="https://distreau.com/github.svg" 
    height="30">
    </a> &nbsp;&nbsp;
        <a href="https://twitter.com/JoseLuisGS_" target="_blank">
        <img src="https://i.imgur.com/U4Uiaef.png" 
    height="30">
    </a> &nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/joseluisgonsan" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" 
    height="30">
    </a>  &nbsp;&nbsp;
    <a href="https://g.dev/joseluisgs" target="_blank">
        <img loading="lazy" src="https://googlediscovery.com/wp-content/uploads/google-developers.png" 
    height="30">
    </a>  &nbsp;&nbsp;
<a href="https://www.youtube.com/@joseluisgs" target="_blank">
        <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" 
    height="30">
    </a>  
</p>

## Licencia de uso

Este repositorio y todo su contenido está licenciado bajo licencia **Creative Commons**, si desea saber más, vea
la [LICENSE](https://joseluisgs.dev/docs/license/). Por favor si compartes, usas o modificas este proyecto cita a su
autor, y usa las mismas condiciones para su uso docente, formativo o educativo y no comercial.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">
JoseLuisGS</span>
by <a xmlns:cc="http://creativecommons.org/ns#" href="https://joseluisgs.dev/" property="cc:attributionName" rel="cc:attributionURL">
José Luis González Sánchez</a> is licensed under
a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons
Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional License</a>.<br />Creado a partir de la obra
en <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/joseluisgs" rel="dct:source">https://github.com/joseluisgs</a>.
