import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const publicRoutes = ['/']

export default function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (publicRoutes.includes(req.originalUrl)) {
    next()
    return
  }

  const header = req.headers.authorization
  if (!header) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = header.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET ?? '')
  if (!decode) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  res.locals.user = decode
  next()
}
