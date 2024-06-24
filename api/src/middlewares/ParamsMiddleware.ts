import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../enums/HttpStatus'

export default async function ParamsMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  if (!id) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Valor inválido' })

  next()
}
