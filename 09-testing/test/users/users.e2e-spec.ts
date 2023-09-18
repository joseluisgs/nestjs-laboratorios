import { INestApplication, NotAcceptableException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersModule } from '../../src/users/users.module'
import { UsersService } from '../../src/users/users.service'
import * as request from 'supertest'

// Suite del test
describe('UsersController (e2e)', () => {
  let app: INestApplication // Variable para almacenar la aplicación a testear
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
