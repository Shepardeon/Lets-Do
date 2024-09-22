import * as express from 'express'
import { requestValidation } from '../middlewares/validation'
import {
  getToken,
  getTokenRequest,
} from '../api/endpoints/users/getTokenEndpoint'

const userRoutes = express.Router()

userRoutes.post('/token', requestValidation(getTokenRequest), getToken)

export { userRoutes }
