import { TokenVerifier } from '../ports/crypt/token-verifier'
import { AuhtorizeUseCase } from '../ports/usecases/authorize-usecase'

export class Authorize implements AuhtorizeUseCase {
  constructor (
    private readonly tokenVerifier: TokenVerifier,
    private readonly role: string
  ) {}

  async exec (token: string): Promise<string | null> {
    const payload = await this.tokenVerifier.verify(token)
    return payload?.id ?? null
  }
}
