import { NextFunction, Request, Response } from 'express'
import { ServiceLocator } from '../services/serviceLocator'
import { IUserRepository } from '../services'
import { ICrudRepository } from '../lib/repositories/crudRepository'
import { User } from '@prisma/client'

export enum UserRoles {
  User = 'User',
  Admin = 'Admin',
}

export default function authorizationMiddleware(roles: UserRoles[]) {
  const userRepository: ICrudRepository<User> =
    ServiceLocator.getService(IUserRepository)

  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await userRepository.getByIdAsync(res.locals.user?.id ?? 0)

    if (!user || !roles.includes(user.role as UserRoles)) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }

    next()
  }
}
