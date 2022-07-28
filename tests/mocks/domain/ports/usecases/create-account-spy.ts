import { UseCaseError } from '@/domain/ports/errors/use-case-error'
import { CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { Either, right } from 'fp-ts/lib/Either'

export class CreateAccountSpy implements CreateAccountUseCase {
  params: CreateAccountParams
  result: Either<UseCaseError, string> = right('any_id')
  async exec (params: CreateAccountParams): Promise<Either<UseCaseError, string>> {
    this.params = params
    return await Promise.resolve(this.result)
  }
}
