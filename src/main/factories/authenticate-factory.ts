import { Authenticate } from '@/domain/usecases/authenticate'
import { UserRepository } from '@/infra/repositories/prisma/user-repository'
import { AuthenticateController } from '@/presentation/controllers/authenticate-controller'
import prisma from '@/infra/repositories/prisma/client'
import { JWTAdapter } from '@/infra/cryptography/jsonwebtoken-adapter'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { env } from '../env'
import { AuthenticateValidator } from '@/infra/validators/authenticate-validator'

const makeAuthenticate = (): AuthenticateController => {
  const userRepository = new UserRepository(prisma)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const authenticate = new Authenticate(userRepository, jwtAdapter, bcryptAdapter)
  const validator = new AuthenticateValidator()
  return new AuthenticateController(authenticate, validator)
}

export default makeAuthenticate
