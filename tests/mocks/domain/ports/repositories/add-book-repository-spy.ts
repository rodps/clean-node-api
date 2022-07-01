import { AddBookRepository } from '@/domain/ports/repositories/add-book-repository'
import { AddBookParams } from '@/domain/usecases/add-book'

export class AddBookRepositorySpy implements AddBookRepository {
  book: AddBookParams
  async add (book: AddBookParams): Promise<string> {
    this.book = book
    return await Promise.resolve('any_id')
  }
}
