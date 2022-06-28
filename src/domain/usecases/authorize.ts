import { AccessTokenGenerator } from '../ports/crypt/access-token-generator'
import { PasswordHasher } from '../ports/crypt/password-hasher'
import { LoadUserByEmailRepository } from '../ports/repositories/load-user-by-email'

interface AccessTokenOrError {
  token?: string
  err?: string
}

export class Authorize {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly accessTokenGenerator: AccessTokenGenerator,
    private readonly passwordHasher: PasswordHasher
  ) {}

  exec (email: string, password: string): AccessTokenOrError {
    const user = this.loadUserByEmailRepository.load(email)
    if (!user) {
      return { err: 'Email not registered' }
    }
    if (!this.passwordHasher.compare(password, user.password)) {
      return { err: 'Incorrect password' }
    }
    return {
      token: this.accessTokenGenerator.generate({ id: user.id, userName: user.name })
    }
  }
}
