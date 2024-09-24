import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../infrastructure/dbConnection'
import { User, UserRole } from '../../domain/entities/User'

export const authorization = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({
      where: { id: req['currentUser'].id },
    })

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  }
}
