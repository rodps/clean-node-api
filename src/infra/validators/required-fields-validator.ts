import { RequiredFieldsValidator } from '@/presentation/validators/required-fields-validator'

export class RequiredFieldsValidatorImpl<T> implements RequiredFieldsValidator<T> {
  constructor (private readonly requiredFields: string[]) {}

  validate (input: T): string[] {
    const keys = Object.keys(input)
    let missing: string[] = []
    this.requiredFields.forEach(required => {
      if (!(keys.includes(required))) {
        missing = [...missing, required]
      } else {
        if (!input[required]) {
          missing = [...missing, required]
        }
      }
    })
    return missing
  }
}
