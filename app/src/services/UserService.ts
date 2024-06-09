import service from './service'
import { User } from '../models'

export default {
  async getAll(): Promise<User[]> {
    return service.get('/users')
  },

  async getById(id: number): Promise<User> {
    return service.get(`/users/${id}`)
  },

  async create(user: User): Promise<User> {
    return service.post('/users', user)
  },

  async update(id: number, user: User): Promise<User> {
    return service.put(`/users/${id}`, user)
  },

  async delete(id: number): Promise<any> {
    return service.delete(`/users/${id}`)
  }
}
