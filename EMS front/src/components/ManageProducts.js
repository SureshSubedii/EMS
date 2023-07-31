import React from 'react'

function ManageProducts({products}) {
  return (
    <div>{products[0]?.name}</div>
  )
}

export default ManageProducts