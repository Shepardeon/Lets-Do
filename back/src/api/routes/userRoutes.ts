import express from 'express'
import { requestValidation } from '../middlewares/validation'
import { UserController } from '../../app/controllers/userController'
import { authentication } from '../middlewares/authentication'
import { authorization } from '../middlewares/authorization'

const userRoutes = express.Router()
const userController = new UserController()

userRoutes.get(
  '',
  authentication,
  authorization['Admin'],
  userController.listUsers.bind(userController)
)

userRoutes.patch(
  ':id',
  authentication,
  authorization['Admin'],
  userController.updateUser.bind(userController)
)

userRoutes.delete(
  ':id',
  authentication,
  authorization['Admin'],
  userController.deleteUser.bind(userController)
)

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
