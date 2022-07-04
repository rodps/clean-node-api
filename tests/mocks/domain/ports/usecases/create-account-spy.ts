import { CreateAccountParams, CreateAccountUseCase, IdOrError } from '@/domain/ports/usecases/create-account-usecase'

export class CreateAccountSpy implements CreateAccountUseCase {
  params: CreateAccountParams
  result: Promise<IdOrError> = Promise.resolve({ id: 'any_id' })
  async exec (params: CreateAccountParams): Promise<IdOrError> {
    this.params = params
    return await this.result
  }
}
