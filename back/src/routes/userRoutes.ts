import * as express from 'express'
import { authentication } from '../middlewares/authentication'
import { authorization } from '../middlewares/authorization'
import { requestValidation } from '../middlewares/validation'
import { UserRole } from '../entities/User'
import { getToken, getTokenRequest } from '../endpoints/users/getTokenEndpoint'

const userRoutes = express.Router()

userRoutes.post('/token', requestValidation(getTokenRequest), getToken)

export { userRoutes }
