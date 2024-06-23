import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../enums/HttpStatus'
import { UserTransaction } from '../transactions'

export default async function PasswordMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  const { password, newPass, confirmPass } = req.body

  const user = await UserTransaction.getById(parseInt(id))

  if (!user) return res.status(HttpStatus.NOT_FOUND).end()
  if (user.password != password) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Senha atual inválida' })
  if (!newPass || !confirmPass) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Preencha os campos corretamente' })
  if (password == newPass) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Nova senha não pode ser igual à atual' })
  if (newPass != confirmPass) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Campos não conferem' })

  next()
}
