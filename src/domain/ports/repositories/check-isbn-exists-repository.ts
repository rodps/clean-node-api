export interface CheckISBNExistsRepository {
  check: (isbn: string) => Promise<boolean>
}
