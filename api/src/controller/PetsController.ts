import { Request, Response } from 'express'
import { HttpStatus } from '../enums/HttpStatus'
import { Pet } from '../models'
import { PetTransaction } from '../transactions'

export default class PetsController {
  // GET: /pets
  public static async findAll(req: Request, res: Response): Promise<Response<Pet[]>> {
    const pets = await PetTransaction.getAll()

    if (!pets) return res.status(HttpStatus.NO_CONTENT).end()

    return res.status(HttpStatus.OK).json(pets)
  }

  // GET: /pets/1
  public static async findById(req: Request, res: Response): Promise<Response<Pet>> {
    const { id } = req.params

    const pet = await PetTransaction.getById(parseInt(id))

    if (!pet) return res.status(HttpStatus.NOT_FOUND).end()

    return res.status(HttpStatus.OK).json(pet)
  }

  // POST: /pets
  public static async add(req: Request, res: Response): Promise<Response<Pet>> {
    const pet: Pet = req.body

    const id = await PetTransaction.insert(req.body)

    if (id) {
      pet.id = id

      return res.status(HttpStatus.CREATED).json(pet)
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end()
  }

  // PUT: /pets/1
  public static async update(req: Request, res: Response): Promise<Response<Pet>> {
    const { id } = req.params
    const pet: Pet = req.body

    const result = await PetTransaction.update(parseInt(id), req.body)

    if (result) {
      pet.id = parseInt(id)
      return res.status(HttpStatus.OK).json(pet)
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end()
  }

  // DELETE: /pets/1
  public static async delete(req: Request, res: Response): Promise<Response<Pet>> {
    const { id } = req.params

    const result = await PetTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.status(HttpStatus.OK).json('Pet deletado com sucesso')
  }
}
