import { Request, Response } from 'express'
import { User } from '../models'
import { UserTransaction } from '../transactions'
import { HttpStatus } from '../enums/HttpStatus'

export default class UsersController {
  // GET: /users
  public static async findAll(req: Request, res: Response): Promise<Response<User[]>> {
    const users = await UserTransaction.getAll()

    if (!users) return res.status(HttpStatus.NO_CONTENT).end()

    return res.status(HttpStatus.OK).json(users)
  }

  // GET: /users/1
  public static async findById(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params

    const user = await UserTransaction.getById(parseInt(id))

    if (!user) return res.status(HttpStatus.NOT_FOUND).end()

    return res.status(HttpStatus.OK).json(user)
  }

  // POST: /users
  public static async add(req: Request, res: Response): Promise<Response<User>> {
    const user: User = req.body

    const id = await UserTransaction.insert(user)

    if (id) {
      user.id = id

      return res.status(HttpStatus.CREATED).json(user)
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end()
  }

  // POST: /users/login
  public static async login(req: Request, res: Response): Promise<Response<User>> {
    const { email, password } = req.body

    const user = await UserTransaction.getByLogin(email, password)

    if (!user) return res.status(HttpStatus.NOT_FOUND).end()

    return res.status(HttpStatus.OK).json(user)
  }

  // PUT: /users/1
  public static async update(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params
    const user: User = req.body

    const result = await UserTransaction.update(parseInt(id), user)

    if (result) {
      user.id = parseInt(id)
      return res.status(HttpStatus.OK).json(user)
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end()
  }

  // PUT: /users/password/1
  public static async changePassword(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params
    const { newPass } = req.body

    const user = await UserTransaction.getById(parseInt(id))
    const data = await UserTransaction.changePassword(parseInt(id), newPass)

    if (user && data) {
      user.password = newPass
      return res.status(HttpStatus.OK).json(user)
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end()
  }

  // DELETE: /users/1
  public static async delete(req: Request, res: Response): Promise<Response<User>> {
    const { id } = req.params

    const result = await UserTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.status(HttpStatus.OK).json('Usuário deletado com sucesso')
  }
}
