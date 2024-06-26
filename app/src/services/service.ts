import axios from 'axios'
import { API_PATH } from '@env'
import Toast from 'react-native-toast-message'

const instance = axios.create({
  baseURL: API_PATH
})

export default {
  async get(url: string, params = {}, options = {}): Promise<any> {
    try {
      const { data } = await instance.get(url, {
        params,
        ...options
      })

      return data
    } catch (err: any) {
      if (err.response) {
        const data: any = err.response.data

        Toast.show({ type: 'error', text1: 'Algo de errado aconteceu 😿', text2: data.error })
      }
    }
  },

  async post(url: string, data: object): Promise<any> {
    try {
      const response = await instance.post(url, data)

      return response.data
    } catch (err: any) {
      if (err.response) {
        const data: any = err.response.data

        Toast.show({ type: 'error', text1: 'Algo de errado aconteceu 😿', text2: data.error })
      }
    }
  },

  async put(url: string, data: object): Promise<any> {
    try {
      const response = await instance.put(url, data)

      return response.data
    } catch (err: any) {
      if (err.response) {
        const data: any = err.response.data

        Toast.show({ type: 'error', text1: 'Algo de errado aconteceu 😿', text2: data.error })
      }
    }
  },

  async delete(url: string): Promise<any> {
    try {
      const { data } = await instance.delete(url)

      if (data) {
        Toast.show({ type: 'success', text1: 'Sucesso 😸', text2: data })
      }

      return data
    } catch (err: any) {
      if (err.response) {
        const data: any = err.response.data

        Toast.show({ type: 'error', text1: 'Algo de errado aconteceu 😿', text2: data.error })
      }
    }
  }
}
