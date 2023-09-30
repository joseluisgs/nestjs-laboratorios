import { BasicAuthGuard } from './basic-auth.guard';

describe('BasicAuthGuard', () => {
  it('should be defined', () => {
    expect(new BasicAuthGuard()).toBeDefined();
  });
});
