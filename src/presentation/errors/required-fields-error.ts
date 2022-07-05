import { ClientError } from '../protocols/client-error'

export class RequiredFieldsError extends ClientError {
  constructor (requiredFields: string[]) {
    const errors = requiredFields.reduce((prev, curr) => {
      prev[curr] = 'This field is required'
      return prev
    }, {})
    super(errors)
  }
}
