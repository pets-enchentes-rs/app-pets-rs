import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_PATH
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
