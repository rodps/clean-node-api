export interface UserNameOrError {
  userName?: UserName
  err?: string
}

export class UserName {
  readonly name: string
  private constructor (name: string) {
    this.name = name
  }

  static create (name: string): UserNameOrError {
    if (name.length < 4 || name.length > 32) {
      return { err: 'Name length must be longer than 4 characters and shorter than 32 characters' }
    }
    return { userName: new UserName(name) }
  }
}
