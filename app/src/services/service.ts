import axios from 'axios'

const port = process.env.API_PORT ?? 8080

const instance = axios.create({
  baseURL: `http://localhost:${port}`
})

export default {
  async get<T>(url: string, params = {}, options = {}): Promise<any> {
    const { data } = await instance.get(url, {
      params,
      ...options
    })

    return data
  },

  async post<T>(url: string, data: object): Promise<any> {
    return instance.post(url, data)
  },

  async put<T>(url: string, data: object): Promise<any> {
    return instance.put(url, data)
  },

  async delete<T>(url: string): Promise<any> {
    return instance.delete(url)
  }
}
