import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../infrastructure/dbConnection'
import { User, UserRole } from '../../domain/entities/User'
import { useAuthService } from '../services/authService'
import joi from 'joi'

export class UserController {
  private userRepository = AppDataSource.getRepository(User)
  private authService = useAuthService()

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = this.userRepository.find()

      return res.status(200).json({ users })
    } catch (err) {
      next(err)
    }
  }

  updateUserRequest = joi.object({
    username: joi.string(),
    role: joi.allow(UserRole),
  })
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { username, role } = req.body

      // TODO: finir
    } catch (err) {
      next(err)
    }
  }

  createAccountRequest = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
    code: joi.string().required(),
  })
  async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, code } = req.body

      if (!this.authService.validateCode(code)) {
        return res.status(400).json({ message: 'Invalid invite code' })
      }

      const user = this.userRepository.create({
        username,
        password: await this.authService.encryptAsync(password),
        role: UserRole.User,
      })

      return res.status(201).json({ id: user.id })
    } catch (err) {
      next(err)
    }
  }

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
