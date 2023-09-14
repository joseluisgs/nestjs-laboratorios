import { UserValidatorMiddleware } from './user-validator.middleware'

describe('ValidatorMiddleware', () => {
  it('should be defined', () => {
    expect(new UserValidatorMiddleware()).toBeDefined()
  })
})
