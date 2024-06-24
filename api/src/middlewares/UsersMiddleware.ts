import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { HttpStatus } from '../enums/HttpStatus'

export default async function UsersMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any

  if (value) {
    let { name, email, phone } = value as User

    if (!name) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Nome inválido' })
    if (!email) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'E-mail inválido' })
    if (!phone) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Telefone inválido' })

    next()
  } else {
    return res.status(HttpStatus.NOT_FOUND).end()
  }
}
