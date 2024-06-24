import { openDb } from '../database'
import { User } from '../models'

const table = 'users'

export default class UserTransaction {
  public static async createTable() {
    const db = await openDb()

    await db.exec(`CREATE TABLE IF NOT EXISTS ${table} (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      image TEXT,
      phone TEXT NOT NULL,
      password TEXT NOT NULL
    )`)

    db.close()
  }

  public static async getAll(): Promise<User[]> {
    const db = await openDb()

    const users = await db.all(`SELECT * FROM ${table}`)

    db.close()

    return users
  }

  public static async getById(id: number): Promise<User | undefined> {
    const db = await openDb()

    const user = await db.get(`SELECT * FROM ${table} WHERE id = ?`, id)

    db.close()

    return user
  }

  public static async getByLogin(email: string, password: string): Promise<User | undefined> {
    const db = await openDb()

    const user = await db.get(`SELECT * FROM ${table} WHERE email = ? AND password = ?`, [email, password])

    db.close()

    return user
  }

  public static async insert(user: User): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(`INSERT INTO ${table} (name, email, image, phone, password) VALUES (?, ?, ?, ?, ?)`, [user.name, user.email, user.image, user.phone, user.password])

    db.close()

    return result.lastID
  }

  public static async update(id: number, user: User): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(`UPDATE ${table} SET name = ?, email = ?, image = ?, phone = ? WHERE id = ?`, [user.name, user.email, user.image, user.phone, id])

    db.close()

    return result.changes
  }

  public static async changePassword(id: number, newPassword: string): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(`UPDATE ${table} SET password = ? WHERE id = ?`, [newPassword, id])

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
