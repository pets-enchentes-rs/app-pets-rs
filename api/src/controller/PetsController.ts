import { Request, Response } from 'express'
import { Pet } from '../models'
import { PetTransaction } from '../transactions'
import { HttpStatus } from '../enums/HttpStatus'

export default class PetsController {
  public static async create(req: Request, res: Response): Promise<void> {
    PetTransaction.createTable()
  }

  public static async findAll(req: Request, res: Response): Promise<Response<Pet[]>> {
    const pets = await PetTransaction.getAll()

    return res.json(pets)
  }

  public static async findById(req: Request, res: Response): Promise<Response<Pet>> {
    const { id } = req.params

    const pet = await PetTransaction.getById(parseInt(id))

    if (!pet) return res.status(HttpStatus.NOT_FOUND)

    return res.json(pet)
  }

  public static async add(req: Request, res: Response): Promise<Response<Pet>> {
    const petId = await PetTransaction.insert(req.body)

    if (!petId) return res.status(HttpStatus.BAD_REQUEST)

    return res.status(HttpStatus.CREATED).json(`[${petId}] Pet adicionado`)
  }

  public static async update(req: Request, res: Response): Promise<Response<Pet>> {
    const { id } = req.params

    const result = await PetTransaction.update(parseInt(id), req.body)

    if (!result) return res.status(HttpStatus.NOT_FOUND)

    return res.json(`[${id}] Pet atualizado`)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Pet>> {
    const { id } = req.params

    const result = await PetTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND)

    return res.json(`[${id}] Pet excluído com sucesso`)
  }
}
