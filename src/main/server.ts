import 'module-alias/register'
import app from './config'
import { env } from './env'

app.listen(env.port, () => {
  console.log(`server listen on port: ${env.port}`)
})
