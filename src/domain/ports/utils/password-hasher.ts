export interface PasswordHasher {
  hash: (password: string) => string
  compare: (plainText: string, hash: string) => boolean
}
