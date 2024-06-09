import { NextFunction, Request, Response } from 'express'
import { Pet } from '../models'
import { HttpStatus } from '../enums/HttpStatus'
import { PetType } from '../enums/PetType'

export default async function PetsMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any

  if (value) {
    let { name, gender, type, image, foundDate, foundLocal, contact, idUser } = value as Pet

    if (!name || !gender || !Object.values(PetType).includes(type) || !image) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid Pet data' })
    }

    if (!foundDate || !foundLocal) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid Found data' })
    }

    if (!contact) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid contact' })
    if (!idUser) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid User data' })

    next()
  } else {
    return res.status(HttpStatus.NOT_FOUND).end()
  }
}
