import { PrismaClient } from '@prisma/client'
import { AddBookRepository } from '@/domain/ports/repositories/add-book-repository'
import { CheckISBNExistsRepository } from '@/domain/ports/repositories/check-isbn-exists-repository'
import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/add-book'

export class BookRepository implements AddBookRepository, CheckISBNExistsRepository {
  private readonly prisma: PrismaClient
  constructor (db: PrismaClient) {
    this.prisma = db
  }

  async add (book: AddBookParams): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        author: book.author,
        copies: book.copies,
        description: book.description,
        edition: book.edition,
        genre: book.genre,
        isbn: book.isbn,
        pages: book.pages,
        publish_date: book.publish_date,
        publisher: book.publisher,
        title: book.title,
        addedBy: book.userId
      }
    })
  }

  async checkIsbn (isbn: string): Promise<boolean> {
    const book = await this.prisma.book.findFirst({
      where: {
        isbn
      }
    })
    return !!book
  }
}
