import { RequiredFieldsValidator } from '@/presentation/validators/required-fields-validator'

export class RequiredFieldsValidatorSpy<T> implements RequiredFieldsValidator<T> {
  result: string[] = []
  input: T
  validate (input: T): string[] {
    this.input = input
    return this.result
  }
}
