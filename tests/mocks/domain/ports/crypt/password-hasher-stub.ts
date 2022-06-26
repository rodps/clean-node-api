import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'

export class PasswordHasherStub implements PasswordHasher {
  hash (password: string): string {
    return 'hashed_password'
  }

  compare (plainText: string, hash: string): boolean {
    return true
  }
}
