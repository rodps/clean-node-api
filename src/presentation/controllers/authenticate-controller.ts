import { AuthenticateParams, AuthenticateUseCase } from '@/domain/ports/usecases/authenticate-usecase'
import { HttpResponse } from '../protocols/http-response'
import { Validator } from '../protocols/validator'

export class AuthenticateController {
  constructor (
    private readonly authenticate: AuthenticateUseCase,
    private readonly validator: Validator<AuthenticateParams>
  ) {}

  async handle (params: AuthenticateParams): Promise<HttpResponse> {
    this.validator.validate(params)
    return HttpResponse.ok()
  }
}
