import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export const Preline = () => {
  const location = useLocation();

  useEffect(() => {
    import("preline/preline");
  }, []);
  useEffect(() => {
    // @ts-ignore
    HSStaticMethods.autoInit();
  }, [location.pathname]);
  return <></>;
};
