import { UseCaseError } from '@/domain/ports/errors/use-case-error'
import { CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { fold } from 'fp-ts/lib/Either'
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

      const onError = (err: UseCaseError): HttpResponse => {
        return HttpResponse.unprocessableEntity(err)
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
