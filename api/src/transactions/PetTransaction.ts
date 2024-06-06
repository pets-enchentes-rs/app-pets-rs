import { openDb } from '../database'
import { Pet } from '../models'

const table = 'pets'

export default class PetTransaction {
  public static async createTable() {
    const db = await openDb()

    await db.exec(`CREATE TABLE IF NOT EXISTS ${table} (
      id INTEGER PRIMARY KEY,
      nome TEXT,
      sexo CHAR(1),
      categoria INTEGER,
      foto TEXT,
      diaEncontrado DATE,
      localEncontrado TEXT,
      descricao TEXT,
      contato TEXT,
      id_usuario INTEGER
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

  public static async getByCategoria(id: number): Promise<Pet[]> {
    const db = await openDb()

    const pets = await db.all(`SELECT * FROM ${table} WHERE categoria = ?`, id)

    db.close()

    return pets
  }

  public static async insert(pet: any): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(
      `INSERT INTO ${table} 
        (nome, sexo, categoria, foto, diaEncontrado, localEncontrado, descricao, contato, id_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pet.nome,
        pet.sexo,
        pet.categoria,
        pet.foto,
        pet.diaEncontrado,
        pet.localEncontrado,
        pet.descricao,
        pet.contato,
        pet.id_usuario
      ]
    )

    db.close()

    return result.lastID
  }

  public static async update(id: number, pet: Pet): Promise<number | undefined> {
    const db = await openDb()

    const result = await db.run(
      `UPDATE ${table} SET nome = ?, categoria = ?, sexo = ?, foto = ?, diaEncontrado = ?, localEncontrado = ?, descricao = ?, contato = ?, id_usuario = ? WHERE id = ?`,
      [
        pet.nome,
        pet.sexo,
        pet.categoria,
        pet.foto,
        pet.diaEncontrado,
        pet.localEncontrado,
        pet.descricao,
        pet.contato,
        pet.id_usuario,
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
