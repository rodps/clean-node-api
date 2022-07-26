import { Authorize } from '@/domain/usecases/authorize'
import { JWTAdapter } from '@/infra/cryptography/jsonwebtoken-adapter'
import { env } from '@/main/env'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

const makeAuthMiddleware = (): AuthMiddleware => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const authorize = new Authorize(jwtAdapter, 'user')
  return new AuthMiddleware(authorize)
}

export default makeAuthMiddleware
