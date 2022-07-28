import { Book } from '@/domain/models/book'
import { UseCaseError } from '@/domain/ports/errors/use-case-error'
import { AddBook, AddBookParams } from '@/domain/usecases/add-book'
import { env } from '@/main/env'
import { fold } from 'fp-ts/lib/Either'
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

      const onSuccess = (book: Book): HttpResponse => {
        return HttpResponse.created(`${env.baseUrl}/books/${book.id}`, book)
      }

      const onError = (err: UseCaseError): HttpResponse => {
        return HttpResponse.unprocessableEntity(err)
      }

      return fold(onError, onSuccess)(await this.addBook.exec(req))
    } catch {
      return HttpResponse.serverError()
    }
  }
}
