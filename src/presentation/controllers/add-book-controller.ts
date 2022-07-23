import { AddBook, AddBookErrors, AddBookParams } from '@/domain/usecases/add-book'
import { HttpResponse } from '../protocols/http-response'
import { Validator } from '../protocols/validator'

export class AddBookController {
  constructor (
    private readonly addBook: AddBook,
    private readonly validator: Validator<AddBookParams>
  ) {}

  async handle (req: AddBookParams): Promise<HttpResponse> {
    try {
      const errors = this.validator.validate(req)
      if (errors) return HttpResponse.badRequest(errors)

      const { book, err } = await this.addBook.exec(req)
      if (book) {
        return HttpResponse.ok(book)
      }
      switch (err) {
        case AddBookErrors.ISBN_ALREADY_REGISTERED:
          return HttpResponse.conflict({ field: 'isbn', message: 'ISBN already registered' })
        default:
          return HttpResponse.serverError()
      }
    } catch {
      return HttpResponse.serverError()
    }
  }
}
