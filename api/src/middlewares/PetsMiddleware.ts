import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../enums/HttpStatus'
import { PetType } from '../enums/PetType'
import { Pet } from '../models'

export default async function PetsMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any

  if (value) {
    let { name, gender, type, image, foundDate, foundLocal, currentLocal, contact, idUser } = value as Pet

    if (!name || !gender || !Object.values(PetType).includes(type) || !image) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Informações inválidas' })
    }

    if (!foundDate || !foundLocal || !currentLocal) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Localização ou data inválidos' })
    }

    if (new Date(foundDate) > new Date()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Data Encontrada não pode ser maior que o dia atual' })
    }

    if (!contact) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Contato inválido' })
    if (!idUser) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Usuário inválido' })

    next()
  } else {
    return res.status(HttpStatus.NOT_FOUND).end()
  }
}
