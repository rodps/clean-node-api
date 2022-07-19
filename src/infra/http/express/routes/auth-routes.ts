/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeCreateAccount } from '@/main/factories/create-account-factory'
import { Router, Request, Response } from 'express'
const router = Router()

router.post('/signup', async (req: Request, res: Response) => {
  const createAccountController = makeCreateAccount()
  const httpResponse = await createAccountController.handle(req.body)
  res.status(httpResponse.statusCode).header(httpResponse.header).send(httpResponse.body)
})

export default router
