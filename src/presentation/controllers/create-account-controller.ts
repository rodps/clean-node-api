import { CreateAccountErrors, CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { fold } from 'fp-ts/lib/Either'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use-error'
import { HttpResponse } from '../protocols/http-response'
import { Validator } from '../protocols/validator'

export class CreateAccountController {
  constructor (
    private readonly createAccount: CreateAccountUseCase,
    private readonly validator: Validator<CreateAccountParams>
  ) {}

  async handle (req: CreateAccountParams): Promise<HttpResponse> {
    try {
      const validationError = this.validator.validate(req)
      if (validationError) return HttpResponse.badRequest(validationError)

      const onError = (err: CreateAccountErrors): HttpResponse => {
        switch (err) {
          case CreateAccountErrors.EMAIL_ALREADY_EXISTS:
            return HttpResponse.conflict(new EmailAlreadyInUseError('email'))
          default:
            return HttpResponse.serverError()
        }
      }

      const onSuccess = (id: string): HttpResponse => {
        return HttpResponse.created(`${process.env.BASE_URL ?? ''}/users/${id}`)
      }

      return fold(onError, onSuccess)(await this.createAccount.exec(req))
    } catch {
      return HttpResponse.serverError()
    }
  }
}
