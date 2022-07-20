import express from 'express'
import AuthRoutes from '@/infra/http/express/routes/auth-routes'
import './env'

const app = express()
app.use(express.json())
app.use('/', AuthRoutes)

export default app
