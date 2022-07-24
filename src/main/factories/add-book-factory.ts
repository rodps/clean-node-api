import { AddBook } from '@/domain/usecases/add-book'
import { BookRepository } from '@/infra/repositories/prisma/book-repository'
import prisma from '@/infra/repositories/prisma/client'
import { AddBookValidator } from '@/infra/validators/add-book-validator'
import { AddBookController } from '@/presentation/controllers/add-book-controller'

export const makeAddBook = (): AddBookController => {
  const bookRepo = new BookRepository(prisma)
  const addBook = new AddBook(bookRepo, bookRepo)
  const validator = new AddBookValidator()
  return new AddBookController(addBook, validator)
}
