import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../infrastructure/dbConnection'
import { User } from '../../domain/entities/User'
import { useAuthService } from '../services/authService'
import * as joi from 'joi'

export class UserController {
  private userRepository = AppDataSource.getRepository(User)
  private authService = useAuthService()

  getTokenRequest = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  })
  async getToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body

      const user = await this.userRepository.findOne({ where: { username } })
      const authed = await this.authService.compareStringAsync(
        password,
        user?.password ?? ''
      )

      if (!user || !authed) {
        return res.status(404).json({ message: 'Invalid username or password' })
      }

      const token = this.authService.generateToken({
        id: user.id,
        username: user.username,
      })

      return res.status(200).json({ token })
    } catch (err) {
      next(err)
    }
  }
}
