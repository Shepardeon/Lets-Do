import * as express from 'express'
import { requestValidation } from '../middlewares/validation'
import { UserController } from '../../app/controllers/userController'

const userRoutes = express.Router()
const userController = new UserController()

userRoutes.post(
  '/token',
  requestValidation(userController.getTokenRequest),
  userController.getToken
)

export { userRoutes }
