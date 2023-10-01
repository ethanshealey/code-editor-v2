import React from 'react'

interface ISpinner {
    size: string
}

const Spinner = ({ size }: ISpinner) => {
  return (
    <div className="spinner" style={{ width: size, height: size }} />
  )
}

export default Spinner