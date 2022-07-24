export interface CheckISBNExistsRepository {
  checkIsbn: (isbn: string) => Promise<boolean>
}
