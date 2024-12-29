import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo, deleteTodo, updateTodo } from './api'
import { Todo } from '../types/todo'
import { useEffect } from 'react'

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onError: () => {
      console.log('Error while creating a todo!')
    },
    onMutate: () => {
      console.log('Mutation started.')
    },
    onSuccess: () => {
      console.log('Todo created sucessfully.')
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['todos'],
        })
        await queryClient.invalidateQueries({
          queryKey: ['todo', { id: variables.id }],
        })
      }
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      console.log('Todo is deleted sucessfully.')
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['todos'],
        })
      }
    },
  })
}
