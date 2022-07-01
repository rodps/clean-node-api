import { CheckISBNExistsRepository } from '@/domain/ports/repositories/check-isbn-exists-repository'

export class CheckISBNExistsRepositorySpy implements CheckISBNExistsRepository {
  result: boolean = false
  isbn: string
  check (isbn: string): boolean {
    this.isbn = isbn
    return this.result
  }
}
