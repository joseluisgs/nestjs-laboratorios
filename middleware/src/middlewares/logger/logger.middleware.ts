import { NextFunction, Request, Response } from 'express'

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`endpoint called from ${req.baseUrl}`)
  next()
}
