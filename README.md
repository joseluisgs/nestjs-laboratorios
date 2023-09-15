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
      - [Validaciones de Pipe](#validaciones-de-pipe)
    - [Providers](#providers)
    - [Module](#module)
  - [Generador de CRUDS](#generador-de-cruds)
    - [Middlewares](#middlewares)
  - [Excepciones](#excepciones)
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
Los controladores son los encargados de recibir las peticiones HTTP y devolver una respuesta. Los controladores son clases decoradas con @Controller() y que contienen métodos decorados con @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head(), @All().S

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

#### Validaciones de Pipe
- ValidationPipe
- ParseIntPipe: Convierte a entero
- ParseBoolPipe 
- ParseArrayPipe
- ParseFloatPipe
- ParseUUIDPipe

Por ejemplo cómo forzar que el id sea un número al hacer un get
```ts
@Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return `Usuario con id: ${id}`;
  }
```

### Providers
Los servicios, repositorios son Providers son clases que contienen la lógica de negocio de nuestra aplicación. Los servicios son clases decoradas con @Injectable() y que pueden ser inyectadas en los controladores, módulos u otros servicios. Por lo tanto alojan la lógica de negocio de tal manera que sea reutilizable mediante inyección de dependencias.

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
Los módulos son clases que contienen los controladores y servicios que se van a utilizar en nuestra aplicación. Los módulos son clases decoradas con @Module() y que pueden ser inyectadas en otros módulos. Agrupan y desacoplan un conjunto de funcionalidad específica por dominio. Gracias a ellos podemos hacer el IoC (Sistema de Inversión de Control).

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

### Middlewares
Un middleware es una función que se ejecuta antes de que se ejecute el controlador. Se pueden usar para comprobar si el usuario está autenticado, si tiene permisos, pre-validar bodies, etc. Es decir, cuando nos llega una petición, antes de entregarla al controlador, se ejecuta el middleware para ver si se puede ejecutar o no. 

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
Las excepciones nos serrán para devolver código de estado y mensajes ante operaciones que no se han realizado correctamente.
Podemos usar en servicios los objetos `HttpException` o algunos más personalizados como `BadRequestException`, `NotFoundException`, `ConflictException`, `ForbiddenException`, `UnauthorizedException`, `NotAcceptableException`, `RequestTimeoutException`, `InternalServerErrorException`, `NotImplementedException`, `BadGatewayException`, `ServiceUnavailableException`, `GatewayTimeoutException`.

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
