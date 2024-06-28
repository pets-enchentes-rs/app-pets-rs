import { PetType } from '../enums/PetType'

interface Pet {
  id: number
  name?: string
  gender?: string
  type: PetType
  image: string
  foundDate: Date
  foundLocal: string
  currentLocal: string
  description?: string
  //status
  contact: string
  idUser: number
}

export default Pet
