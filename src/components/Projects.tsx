import { useState } from 'react'
import { useProjects } from '../services/queries'

export default function Projects() {
  const [page, setPage] = useState(1)

  const { data, isPending, isError, error, isFetched, isPlaceholderData } =
    useProjects(page)

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>There is an error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <div key={project.id}> Project {project.id}</div>
          ))}
        </div>
      )}

      <span> Current page: {page}</span>
      <div>
        <button
          onClick={() => {
            setPage((old) => Math.max(old - 1, 1))
          }}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1)
            }
          }}
          disabled={isPlaceholderData}
        >
          Next Page
        </button>
      </div>
    </div>
  )
}
