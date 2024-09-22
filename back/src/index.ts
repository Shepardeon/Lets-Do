import { AppDataSource } from './data-source'
import * as express from 'express'
import * as dotenv from 'dotenv'

import { notFound } from './middlewares/notFound'
import { errorHandling } from './middlewares/errorHandling'
import { userRoutes } from './routes/userRoutes'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/users', userRoutes)

app.use(errorHandling)
app.use(notFound)

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.API_PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.API_PORT} in ${process.env.NODE_ENV} mode`
      )
    })

    console.log('Data source has been initialized!')
  })
  .catch((err) => console.error(`INIT ERROR: ${err}`))
