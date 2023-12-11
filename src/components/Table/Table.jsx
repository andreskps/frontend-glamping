import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({data,colums}) => {


  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader items={colums} />
        <TableBody data={data} colums={colums} />
    </table>    
  )
}

export default Table