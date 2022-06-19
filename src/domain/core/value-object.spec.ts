/* eslint-disable no-new */
import { ValueObject } from './value-object'

class ValueObjectMock extends ValueObject<string, string> {

}

describe('Value Object', () => {
  test('Should throws if value and error are not assigneds', () => {
    expect(() => { new ValueObjectMock() }).toThrow('Value and error are not assigneds')
  })

  test('Should throws if value and error are assigneds', () => {
    expect(() => { new ValueObjectMock('any_value', 'any_error') }).toThrow('Only value or only error can be assigned')
  })

  test('Should assign correct values to the object properties', () => {
    const value = 'any_value'
    const valueObjectMockWithValue = new ValueObjectMock(value)
    expect(valueObjectMockWithValue.value).toBe(value)
    expect(valueObjectMockWithValue.err).toBeFalsy()

    const err = 'any_error'
    const valueObjectMockWithError = new ValueObjectMock(undefined, err)
    expect(valueObjectMockWithError.value).toBeFalsy()
    expect(valueObjectMockWithError.err).toBe(err)
  })
})
