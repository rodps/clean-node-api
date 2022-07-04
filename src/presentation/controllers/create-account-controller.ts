import { CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { EmailValidator } from '../validators/email-validator'
import { HttpResponse } from './response'

export class CreateAccountController {
  constructor (
    private readonly createAccount: CreateAccountUseCase,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (req: CreateAccountParams): Promise<HttpResponse> {
    await this.createAccount.exec(req)
    return HttpResponse.ok({})
  }
}
