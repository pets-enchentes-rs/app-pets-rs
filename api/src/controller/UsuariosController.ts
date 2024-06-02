import { Request, Response } from "express"
import { Usuario } from "../models"
import { UsuarioTransaction } from "../transactions"
import { HttpStatus } from "../utils/HttpStatus"

export default class UsuariosController {

  public static async create(req: Request, res: Response): Promise<void> {
    UsuarioTransaction.createTable()
  }

  public static async findAll(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const usuarios = await UsuarioTransaction.getAll()

    return res.json(usuarios)
  }

  public static async findById(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params

    const usuario = await UsuarioTransaction.getById(parseInt(id))

    if (!usuario) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(usuario)
  }

  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const usuarioId = await UsuarioTransaction.insert(req.body)

    if (!usuarioId) return res.status(HttpStatus.BAD_REQUEST).end()

    return res.status(HttpStatus.CREATED).json(`Adicionado usuário ${usuarioId}`)
  }

  public static async update(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params

    const result = await UsuarioTransaction.update(parseInt(id), req.body)

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(result)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params

    const result = await UsuarioTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.send("Usuário excluído com sucesso").end()
  }
}