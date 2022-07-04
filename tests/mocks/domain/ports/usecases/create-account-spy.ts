import { CreateAccountParams, CreateAccountUseCase, IdOrError } from '@/domain/ports/usecases/create-account-usecase'

export class CreateAccountSpy implements CreateAccountUseCase {
  params: CreateAccountParams
  result: IdOrError = { id: 'any_id' }
  async exec (params: CreateAccountParams): Promise<IdOrError> {
    this.params = params
    return await Promise.resolve(this.result)
  }
}
