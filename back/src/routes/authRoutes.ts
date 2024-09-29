import { Router } from 'express'
import AuthController from '../controllers/authController'
import { Validate } from '../lib/middleware'
import { handleErrorAsync } from '../middlewares/errorHandling'

const router = Router()
const controller = new AuthController()

router.post(
  '/register',
  Validate(AuthController.registerUserRequest),
  handleErrorAsync(controller.registerUser.bind(controller))
)
router.post(
  '/login',
  Validate(AuthController.authUserRequest),
  handleErrorAsync(controller.authUser.bind(controller))
)

export { router as AuthRoutes }
