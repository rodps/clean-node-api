import { AccessTokenOrError, AuthenticateParams, AuthenticateUseCase } from '@/domain/ports/usecases/authenticate-usecase'

export class AuthenticateSpy implements AuthenticateUseCase {
  result: AccessTokenOrError = { accessToken: 'any_token' }
  params: AuthenticateParams
  async exec (params: AuthenticateParams): Promise<AccessTokenOrError> {
    this.params = params
    return this.result
  }
}
