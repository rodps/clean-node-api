import { RequiredFieldsValidatorImpl } from './required-fields-validator'

describe('Required fields validator', () => {
  test('should return an array containing missing parameters if the input has missing parameters', () => {
    const sut = new RequiredFieldsValidatorImpl<any>(['field1', 'field2'])
    expect(sut.validate({})).toEqual(['field1', 'field2'])
  })

  test('should return an array containing missing parameters if the input has empty strings', () => {
    const sut = new RequiredFieldsValidatorImpl<any>(['field1', 'field2'])
    expect(sut.validate({
      field1: 0,
      field2: ''
    })).toEqual(['field2'])
  })
})
