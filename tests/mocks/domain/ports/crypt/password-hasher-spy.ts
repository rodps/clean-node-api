import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'

export class PasswordHasherSpy implements PasswordHasher {
  hashResult: string = 'hashed_password'
  compareResult: boolean = true
  hash (password: string): string {
    return this.hashResult
  }

  compare (plainText: string, hash: string): boolean {
    return this.compareResult
  }
}
