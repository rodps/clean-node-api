import { UserName } from './user-name'

describe('User Name', () => {
  test('Should have at least 4 characters', () => {
    const nameShorterThan4Characters = 'nam'
    const { userName, err } = UserName.create(nameShorterThan4Characters)
    expect(userName).toBeFalsy()
    expect(err).toBe('Name length must be longer than 4 characters and shorter than 32 characters')
  })

  test('Should have at most 32 characters', () => {
    const nameLongerThan4Characters = 'very long name aaaaaaaaaaaaaaaaaaaa'
    const { userName, err } = UserName.create(nameLongerThan4Characters)
    expect(userName).toBeFalsy()
    expect(err).toBe('Name length must be longer than 4 characters and shorter than 32 characters')
  })
})
