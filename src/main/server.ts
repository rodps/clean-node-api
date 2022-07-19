import app from './config'

app.listen(process.env.APP_PORT, () => {
  console.log(`server listen on port: ${process.env.APP_PORT ?? ''}`)
})
