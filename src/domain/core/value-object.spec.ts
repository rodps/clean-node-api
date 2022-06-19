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
})
