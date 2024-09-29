import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import BuildAppService from './middlewares/appServices'
/* ROUTES IMPORT */
BuildAppService()
import { AuthRoutes } from './routes/authRoutes'
import errorHandlingMiddleware from './middlewares/errorHandling'

/* CONFIGURATION */
dotenv.config()
const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/* ROUTES */
// Health check route
app.get('/', function (req, res, next) {
  res.json({ message: 'App is healthy' })
})

app.use('/auth', AuthRoutes)

// Not found catch all
app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not Found' })
})

// Error catch all
app.use(errorHandlingMiddleware)

/* SERVER */
const port = process.env.NODE_PORT || 3000
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
