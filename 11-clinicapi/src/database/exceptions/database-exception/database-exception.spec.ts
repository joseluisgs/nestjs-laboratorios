import { DatabaseException } from './database-exception'

describe('DatabaseException', () => {
  it('should be defined', () => {
    expect(new DatabaseException()).toBeDefined()
  })
})
