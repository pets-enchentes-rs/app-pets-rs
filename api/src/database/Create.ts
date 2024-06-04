import { UsuarioTransaction, PetTransaction } from '../transactions'

const createTables = () => {
  UsuarioTransaction.createTable()
  PetTransaction.createTable()
}

export default createTables
