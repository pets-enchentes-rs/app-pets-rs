import { openDb } from '../database'
import { Usuario } from '../models'

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

    const usuarios = await db.all(`SELECT * FROM ${table}`)

    db.close()

    return usuarios
  }

  public static async getById(id: number): Promise<Usuario | undefined> {
    const db = await openDb()

    const usuario = await db.get(`SELECT * FROM ${table} WHERE id = ?`, id)

    db.close()

    return usuario
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

  public static async update(id: number, usuario: Usuario): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(
      `UPDATE ${table} SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id = ?`,
      [usuario.nome, usuario.email, usuario.telefone, usuario.senha, id]
    )

    db.close()

    return result.changes
  }

  public static async delete(id: number): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(`DELETE FROM ${table} WHERE id = ?`, id)

    db.close()

    return result.changes
  }
}
