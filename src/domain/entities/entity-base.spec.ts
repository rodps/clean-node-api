import { Entity } from './entity-base'

class EntitySpy extends Entity {}

describe('Entity Base', () => {
  test('Should create an entity with correct values', () => {
    const id = 'any_id'
    const entity = new EntitySpy(id)
    expect(entity.id).toBe(id)
  })
})
