import { EntityID } from './entity-id'

describe('Entity ID', () => {
  test('Should return an instance with a valid UUID when no param is provided', () => {
    const { id, err } = EntityID.create()
    const validUUIDRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    expect(err).toBeFalsy()
    expect(id?.id).toMatch(validUUIDRegex)
  })

  test('Should return an error if UUID provided is invalid', () => {
    const { id, err } = EntityID.create('invalid_uuid')
    expect(id).toBeFalsy()
    expect(err).toBe('Invalid UUID')
  })

  test('Should return an instance with same UUID', () => {
    const validUuid = '58abc676-8362-4145-9225-3016abdbb828'
    const { id } = EntityID.create(validUuid)
    expect(id?.id).toBe(validUuid)
  })
})
