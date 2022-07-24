import express from 'express'
import AuthRoutes from '@/infra/http/express/routes/auth-routes'
import BooksRoutes from '@/infra/http/express/routes/books-routes'
import './env'

const app = express()
app.use(express.json())
app.use('/', AuthRoutes)
app.use('/books', BooksRoutes)

export default app
