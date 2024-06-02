import { openDb } from "../database";
import { Usuario } from "../models";

const table = 'usuario'

export default class UsuarioTransaction {

  public static async createTable() {
    const db = await openDb()

    await db.exec(`CREATE TABLE IF NOT EXISTS ${table} (
      id INTEGER PRIMARY KEY,
      nome TEXT,
      email TEXT,
      telefone TEXT,
      senha TEXT
    )`)

    db.close()
  }

  public static async getAll(): Promise<Usuario[]> {
    const db = await openDb()

    const usuarios: Usuario[] = await db.all(`SELECT * FROM ${table}`)

    db.close()

    return usuarios
  }

  public static async insert(usuario: Usuario): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(
      `INSERT INTO ${table} (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`,
      [usuario.nome, usuario.email, usuario.telefone, usuario.senha]
    )

    db.close()

    return result.lastID
  }
}