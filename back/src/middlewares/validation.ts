import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodSchema } from 'zod'

export default function validationMiddleware(schema: ZodSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const parsedSchema = await schema.parseAsync(req.body)
      req.body = parsedSchema
      next()
    } catch (err) {
      res.status(400).json({
        message: 'Validation error',
        errors: (err as ZodError).issues,
      })
    }
  }
}
