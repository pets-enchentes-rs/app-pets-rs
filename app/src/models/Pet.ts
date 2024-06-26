import { ImageSourcePropType } from 'react-native'
import { PetType } from '../enums/PetType'

interface Pet {
  id?: number
  name?: string
  gender: string
  type: PetType
  image: any
  foundDate: Date | null
  foundLocal: string
  description?: string
  contact: string
  idUser: number
}

export default Pet
