import express, { NextFunction, Request, Response, Router } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import BuildAppService from './middlewares/appServices'
/* ROUTES IMPORT */

/* CONFIGURATION */
dotenv.config()
const app = express()
BuildAppService()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/* ROUTES */
app.get('/', function (req, res, next) {
  res.json({ message: 'App is healthy' })
})

/* SERVER */
const port = process.env.NODE_PORT || 3000
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
