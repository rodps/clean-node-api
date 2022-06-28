import { LoadUserByEmailRepository } from '../ports/repositories/load-user-by-email'

interface AuthorizeResult {
  err?: string
}

export class Authorize {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  exec (email: string, password: string): AuthorizeResult {
    const user = this.loadUserByEmailRepository.load(email)
    if (!user) return { err: 'Email not registered' }
    return { err: 'Incorrect password' }
  }
}
