import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class RoleAuthGuard implements CanActivate {
  private roles: string[] = []

  constructor(...roles: string[]) {
    console.log(roles)
    this.roles = roles
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp()
    const { user } = ctx.getRequest() // Obtenemos el usuario, es lo mismo que ctx.getRequest().user
    // console.log('roles', this.roles)
    // console.log('user', user)
    if (!this.roles.includes(user.role)) {
      throw new ForbiddenException('Forbidden Role: You do not have access')
    }
    return true
  }
}
