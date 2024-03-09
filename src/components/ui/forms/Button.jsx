

import React from 'react'

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`py-2 px-4 rounded-md border ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button