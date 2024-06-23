import service from './service'
import { User } from '../models'
import { AxiosResponse } from 'axios'

export default {
  async getAll(): Promise<User[]> {
    return service.get('/users')
  },

  async getById(id: number): Promise<AxiosResponse<User>> {
    return service.get(`/users/${id}`)
  },

  async create(user: User): Promise<any> {
    return service.post('/users', user)
  },

  async login(email: string, password: string): Promise<AxiosResponse<User>> {
    const login = {
      email,
      password
    }

    return service.post('/users/login', login)
  },

  async update(id: number, user: User): Promise<AxiosResponse<User>> {
    return service.put(`/users/${id}`, user)
  },

  async changePassword(id: number, payload: Object): Promise<AxiosResponse<User>> {
    return service.put(`/users/password/${id}`, payload)
  },

  async delete(id: number): Promise<any> {
    return service.delete(`/users/${id}`)
  }
}
