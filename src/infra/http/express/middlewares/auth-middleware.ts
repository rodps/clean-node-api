import makeAuthMiddleware from '@/main/factories/middlewares/auth-middleware-factory'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const middleware = makeAuthMiddleware()
  const { error, id } = await middleware.handle(req.headers.authorization ?? '')
  if (error) {
    res.status(error.statusCode).header(error.header).send(error.body)
  } else {
    req.body.userId = id
    next()
  }
}

export default authMiddleware
