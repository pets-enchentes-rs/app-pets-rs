import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { HttpStatus } from '../enums/HttpStatus'

export default async function UsersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const value = req.body as any

  if (value) {
    let { name, email, phone, password } = value as User

    if (!name)
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid name' })
    if (!email)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid e-mail' })
    if (!phone)
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid phone' })
    if (!password)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid password' })

    next()
  } else {
    return res.status(HttpStatus.NOT_FOUND).end()
  }
}
