import { CheckISBNExistsRepository } from '@/domain/ports/repositories/check-isbn-exists-repository'

export class CheckISBNExistsRepositorySpy implements CheckISBNExistsRepository {
  result: boolean = false
  check (isbn: string): boolean {
    return this.result
  }
}
