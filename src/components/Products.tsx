import { Fragment } from 'react/jsx-runtime'
import { useProducts } from '../services/queries'
import { useState } from 'react'

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  )

  const productQuery = useProducts()

  return (
    <>
      {productQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <button
              onClick={() => {
                setSelectedProductId(product.id)
              }}
            >
              {product.name}
            </button>
          ))}
        </Fragment>
      ))}
    </>
  )
}
