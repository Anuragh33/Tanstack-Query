import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from '@tanstack/react-query'
import { getProducts, getProjects, getTodo, getTodosIds } from './api'

export function useTodoIds() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodosIds,
  })
}

export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ['todo', { id }],
        queryFn: () => getTodo(id!),
      }
    }),
  })
}

export function useProjects(page: number) {
  return useQuery({
    queryKey: ['projects', { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  })
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, lastPageParam, allPages) => {
      if (lastPage.length === 0) {
        return undefined
      }

      return lastPageParam + 1
    },
  })
}
