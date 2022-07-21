export interface AuhtorizeUseCase {
  exec: (token: string) => Promise<string | null>
}
