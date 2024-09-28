import { Request, Response, NextFunction } from 'express'

export default function handleErrorAsync(
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
