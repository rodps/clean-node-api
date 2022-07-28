import { Either, left, right } from 'fp-ts/lib/Either'
import { Book } from '../models/book'
import { UseCaseError } from '../ports/errors/use-case-error'
import { AddBookRepository } from '../ports/repositories/add-book-repository'
import { CheckISBNExistsRepository } from '../ports/repositories/check-isbn-exists-repository'

export interface AddBookParams {
  title: string
  isbn: string
  pages: number
  author: string
  edition: number
  publisher: string
  description: string
  publish_date: string
  genre: string
  copies: number
  userId: string
}

export class AddBook {
  constructor (
    private readonly checkIsbnExistsRepository: CheckISBNExistsRepository,
    private readonly addBookRepository: AddBookRepository
  ) {}

  async exec (params: AddBookParams): Promise<Either<UseCaseError, Book>> {
    if (await this.checkIsbnExistsRepository.checkIsbn(params.isbn)) {
      return left({ field: 'isbn', message: 'This ISBN is already added' })
    }
    const book = await this.addBookRepository.add(params)
    return right(book)
  }
}
