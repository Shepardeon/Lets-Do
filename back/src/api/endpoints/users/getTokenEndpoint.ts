import { NextFunction, Request, Response } from 'express'
import * as joi from 'joi'
import { AppDataSource } from '../../../data-source'
import { User } from '../../../entities/User'
import { useEncrypt } from '../../../utils/encrypt'

export const getTokenRequest = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const encrypt = useEncrypt()
    const { username, password } = req.body
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({ where: { username } })
    const isPasswordValid = await encrypt.compareStringAsync(
      password,
      user?.password ?? ''
    )

    if (!user || !isPasswordValid)
      return res.status(404).json({ message: 'Invalid username or password' })

    const token = encrypt.generateToken({ id: user.id })

    return res.status(200).json({
      token,
    })
  } catch (err) {
    next(new Error(`An error occured durring auth: ${err}`))
  }
}
