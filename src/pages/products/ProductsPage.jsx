import React from "react";
import ProductsTable from "../../components/products/ProductsTable";
import SimpleTable from "../../components/Table/SimpleTable";

const ProductsPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <ProductsTable />
      </div>
    </>
  );
};

export default ProductsPage;
