import { openDb } from '../database'
import { Pet } from '../models'

const table = 'pets'

export default class PetTransaction {
  public static async createTable() {
    const db = await openDb()

    await db.exec(`CREATE TABLE IF NOT EXISTS ${table} (
      id INTEGER PRIMARY KEY,
      name TEXT,
      gender CHAR(1),
      type INTEGER NOT NULL,
      image TEXT NOT NULL,
      found_date DATE NOT NULL,
      found_local TEXT NOT NULL,
      description TEXT,
      contact TEXT NOT NULL,
      id_user INTEGER NOT NULL
    )`)

    db.close()
  }

  public static async getAll(): Promise<Pet[]> {
    const db = await openDb()

    const pets = await db.all(`SELECT * FROM ${table}`)

    db.close()

    return pets
  }

  public static async getById(id: number): Promise<Pet | undefined> {
    const db = await openDb()

    const pet = await db.get(`SELECT * FROM ${table} WHERE id = ?`, id)

    db.close()

    return pet
  }

  public static async getByType(id: number): Promise<Pet[]> {
    const db = await openDb()

    const pets = await db.all(`SELECT * FROM ${table} WHERE type = ?`, id)

    db.close()

    return pets
  }

  public static async getByUser(id: number): Promise<Pet[]> {
    const db = await openDb()

    const pets = await db.all(`SELECT * FROM ${table} WHERE id_user = ?`, id)

    db.close()

    return pets
  }

  public static async insert(pet: Pet): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(
      `INSERT INTO ${table} 
        (name, gender, type, image, found_date, found_local, description, contact, id_user)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pet.name,
        pet.gender,
        pet.type,
        pet.image,
        pet.foundDate,
        pet.foundLocal,
        pet.description,
        pet.contact,
        pet.idUser
      ]
    )

    db.close()

    return result.lastID
  }

  public static async update(id: number, pet: Pet): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(
      `UPDATE ${table} SET 
        name = ?,
        gender = ?,
        type = ?,
        image = ?,
        found_date = ?,
        found_local = ?,
        description = ?,
        contact = ?,
        id_user = ?
      WHERE id = ?`,
      [
        pet.name,
        pet.gender,
        pet.type,
        pet.image,
        pet.foundDate,
        pet.foundLocal,
        pet.description,
        pet.contact,
        pet.idUser,
        id
      ]
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
