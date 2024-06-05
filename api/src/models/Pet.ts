import { PetCategoria } from '../enums/PetCategoria'

interface Pet {
  id: number
  nome?: string
  sexo?: string
  categoria: PetCategoria
  foto: string
  diaEncontrado: Date
  localEncontrado: string
  descricao?: string
  contato: string
  id_usuario: number
}

export default Pet