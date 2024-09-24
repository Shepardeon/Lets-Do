import * as express from 'express'
import { requestValidation } from '../middlewares/validation'
import { authentication } from '../middlewares/authentication'
import { ProjectController } from '../../app/controllers/projectController'

const projectRoutes = express.Router()
const projectController = new ProjectController()

projectRoutes.get('', authentication, projectController.listUserProjectEndpoint)

export { projectRoutes }
