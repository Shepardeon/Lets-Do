import { Request, Response } from 'express'
import * as joi from 'joi'

export const getTokenRequest = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})

export const getToken = async (req: Request, res: Response) => {
  const { username, password } = req.body

  return res.status(200).json({
    token: 'TODO',
  })
}
