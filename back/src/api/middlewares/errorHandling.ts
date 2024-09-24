import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const errorHandling = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`API Error: ${error.message}`)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  return res.status(statusCode).json({
    message: error.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined,
  })
}
