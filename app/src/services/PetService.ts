import service from './service'
import { Pet } from '../models'

export default {
  async getAll(): Promise<Pet[]> {
    return service.get('/pets')
  },

  async getById(id: number): Promise<Pet | undefined> {
    return service.get(`/pets/${id}`)
  },

  async create(pet: Pet): Promise<Pet | undefined> {
    return service.post('/pets', pet)
  },

  async update(id: number, pet: Pet): Promise<Pet | undefined> {
    return service.put(`/pets/${id}`, pet)
  },

  async delete(id: number): Promise<any> {
    return service.delete(`/pets/${id}`)
  }
}
