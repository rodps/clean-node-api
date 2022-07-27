import dotenv from 'dotenv'
import path from 'path'
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  const envFile = `.env.${process.env.NODE_ENV}`
  const envPath = path.resolve(process.cwd(), envFile)
  dotenv.config({ path: envPath })
} else {
  dotenv.config()
}

const port = 3000
export const env = {
  port: process.env.PORT ?? port,
  baseUrl: process.env.BASE_URL ?? `http://localhost:${port}`,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
