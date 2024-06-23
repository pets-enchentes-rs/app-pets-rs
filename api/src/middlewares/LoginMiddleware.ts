import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { HttpStatus } from '../enums/HttpStatus'

export default async function LoginMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any

  if (value) {
    let { email, password } = value as User

    if (!email || !password) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Preencha os campos corretamente' })

    next()
  } else {
    return res.status(HttpStatus.NOT_FOUND).end()
  }
}
