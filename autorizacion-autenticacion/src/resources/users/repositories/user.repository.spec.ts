import { UserRepository } from "./user.repository";

describe('UserRepository', () => {
  it('should be defined', () => {
    expect(new UserRepository()).toBeDefined();
  });
});
