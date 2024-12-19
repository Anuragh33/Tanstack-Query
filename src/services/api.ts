import axios from 'axios'
import { Todo } from '../types/todo'

export const BASE_URL = 'http://localhost:8080'
export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>('todos')).data.map(
    (totdo) => totdo.id
  )
}
