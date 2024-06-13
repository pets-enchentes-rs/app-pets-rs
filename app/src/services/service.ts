import axios from 'axios'
import { API_PATH } from '@env'

const instance = axios.create({
  baseURL: API_PATH
})

export default {
  async get(url: string, params = {}, options = {}): Promise<any> {
    const { data } = await instance.get(url, {
      params,
      ...options
    })

    return data
  },

  async post(url: string, data: object): Promise<any> {
    return instance.post(url, data)
  },

  async put(url: string, data: object): Promise<any> {
    return instance.put(url, data)
  },

  async delete(url: string): Promise<any> {
    return instance.delete(url)
  }
}
