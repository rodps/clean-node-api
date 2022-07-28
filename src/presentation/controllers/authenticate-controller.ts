import { UseCaseError } from '@/domain/ports/errors/use-case-error'
import { AccessToken, AuthenticateParams, AuthenticateUseCase } from '@/domain/ports/usecases/authenticate-usecase'
import { fold } from 'fp-ts/lib/Either'
import { HttpResponse } from '../protocols/http-response'
import { Validator } from '../protocols/validator'

export class AuthenticateController {
  constructor (
    private readonly authenticate: AuthenticateUseCase,
    private readonly validator: Validator<AuthenticateParams>
  ) {}

  async handle (req: AuthenticateParams): Promise<HttpResponse> {
    try {
      const validationError = this.validator.validate(req)
      if (validationError) return HttpResponse.badRequest(validationError)

      const onError = (err: UseCaseError): HttpResponse => {
        return HttpResponse.unauthorized(err)
      }

      const onSuccess = (accessToken: AccessToken): HttpResponse => {
        return HttpResponse.ok(accessToken)
      }

      return fold(onError, onSuccess)(await this.authenticate.exec(req))
    } catch {
      return HttpResponse.serverError()
    }
  }
}
