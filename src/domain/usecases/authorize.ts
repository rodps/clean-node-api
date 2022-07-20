import { AccessTokenGenerator } from '../ports/crypt/access-token-generator'
import { PasswordHasher } from '../ports/crypt/password-hasher'
import { LoadUserByEmailRepository } from '../ports/repositories/load-user-by-email-repository'
import { AccessTokenOrError, AuthorizeErrors, AuthorizeParams, AuthorizeUseCase } from '../ports/usecases/authorize-usecase'

export class Authorize implements AuthorizeUseCase {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly accessTokenGenerator: AccessTokenGenerator,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async exec (params: AuthorizeParams): Promise<AccessTokenOrError> {
    const { email, password } = params
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (!user) {
      return { err: AuthorizeErrors.EMAIL_NOT_REGISTERED }
    }
    if (!await this.passwordHasher.compare(password, user.password)) {
      return { err: AuthorizeErrors.INCORRECT_PASSWORD }
    }
    return {
      accessToken: this.accessTokenGenerator.generate({ id: user.id, userName: user.name })
    }
  }
}
