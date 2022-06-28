import { LoadUserByEmailRepository } from '../ports/repositories/load-user-by-email'

interface AuthorizeResult {
  err?: string
}

export class Authorize {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  exec (email: string, password: string): AuthorizeResult {
    return { err: 'Email not registered' }
  }
}
