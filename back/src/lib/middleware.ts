import { ZodSchema } from 'zod'
import authenticationMiddleware from '../middlewares/authentication'
import authorizationMiddleware, {
  UserRoles,
} from '../middlewares/authorization'
import validationMiddleware from '../middlewares/validation'

export function Authenticate(roles?: UserRoles[]) {
  if (roles && roles.some((r) => true))
    return [authenticationMiddleware, authorizationMiddleware(roles)]

  return authenticationMiddleware
}

export function Validate(schema: ZodSchema) {
  return validationMiddleware(schema)
}
