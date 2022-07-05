import { ClientError } from '../protocols/client-error'

export class EmailAlreadyInUseError extends ClientError {
  constructor () {
    super({ email: 'This email is already in use' })
  }
}
