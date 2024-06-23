import service from './service'
import { User } from '../models'
import Toast from 'react-native-toast-message'

export default {
  async getAll(): Promise<User[]> {
    return service.get('/users')
  },

  async getById(id: number): Promise<User | undefined> {
    return service.get(`/users/${id}`)
  },

  async create(user: User): Promise<any> {
    return service.post('/users', user)
  },

  async login(email: string, password: string): Promise<User | undefined> {
    const loginData = {
      email,
      password
    }

    return service.post('/users/login', loginData)
  },

  async update(id: number, user: User): Promise<User | undefined> {
    return service.put(`/users/${id}`, user)
  },

  async changePassword(id: number, payload: Object): Promise<User | undefined> {
    const data = await service.put(`/users/password/${id}`, payload)

    if (data) {
      Toast.show({ type: 'success', text1: 'Sucesso 👍', text2: 'Sua senha foi alterada' })
    }

    return data
  },

  async delete(id: number): Promise<any> {
    return service.delete(`/users/${id}`)
  }
}
