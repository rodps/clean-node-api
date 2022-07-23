export interface AuthorizeUseCase {
  exec: (token: string) => Promise<string | null>
}
