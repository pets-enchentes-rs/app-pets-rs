import { Request, Response } from 'express'
import { Usuario } from '../models'
import { UsuarioTransaction } from '../transactions'
import { HttpStatus } from '../enums/HttpStatus'

export default class UsuariosController {
  // GET: /usuarios
  public static async findAll(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const usuarios = await UsuarioTransaction.getAll()

    if (!usuarios) return res.status(HttpStatus.NO_CONTENT).end()

    return res.json(usuarios)
  }

  // GET: /usuarios/1
  public static async findById(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params

    const usuario = await UsuarioTransaction.getById(parseInt(id))

    if (!usuario) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(usuario)
  }

  // POST: /usuarios
  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const usuarioId = await UsuarioTransaction.insert(req.body)

    if (!usuarioId) return res.status(HttpStatus.BAD_REQUEST).end()

    return res.status(HttpStatus.CREATED).json(`[${usuarioId}] Adicionado usuário`)
  }

  // PUT: /usuarios/1
  public static async update(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params

    const result = await UsuarioTransaction.update(parseInt(id), req.body)

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(`[${id}] Usuário atualizado`)
  }

  // DELETE: /usuarios/1
  public static async delete(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params

    const result = await UsuarioTransaction.delete(parseInt(id))

    if (!result) return res.status(HttpStatus.NOT_FOUND).end()

    return res.json(`[${id}] Usuário excluído com sucesso`)
  }
}
