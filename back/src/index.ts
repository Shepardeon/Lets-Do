import { AppDataSource } from './data-source'
import * as express from 'express'
import * as dotenv from 'dotenv'

import { notFound } from './middlewares/notFound'
import { errorHandling } from './middlewares/errorHandling'
import { userRoutes } from './routes/userRoutes'
import { dbSeed } from './initializers/dbSeeders'
import { projectRoutes } from './routes/projectRoutes'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/users', userRoutes)
app.use('/projects', projectRoutes)

app.use(notFound)
app.use(errorHandling)

AppDataSource.initialize()
  .then(async (dataSource) => {
    app.listen(process.env.API_PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.API_PORT} in ${process.env.NODE_ENV} mode`
      )
    })

    console.log('Data source has been initialized!')

    if (process.env.NODE_ENV === 'dev') {
      console.log('Begin data seeding...')
      await dbSeed(dataSource)
      console.log('Data seeding finished!')
    }
  })
  .catch((err) => console.error(`INIT ERROR: ${err}`))
