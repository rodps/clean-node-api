import { AddBookParams } from '@/domain/usecases/add-book'

export interface AddBookRepository {
  add: (book: AddBookParams) => Promise<string>
}
