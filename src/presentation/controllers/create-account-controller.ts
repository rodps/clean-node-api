import { CreateAccountErrors, CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { EmailValidator } from '../validators/email-validator'
import { HttpResponse } from './response'

export class CreateAccountController {
  constructor (
    private readonly createAccount: CreateAccountUseCase,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (req: CreateAccountParams): Promise<HttpResponse> {
    try {
      if (!this.emailValidator.isValid(req.email)) {
        return HttpResponse.badRequest({ email: 'This email is not valid' })
      }
      const { id, err } = await this.createAccount.exec(req)
      if (id) {
        return HttpResponse.created(`/users/${id}`)
      } else {
        if (err === CreateAccountErrors.EMAIL_ALREADY_EXISTS) {
          return HttpResponse.conflict({ email: 'This email is already in use' })
        } else {
          return HttpResponse.serverError()
        }
      }
    } catch {
      return HttpResponse.serverError()
    }
  }
}
