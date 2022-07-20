import dotenv from 'dotenv'
import path from 'path'
const envFile = `.env.${process.env.NODE_ENV ?? 'dev'}`
const envPath = path.resolve(process.cwd(), envFile)
dotenv.config({ path: envPath })
