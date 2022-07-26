import { AuthMiddleware } from './auth-middleware'
import { mock, MockProxy } from 'jest-mock-extended'
import { AuthorizeUseCase } from '@/domain/ports/usecases/authorize-usecase'
import { HttpResponse } from '../protocols/http-response'

interface SutTypes {
  authorizeSpy: MockProxy<AuthorizeUseCase>
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const authorizeSpy = mock<AuthorizeUseCase>()
  const sut = new AuthMiddleware(authorizeSpy)
  return {
    authorizeSpy,
    sut
  }
}

describe('Auth middleware', () => {
  test('should return unauthorized error if Authorize fails', async () => {
    const { authorizeSpy, sut } = makeSut()
    authorizeSpy.exec.mockResolvedValueOnce(null)
    const result = await sut.handle('Bearer any_token')
    expect(result.error).toEqual(HttpResponse.unauthorized())
    expect(result.id).toBeFalsy()
  })

  test('should return id if Authorize succeed', async () => {
    const { authorizeSpy, sut } = makeSut()
    authorizeSpy.exec.mockResolvedValueOnce('any_id')
    const result = await sut.handle('Bearer any_token')
    expect(result.error).toBeFalsy()
    expect(result.id).toBe('any_id')
  })

  test('should call Authorize with correct values', async () => {
    const { authorizeSpy, sut } = makeSut()
    await sut.handle('Bearer any_token')
    expect(authorizeSpy.exec).toHaveBeenCalledWith('any_token')
  })

  test('should return server error if Authorize throws error', async () => {
    const { authorizeSpy, sut } = makeSut()
    authorizeSpy.exec.mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle('Bearer any_token')
    expect(result.error).toEqual(HttpResponse.serverError())
    expect(result.id).toBeFalsy()
  })

  test('should return unauthorized if bearer token is not present', async () => {
    const { authorizeSpy, sut } = makeSut()
    authorizeSpy.exec.mockResolvedValueOnce('any_id')
    const result = await sut.handle('any_token')
    expect(result.error).toEqual(HttpResponse.unauthorized())
    expect(result.id).toBeFalsy()
  })
})
