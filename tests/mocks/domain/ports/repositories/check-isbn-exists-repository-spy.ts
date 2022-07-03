import { CheckISBNExistsRepository } from '@/domain/ports/repositories/check-isbn-exists-repository'

export class CheckISBNExistsRepositorySpy implements CheckISBNExistsRepository {
  result: boolean = false
  isbn: string
  async check (isbn: string): Promise<boolean> {
    this.isbn = isbn
    return this.result
  }
}
