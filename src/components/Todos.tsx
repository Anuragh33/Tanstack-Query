import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutation'
import { useTodoIds, useTodos } from '../services/queries'
import { Todo } from '../types/todo'

export default function Todos() {
  const { register, handleSubmit } = useForm<Todo>()
  const todoQueryId = useTodoIds()
  const todoQueries = useTodos(todoQueryId.data)
  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const handelCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }

  const handleUpdateTodoCheckedSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true })
    }
  }

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id)
  }

  if (todoQueryId.isPending) return <div>Loading...!!</div>

  if (todoQueryId.isError) return <div>There is an error</div>

  return (
    <>
      <form onSubmit={handleSubmit(handelCreateTodoSubmit)}>
        <h3>Todo Details:</h3>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create Todo'}
        />
      </form>{' '}
      <ul>
        {todoQueries.map(({ data }) => (
          <li>
            <div>
              {' '}
              <span key={data?.id}> id: {data?.id}</span>
              <span> title: {data?.title}</span>
              <br />
              <span> desc: {data?.description}</span>
              <div>
                <button
                  onClick={() => handleUpdateTodoCheckedSubmit(data)}
                  disabled={data?.checked}
                >
                  {data?.checked ? 'Done' : 'Mark as done'}
                </button>

                {data && data?.id && (
                  <button onClick={() => handleDeleteTodo(data.id!)}>
                    Delete Todo
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
