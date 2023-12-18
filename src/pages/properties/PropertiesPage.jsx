import React from "react";

import PropertiesTable from "../../components/properties/PropertiesTable";
import { Link, Outlet } from "react-router-dom";

const PropertiesPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <PropertiesTable />
      </div>
    </>
  );
};

export default PropertiesPage;
