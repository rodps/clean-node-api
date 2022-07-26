import { AuthorizeUseCase } from '@/domain/ports/usecases/authorize-usecase'
import { HttpResponse } from '../protocols/http-response'

export interface AuthMiddlewareResult {
  error?: HttpResponse
  id?: string
}

export class AuthMiddleware {
  constructor (private readonly authorize: AuthorizeUseCase) {}

  async handle (accessToken: string): Promise<AuthMiddlewareResult> {
    try {
      const id = await this.authorize.exec(accessToken)
      if (!id) {
        return { error: HttpResponse.unauthorized() }
      }
      return { id }
    } catch {
      return { error: HttpResponse.serverError() }
    }
  }
}
