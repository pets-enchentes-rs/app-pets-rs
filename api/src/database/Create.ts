import { UserTransaction, PetTransaction } from '../transactions'

const createTables = () => {
  UserTransaction.createTable()
  PetTransaction.createTable()
}

export default createTables
