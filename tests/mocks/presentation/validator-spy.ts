import { ValidationError, Validator } from '@/presentation/protocols/validator'

export class ValidatorSpy implements Validator<any> {
  result: ValidationError[] | null = null
  params: any
  validate (request: any): ValidationError[] | null {
    this.params = request
    return this.result
  }
}
