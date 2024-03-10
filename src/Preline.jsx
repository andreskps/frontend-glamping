import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Preline = () => {
  const location = useLocation();

  useEffect(() => {
    import("preline/preline").then((module) => {
      module.HSAccordion.autoInit();
      module.HSCollapse.autoInit();


    });
  }, [location.pathname]);

  return <></>;
};