import { EntityID } from './entity-id'

describe('Entity ID', () => {
  test('Should return an instance with a valid UUID when no param are passed', () => {
    const entityId = new EntityID()
    const validUUIDRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    expect(entityId.id).toMatch(validUUIDRegex)
  })
})
