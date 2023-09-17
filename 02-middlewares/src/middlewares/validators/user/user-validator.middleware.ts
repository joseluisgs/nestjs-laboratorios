import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { User } from '../../../users/entities/user.entity'

// Clase de Middlware donde procesa las peticiones y respuestas
// Importante importarlos de Express: Request, Response, NextFunction
@Injectable()
export class UserValidatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user: User = req.body
    if (!user.name || !user.surname) {
      res.status(400).json({ error: 'name and surname are required' })
      return
    }
    next()
  }
}
