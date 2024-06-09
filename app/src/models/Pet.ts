import { PetType } from '../enums/PetType'

interface Pet {
  id: number
  name?: string
  gender?: string
  type: PetType
  image: string
  foundDate: Date
  foundLocation: string
  description?: string
  contact: string
  id_user: number
}

export default Pet
