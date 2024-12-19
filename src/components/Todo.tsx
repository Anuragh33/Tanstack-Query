import { useTodoIds } from '../services/queries'

export default function Todo() {
  const { data, isPending, isError } = useTodoIds()

  if (isPending) return <div>Loading...!!</div>

  if (isError) return <div>There is an error</div>

  return (
    <div>
      {data.map((id) => (
        <span key={id}>{id}</span>
      ))}
    </div>
  )
}
