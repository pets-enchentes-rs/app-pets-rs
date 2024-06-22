import { Request, Response } from 'express'
import { Pet } from '../models'
import { PetTransaction } from '../transactions'
import { HttpStatus } from '../enums/HttpStatus'

export default class PetsController {
  // GET: /pets
  public static async findAll(
    req: Request,
    res: Response
  ): Promise<Response<Pet[]>> {
    const pets = await PetTransaction.getAll()

    if (!pets) return res.status(HttpStatus.NO_CONTENT).end()

    return res.json(pets)
  }

  // GET: /pets/1
  public static async findById(
    req: Request,
    res: Response
  ): Promise<Response<Pet>> {
    const { id } = req.params

    const pet = await PetTransaction.getById(parseInt(id))

    if (!pet) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(pet)
  }

  // GET: /pets/type/1
  public static async findByType(
    req: Request,
    res: Response
  ): Promise<Response<Pet[]>> {
    const { id } = req.params

    const pets = await PetTransaction.getByType(parseInt(id))

    if (!pets) return res.status(HttpStatus.NO_CONTENT).end()

    return res.json(pets)
  }

  // GET: /pets/user/1
  public static async findByUser(
    req: Request,
    res: Response
  ): Promise<Response<Pet[]>> {
    const { id } = req.params

    const pets = await PetTransaction.getByUser(parseInt(id))

    if (!pets) return res.status(HttpStatus.NO_CONTENT).end()

    return res.json(pets)
  }

  // POST: /pets
  public static async add(req: Request, res: Response): Promise<Response<Pet>> {
    const petId = await PetTransaction.insert(req.body)

    if (!petId) return res.status(HttpStatus.BAD_REQUEST).end()

    return res.status(HttpStatus.CREATED).json(`[${petId}] Pet added`)
  }

  // PUT: /pets/1
  public static async update(
    req: Request,
    res: Response
  ): Promise<Response<Pet>> {
    const { id } = req.params

    const result = await PetTransaction.update(parseInt(id), req.body)

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(`[${id}] Pet updated`)
  }

  // DELETE: /pets/1
  public static async delete(
    req: Request,
    res: Response
  ): Promise<Response<Pet>> {
    const { id } = req.params

    const result = await PetTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(`[${id}] Pet deleted`)
  }
}
