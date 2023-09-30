import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [HealthCheckModule, AuthModule, ProductsModule],
})
export class ResourcesModule {}
