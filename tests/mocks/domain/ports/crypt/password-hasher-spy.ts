import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'

export class PasswordHasherSpy implements PasswordHasher {
  hashResult: string = 'hashed_password'
  compareResult: boolean = true
  plainText: string
  passwordHash: string
  async hash (password: string): Promise<string> {
    return this.hashResult
  }

  async compare (plainText: string, passwordHash: string): Promise<boolean> {
    this.plainText = plainText
    this.passwordHash = passwordHash
    return this.compareResult
  }
}
