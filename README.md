# Nest.js Laboratorios

Proyectos de ejemplo y explicaciones de algunos conceptos de Nest.js

[![Nest](https://img.shields.io/badge/Code-Nest.js-red)](https://kotlinlang.org/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/nestjs-laboratorios)
[![LICENSE](https://img.shields.io/badge/Lisence-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)

![imagen](https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png)

- [Nest.js Laboratorios](#nestjs-laboratorios)
  - [Acerca de](#acerca-de)
  - [Estructura de de un proyecto Nest.js](#estructura-de-de-un-proyecto-nestjs)
    - [Decoradores](#decoradores)
    - [Controller](#controller)
      - [CRUD operations](#crud-operations)
      - [Obtener información del Request](#obtener-información-del-request)
      - [Validaciones de Pipe](#validaciones-de-pipe)
    - [Providers](#providers)
    - [Module](#module)
  - [Autor](#autor)
    - [Contacto](#contacto)
  - [Licencia de uso](#licencia-de-uso)


## Acerca de

Ejemplos de uso de Nest.js, un framework de Node.js para crear aplicaciones escalables y robustas.

## Estructura de de un proyecto Nest.js

Un proyecto de Nest.js nos podemos encontrar:

### Decoradores
Los decoradores en Nest.js son expanden la funcionalidad de el método, propiedad o clase a la cual se adjuntan. Nest.js busca aplicar el principio DRY fuertemente con decoradores.
Ej: @Controller(‘usuarios’), @Ip(), @CustomDecorator()

### Controller
Los controladores son los encargados de recibir las peticiones HTTP y devolver una respuesta. Los controladores son clases decoradas con @Controller() y que contienen métodos decorados con @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head(), @All().S

Se crea con el comando de nest
```bash
nest g controller usuarios
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
nest g service usuarios
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
Los módulos son clases que contienen los controladores y servicios que se van a utilizar en nuestra aplicación. Los módulos son clases decoradas con @Module() y que pueden ser inyectadas en otros módulos. Agrupan y desacoplan un conjunto de funcionalidad específica por dominio.

```ts
@Module({
  imports: [], // import de otros modulos para usarlos
  controllers: [UsuariosController], // controllers que contiene
  providers: [UsuariosService], // providers que contiene
})
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
