import { Request, Response } from "express";
import { Usuario } from "../models";
import { UsuarioTransaction } from "../transactions";
import { HttpStatus } from "../utils/HttpStatus";

export default class UsuariosController {

  public static async create(req: Request, res: Response): Promise<void> {
    UsuarioTransaction.createTable();
  }

  public static async findAll(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const usuarios = await UsuarioTransaction.getAll();

    return res.json(usuarios);
  }

  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const usuarioId = await UsuarioTransaction.insert(req.body);

    if (!usuarioId) return res.status(HttpStatus.BAD_REQUEST);

    return res.status(HttpStatus.CREATED).json(`Adicionado usuário ${usuarioId}`)
  }

  /* public static async findAll(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const usuarios = await UsuariosController.rep.findAll();

    if (usuarios) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuarios);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    const usuario = await UsuariosController.rep.getById(parseInt(id));

    if (usuario) {
      await UsuariosController.log.add(req.method, req.originalUrl)

      return res.json(usuario);
    }

    return res.status(HttpStatus.NOT_FOUND).end();
  }

  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const usuario = await UsuariosController.rep.add(req.body);

    if (usuario) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuario);
  }

  public static async auth(req: Request, res: Response): Promise<Response<Usuario>> {
    const { email, senha } = req.body;

    const usuario = await UsuariosController.rep.getUserByLogin(email, senha);

    if (usuario) {
      await UsuariosController.log.add(req.method, req.originalUrl)

      return res.json({ message: 'Usuário logado com sucesso', usuario });
    }

    return res.status(HttpStatus.NOT_FOUND).end();
  }

  public static async update(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    const usuario = await UsuariosController.rep.update(parseInt(id), req.body);

    if (usuario) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuario)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    await UsuariosController.rep.delete(parseInt(id));

    await UsuariosController.log.add(req.method, req.originalUrl)

    return res.send("Usuário excluído com sucesso").end();
  } */
}