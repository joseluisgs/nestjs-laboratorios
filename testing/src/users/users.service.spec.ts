import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

// DEscribe, es como se agrupan las pruebas, Test suite
describe('UsersService', () => {
  let service: UsersService // Variable para almacenar el servicio a testear

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
