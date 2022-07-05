import { ClientError } from '../protocols/client-error'

export class InvalidEmailError extends ClientError {
  constructor () {
    super({ email: 'This email is invalid' })
  }
}
