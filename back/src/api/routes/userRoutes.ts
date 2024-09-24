import express from 'express'
import { requestValidation } from '../middlewares/validation'
import { UserController } from '../../app/controllers/userController'

const userRoutes = express.Router()
const userController = new UserController()

userRoutes.post(
  '/token',
  requestValidation(userController.getTokenRequest),
  userController.getToken.bind(userController)
)

userRoutes.post(
  '/register',
  requestValidation(userController.createAccountRequest),
  userController.createAccount.bind(userController)
)

export { userRoutes }
