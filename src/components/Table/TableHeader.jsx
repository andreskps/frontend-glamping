import React from "react";

const TableHeader = ({ items }) => {
  return (
    <thead className="bg-gray-50 dark:bg-slate-800">
      <tr className="">
        {items.map((item, index) => (
          <th key={index} scope="col" className="px-6 py-3 text-start">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
              {item.label}
            </span>
          </th>
        ))}
        <th scope="col" class="px-6 py-3 text-end"></th>

      </tr>
      
    </thead>
  );
};

export default TableHeader;
