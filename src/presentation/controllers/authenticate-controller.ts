import { AuthenticateErrors, AuthenticateParams, AuthenticateUseCase } from '@/domain/ports/usecases/authenticate-usecase'
import { EmailNotRegisteredError } from '../errors/email-not-registered-error'
import { HttpResponse } from '../protocols/http-response'
import { Validator } from '../protocols/validator'

export class AuthenticateController {
  constructor (
    private readonly authenticate: AuthenticateUseCase,
    private readonly validator: Validator<AuthenticateParams>
  ) {}

  async handle (params: AuthenticateParams): Promise<HttpResponse> {
    const validationError = this.validator.validate(params)
    if (validationError) return HttpResponse.badRequest(validationError)

    const { accessToken, err } = await this.authenticate.exec(params)
    if (accessToken) {
      return HttpResponse.ok()
    } else {
      switch (err) {
        case AuthenticateErrors.EMAIL_NOT_REGISTERED:
          return HttpResponse.unauthorized([new EmailNotRegisteredError('email')])
        default:
          return HttpResponse.serverError()
      }
    }
  }
}
