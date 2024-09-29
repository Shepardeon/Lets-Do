import { Request, Response, NextFunction } from 'express'

export function handleErrorAsync(
  middleware: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> | void
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await middleware(req, res, next)
    } catch (err) {
      console.error(
        `API Error: ${(err as Error).message}\n${(err as Error).stack}`
      )
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode

      res.status(statusCode).json({
        message:
          process.env.NODE_ENV === 'dev'
            ? (err as Error).message
            : 'Internal Server Error',
        stack:
          process.env.NODE_ENV === 'dev' ? (err as Error).stack : undefined,
      })
    }
  }
}

export default function errorHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`API Error: ${err.message}\n${err.stack}`)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message:
      process.env.NODE_ENV === 'dev' ? err.message : 'Internal server error',
    stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined,
  })
}
