import { CreateAccountErrors, CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use-error'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { RequiredFieldsError } from '../errors/required-fields-error'
import { HttpResponse } from '../protocols/http-response'
import { EmailValidator } from '../validators/email-validator'
import { RequiredFieldsValidator } from '../validators/required-fields-validator'

export class CreateAccountController {
  constructor (
    private readonly createAccount: CreateAccountUseCase,
    private readonly emailValidator: EmailValidator,
    private readonly requiredFieldsValidator: RequiredFieldsValidator<CreateAccountParams>
  ) {}

  async handle (req: CreateAccountParams): Promise<HttpResponse> {
    try {
      const requiredFields = this.requiredFieldsValidator.validate(req)
      if (requiredFields.length > 0) {
        return HttpResponse.badRequest(new RequiredFieldsError(requiredFields))
      }
      if (!this.emailValidator.isValid(req.email)) {
        return HttpResponse.badRequest(new InvalidEmailError())
      }
      const { id, err } = await this.createAccount.exec(req)
      if (id) {
        return HttpResponse.created(`/users/${id}`)
      } else {
        if (err === CreateAccountErrors.EMAIL_ALREADY_EXISTS) {
          return HttpResponse.conflict(new EmailAlreadyInUseError())
        } else {
          return HttpResponse.serverError()
        }
      }
    } catch {
      return HttpResponse.serverError()
    }
  }
}
