import { useState } from "react";

import { Modal } from "flowbite-react";
import { ItemProperty } from "./ItemProperty";

const CardTable = ({ data, handleEdit, handleDelete }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <ItemProperty
          key={item.id}
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CardTable;
