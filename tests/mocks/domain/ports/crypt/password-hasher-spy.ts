import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'

export class PasswordHasherSpy implements PasswordHasher {
  hashResult: string = 'hashed_password'
  compareResult: boolean = true
  plainText: string
  passwordHash: string
  hash (password: string): string {
    return this.hashResult
  }

  compare (plainText: string, passwordHash: string): boolean {
    this.plainText = plainText
    this.passwordHash = passwordHash
    return this.compareResult
  }
}
