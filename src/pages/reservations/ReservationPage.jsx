

import React from 'react'
import ProductsTable from '../../components/products/ProductsTable'
import { ReservationsTable } from '../../components/reservations/ReservationsTable'

export const ReservationPage = () => {
  return (
    <div className="flex flex-col">
    <ReservationsTable />
  </div>
  )
}
