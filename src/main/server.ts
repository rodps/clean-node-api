import app from './config'
import { env } from './env'

app.listen(process.env.APP_PORT, () => {
  console.log(`server listen on port: ${env.port}`)
})
