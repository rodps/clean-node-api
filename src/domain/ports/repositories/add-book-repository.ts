import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/add-book'

export interface AddBookRepository {
  add: (book: AddBookParams) => Promise<Book>
}
