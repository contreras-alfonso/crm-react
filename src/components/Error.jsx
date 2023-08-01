import React from 'react'

const Error = ({error}) => {
  return (
    <div>
        <p className='rounded text-red-500 border border-red-500 text-center py-2 mb-4'>{error}</p>
    </div>
  )
}

export default Error