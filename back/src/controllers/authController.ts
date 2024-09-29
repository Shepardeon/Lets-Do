import z from 'zod'
import { User } from '@prisma/client'
import { AuthService } from '../services/authService'
import { ServiceLocator } from '../services/serviceLocator'
import { IAuthService, IUserRepository } from '../services'
import { NextFunction, Request, Response } from 'express'
import { UserRoles } from '../middlewares/authorization'
import { UserRepository } from '../lib/repositories/userRepository'

type RegisterUserRequest = z.infer<typeof AuthController.registerUserRequest>
type AuthUserRequest = z.infer<typeof AuthController.authUserRequest>

export default class AuthController {
  private _authService: AuthService
  private _userRepository: UserRepository

  constructor() {
    this._authService = ServiceLocator.getService(IAuthService)
    this._userRepository = ServiceLocator.getService(IUserRepository)
  }

  static registerUserRequest = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
  })

  async registerUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RegisterUserRequest
    const user = {
      username: body.username,
      password: body.password,
      email: body.email,
      role: UserRoles.User as string,
    } as User

    if (
      (await this._userRepository.listAsync({ where: { email: body.email } }))
        .length
    ) {
      res.status(409).json({ message: 'Email already in use, try login in' })
      return
    }

    const { password, ...newUser } = await this._userRepository.insertAsync(
      user
    )
    const token = this._authService.generateToken(newUser)

    res.status(201).json({ token })
  }

  static authUserRequest = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  async authUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body as AuthUserRequest
    const user = await this._userRepository.getAsync({
      where: { email: body.email },
    })

    const valid = await this._authService.compareAsync(
      body.password,
      user?.password ?? ''
    )

    if (!user || !valid) {
      res.status(404).json('Wrong email or password')
      return
    }

    const { password, ...data } = user
    const token = this._authService.generateToken(data)

    res.status(200).json({ token })
  }
}
