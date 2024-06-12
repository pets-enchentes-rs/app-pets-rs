import app from './app'

const port = process.env.SERVER_PORT ?? 8080

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})
