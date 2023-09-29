import { Module } from '@nestjs/common'
import { BcryptService } from './services/bcrypt/bcrypt.service'

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class SharedModule {}
