import { NextFunction, Request, Response } from 'express'
import * as joi from 'joi'

export const requestValidation = (schema: joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body)

    if (result.error) {
      return res.status(400).json({
        message: 'There are some validation errors',
        errors: result.error.details.map((x) => x.message),
      })
    }

    req.body = result.value
    next()
  }
}
