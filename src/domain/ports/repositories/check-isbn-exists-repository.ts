export interface CheckISBNExistsRepository {
  check: (isbn: string) => boolean
}