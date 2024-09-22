import * as express from 'express'
import { requestValidation } from '../middlewares/validation'
import { authentication } from '../middlewares/authentication'
import { listUserProjectEndpoint } from '../api/endpoints/projects/listUserProjectEndpoint'

const projectRoutes = express.Router()

projectRoutes.get('', authentication, listUserProjectEndpoint)

export { projectRoutes }
