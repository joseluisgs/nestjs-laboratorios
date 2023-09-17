import {NextFunction, Request, Response} from 'express'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(
        `Endpoint called to: ${req.baseUrl}${req.url}, with method: ${req.method}, with body: ${req.body}`,
    );
    next();
}