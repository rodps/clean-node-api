import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements PasswordHasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }

  async compare (plainText: string, hash: string): Promise<boolean> {
    return true
  }
}
