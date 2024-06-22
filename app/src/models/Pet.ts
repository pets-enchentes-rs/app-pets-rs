import { ImageSourcePropType } from 'react-native'
import { PetType } from '../enums/PetType'

interface Pet {
  id: number
  name?: string
  gender?: string
  type: PetType
  image: ImageSourcePropType
  foundDate: Date
  foundLocal: string
  description?: string
  contact: string
  id_user: number
}

export default Pet
