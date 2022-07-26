import { AuthMiddleware } from './auth-middleware'
import { mock } from 'jest-mock-extended'
import { AuthorizeUseCase } from '@/domain/ports/usecases/authorize-usecase'
import { HttpResponse } from '../protocols/http-response'

describe('Auth middleware', () => {
  test('should return unauthorized error if Authorize fails', async () => {
    const authorizeSpy = mock<AuthorizeUseCase>()
    authorizeSpy.exec.mockResolvedValue(null)
    const sut = new AuthMiddleware(authorizeSpy)
    const result = await sut.handle('any_token')
    expect(result.error).toEqual(HttpResponse.unauthorized())
    expect(result.id).toBeFalsy()
  })
})
