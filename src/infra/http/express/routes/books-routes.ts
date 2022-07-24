/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeAddBook } from '@/main/factories/add-book-factory'
import { Request, Response, Router } from 'express'
const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const addBookController = makeAddBook()
  const { statusCode, body, header } = await addBookController.handle(req.body)
  res.status(statusCode).header(header).send(body)
})

export default router
