import { AuthorizeUseCase } from '@/domain/ports/usecases/authorize-usecase'
import { HttpResponse } from '../protocols/http-response'

export interface AuthMiddlewareResult {
  error?: HttpResponse
  id?: string
}

export class AuthMiddleware {
  constructor (private readonly authorize: AuthorizeUseCase) {}

  async handle (accessToken: string): Promise<AuthMiddlewareResult> {
    if (!accessToken.startsWith('Bearer ')) {
      return { error: HttpResponse.unauthorized() }
    }
    const token = accessToken.substring(7)
    try {
      const id = await this.authorize.exec(token)
      if (!id) {
        return { error: HttpResponse.unauthorized() }
      }
      return { id }
    } catch {
      return { error: HttpResponse.serverError() }
    }
  }
}
