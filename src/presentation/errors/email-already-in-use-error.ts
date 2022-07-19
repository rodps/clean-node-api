import { ValidationError } from '../protocols/validator'

export class EmailAlreadyInUseError extends ValidationError {
  constructor (field: string) {
    super(field, 'This email is already in use')
  }
}
