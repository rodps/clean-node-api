export interface CheckEmailExistsRepository {
  checkEmail: (email: string) => Promise<Boolean>
}
