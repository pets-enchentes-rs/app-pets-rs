import { Request, Response } from 'express'
import { User } from '../models'
import { UserTransaction } from '../transactions'
import { HttpStatus } from '../enums/HttpStatus'

export default class UsersController {
  // GET: /users
  public static async findAll(req: Request, res: Response): Promise<Response<User[]>> {
    const users = await UserTransaction.getAll()

    if (!users) return res.status(HttpStatus.NO_CONTENT).end()

    return res.json(users)
  }

  // GET: /users/1
  public static async findById(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params

    const user = await UserTransaction.getById(parseInt(id))

    if (!user) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(user)
  }

  // POST: /users
  public static async add(req: Request, res: Response): Promise<Response<User>> {
    const userId = await UserTransaction.insert(req.body)

    if (!userId) return res.status(HttpStatus.BAD_REQUEST).end()

    return res.status(HttpStatus.CREATED).json(`[${userId}] User added`)
  }

  // POST: /users/login
  public static async login(req: Request, res: Response): Promise<Response<User>> {
    const { email, password } = req.body

    const user = await UserTransaction.getByLogin(email, password)

    if (!user) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(user)
  }

  // PUT: /users/1
  public static async update(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params

    const result = await UserTransaction.update(parseInt(id), req.body)

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(`[${id}] User updated`)
  }

  // DELETE: /users/1
  public static async delete(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params

    const result = await UserTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(`[${id}] User deleted`)
  }
}
