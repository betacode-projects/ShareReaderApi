import express from 'express'
import cors from 'cors'
import { router } from './routes/router'

const app: express.Express = express()
const port = process.env.PORT || 8080

app.use(cors({
  exposedHeaders: 'content-disposition'
}))
app.use('/public', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use((req, res, next) => {
  res.status(404).send('Sorry can not find that!')
})

app.listen(8080, () => {
  console.log('share-reader-api app listening on port ', port)
})