import { NextFunction, Request, Response } from 'express'
import { Pet } from '../models'
import { HttpStatus } from '../enums/HttpStatus'
import { PetType } from '../enums/PetType'

export default async function PetsMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any

  if (value) {
    let { name, gender, type, image, foundDate, foundLocal, contact, idUser } = value as Pet

    if (!name || !gender || !Object.values(PetType).includes(type) || !image) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Informações inválidas' })
    }

    if (!foundDate || !foundLocal) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Localização ou data inválidos' })
    }

    if (!contact) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Contato inválido' })
    if (!idUser) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Usuário inválido' })

    next()
  } else {
    return res.status(HttpStatus.NOT_FOUND).end()
  }
}
