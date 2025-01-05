import axios from 'axios'
import { Todo } from '../types/todo'
import { Projects } from '../types/projects'
import { Product } from '../types/products'

export const BASE_URL = 'http://localhost:8080'
export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>('todos')).data.map(
    (totdo) => totdo.id
  )
}

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}

export const createTodo = async (data: Todo) => {
  return axiosInstance.post('todos', data)
}

export const updateTodo = async (data: Todo) => {
  return axiosInstance.put(`todos/${data?.id}`, data)
}

export const deleteTodo = async (id: number) => {
  return axiosInstance.delete(`todos/${id}`)
}

export const getProjects = async (page = 1) => {
  return (
    await axiosInstance.get<Projects[]>(`projects?_page=${page}&_limit=3`)
  ).data
}

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data
}
