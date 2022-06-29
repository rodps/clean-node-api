import { CheckEmailExistsRepository } from '@/domain/ports/repositories/check-email-exists-repository'

export class CheckEmailExistsRepositorySpy implements CheckEmailExistsRepository {
  email: string
  result: boolean = false
  async check (email: string): Promise<Boolean> {
    this.email = email
    return await Promise.resolve(this.result)
  }
}
