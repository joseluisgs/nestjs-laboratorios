import { RoleAuthGuard } from './role-auth.guard';

describe('RoleAuthGuard', () => {
  it('should be defined', () => {
    expect(new RoleAuthGuard()).toBeDefined();
  });
});
