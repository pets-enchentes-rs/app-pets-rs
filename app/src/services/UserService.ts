import service from './service'
import { User } from '../models'

export default {
  async getAll(): Promise<User[]> {
    return service.get('/users')
  },

  async getById(id: number): Promise<User> {
    return service.get(`/users/${id}`)
  },

  async create(user: User): Promise<any> {
    return service.post('/users', user)
  },

  async login(email: string, password: string): Promise<User> {
    const login = {
      email,
      password
    }

    return service.post('/users/login', login)
  },

  async update(id: number, user: User): Promise<any> {
    return service.put(`/users/${id}`, user)
  },

  async delete(id: number): Promise<any> {
    return service.delete(`/users/${id}`)
  }
}
