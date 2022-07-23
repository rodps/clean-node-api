import { AccessTokenGenerator } from '../ports/crypt/access-token-generator'
import { PasswordHasher } from '../ports/crypt/password-hasher'
import { LoadUserByEmailRepository } from '../ports/repositories/load-user-by-email-repository'
import { AccessTokenOrError, AuthenticateErrors, AuthenticateParams, AuthenticateUseCase } from '../ports/usecases/authenticate-usecase'

export class Authenticate implements AuthenticateUseCase {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly accessTokenGenerator: AccessTokenGenerator,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async exec (params: AuthenticateParams): Promise<AccessTokenOrError> {
    const { email, password } = params
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (!user) {
      return { err: AuthenticateErrors.EMAIL_NOT_REGISTERED }
    }
    if (!await this.passwordHasher.compare(password, user.password)) {
      return { err: AuthenticateErrors.INCORRECT_PASSWORD }
    }
    return {
      accessToken: this.accessTokenGenerator.generate({ id: user.id, role: 'user' })
    }
  }
}
