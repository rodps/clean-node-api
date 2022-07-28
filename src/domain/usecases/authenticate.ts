import { Either, left, right } from 'fp-ts/lib/Either'
import { AccessTokenGenerator } from '../ports/crypt/access-token-generator'
import { PasswordHasher } from '../ports/crypt/password-hasher'
import { UseCaseError } from '../ports/errors/use-case-error'
import { LoadUserByEmailRepository } from '../ports/repositories/load-user-by-email-repository'
import { AccessToken, AuthenticateParams, AuthenticateUseCase } from '../ports/usecases/authenticate-usecase'

export class Authenticate implements AuthenticateUseCase {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly accessTokenGenerator: AccessTokenGenerator,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async exec (params: AuthenticateParams): Promise<Either<UseCaseError, AccessToken>> {
    const { email, password } = params
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (!user) {
      return left({ field: 'email', message: 'Email not registered' })
    }
    if (!await this.passwordHasher.compare(password, user.password)) {
      return left({ field: 'password', message: 'Incorrect password' })
    }
    const accessToken = this.accessTokenGenerator.generate({ id: user.id, role: 'user' })
    return right({ accessToken })
  }
}
