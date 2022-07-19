import { CreateAccount } from '@/domain/usecases/create-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { UserRepository } from '@/infra/repositories/prisma/user-repository'
import { CreateAccountController } from '@/presentation/controllers/create-account-controller'
import { CreateAccountValidator } from '@/infra/validators/create-account-validator'
import prisma from '@/infra/repositories/prisma/client'

export const makeCreateAccount = (): CreateAccountController => {
  const createUserRepo = new UserRepository(prisma)
  const bcryptAdapter = new BcryptAdapter(12)
  const createAccount = new CreateAccount(createUserRepo, createUserRepo, bcryptAdapter)
  const validator = new CreateAccountValidator()
  return new CreateAccountController(createAccount, validator)
}
