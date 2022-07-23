import { TokenVerifier } from '../ports/crypt/token-verifier'
import { AuthorizeUseCase } from '../ports/usecases/authorize-usecase'

export class Authorize implements AuthorizeUseCase {
  constructor (
    private readonly tokenVerifier: TokenVerifier,
    private readonly role: string
  ) {}

  async exec (token: string): Promise<string | null> {
    const payload = await this.tokenVerifier.verify(token)
    if (payload) {
      if (payload.role !== this.role) {
        return null
      }
      return payload.id
    }
    return null
  }
}
