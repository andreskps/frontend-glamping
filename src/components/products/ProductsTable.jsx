import React from 'react'
import Table from '../Table/Table'

const ProductsTable = () => {
    const productsData = [
        { id: 1, name: 'Producto 1', price: 20, stock: 50 ,status:'Activo'},
        { id: 2, name: 'Producto 2', price: 30, stock: 30 ,status:'Inactivo'},
        // ... más datos ...
      ];
      
      const productColumns = [
        { label: 'ID', key: 'id' },
        { label: 'Nombre', key: 'name' },
        { label: 'Precio', key: 'price' },
        { label: 'Stock', key: 'stock' },
        { label: 'Estado', key: 'status' },
      ];
      

  return (
     <Table data={productsData} colums={productColumns} />
  )
}

export default ProductsTable