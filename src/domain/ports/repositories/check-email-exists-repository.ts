export interface CheckEmailExistsRepository {
  check: (email: string) => Promise<Boolean>
}
