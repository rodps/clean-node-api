import { RequiredFieldsValidator } from '@/presentation/validators/required-fields-validator'

export class RequiredFieldsValidatorImpl<T> implements RequiredFieldsValidator<T> {
  constructor (private readonly requiredFields: string[]) {}

  validate (input: T): string[] {
    const keys = Object.keys(input)
    const missing: string[] = []
    this.requiredFields.forEach(required => {
      if (!(keys.includes(required))) {
        missing.push(required)
      } else {
        if (input[required] === '') {
          missing.push(required)
        }
      }
    })
    return missing
  }
}
