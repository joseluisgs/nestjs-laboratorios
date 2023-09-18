import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

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
