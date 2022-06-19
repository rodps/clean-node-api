import { EntityID } from './entity-id'
import faker from 'faker'

describe('Entity ID', () => {
  test('Should return an instance with a valid UUID when no one is provided', () => {
    const { id, err } = EntityID.create()
    const validUUIDRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    expect(err).toBeFalsy()
    expect(id).toMatch(validUUIDRegex)
  })

  test('Should return an error if UUID provided is invalid', () => {
    const { id, err } = EntityID.create('invalid_uuid')
    expect(id).toBeFalsy()
    expect(err).toBe('Invalid UUID')
  })

  test('Should return an instance with same valid UUID provided and no error', () => {
    const validUuid = faker.datatype.uuid()
    const { id, err } = EntityID.create(validUuid)
    expect(id).toBe(validUuid)
    expect(err).toBeFalsy()
  })
})
