import dotenv from 'dotenv'
import path from 'path'
const envFile = `.env.${process.env.NODE_ENV ?? 'dev'}`
const envPath = path.resolve(process.cwd(), envFile)
dotenv.config({ path: envPath })

const port = 3000
export const env = {
  port: process.env.APP_PORT ?? port,
  baseUrl: process.env.BASE_URL ?? `http://localhost:${port}`,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
