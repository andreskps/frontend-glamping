

import React from 'react'



const Input = (props) => {
  return (
    <input
    className="py-2 placeholder:font-sans px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    {...props}
  />
  )
}

export default Input