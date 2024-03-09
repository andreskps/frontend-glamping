import { useState, useEffect } from "react";
import { getPropertiesByOwner } from "../../../services/propertyService";
import { CiSettings, CiLogout } from "react-icons/ci";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { usePropertiesStore } from "../../../store/propertiesStore";
import { useAuthStore } from "../../../store/authStore";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const queryClient = useQueryClient();

  const setProperty = usePropertiesStore((state) => state.setProperty);
  const getProperty = usePropertiesStore((state) => state.property);
const removeToken = useAuthStore((state) => state.removeToken);
const profile = useAuthStore((state) => state.profile);
  const {
    isLoading,
    data: properties,
    isSuccess,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: getPropertiesByOwner,
  });

  if (isLoading) return null;

  if (!isSuccess) return null;

  if (getProperty === null && properties.length > 0) {
    setProperty(properties[0].id);
  }

  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
        <nav
          className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
          aria-label="Global"
        >
          <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
            <div className="sm:hidden"></div>

            <div className="mx-5 sm:block">
              <select
                className="form-select form-select-sm w-full max-w-xs text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                aria-label="Selected tab"
                onChange={(e) => {
                  setProperty(e.target.value);
                  queryClient.invalidateQueries(["products", e.target.value]);
                }}
              >
                {properties?.map((property) => (
                  <option
                    key={property.id}
                    value={property.id}
                    selected={property.id === getProperty ? true : false}
                  >
                    {property?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row items-center justify-end gap-2">
             
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <CgProfile className="w-6 h-6 text-green-600 dark:text-gray-300" />

                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{
                    profile?.name
          
                  }</span>
                  
                </Dropdown.Header>
                <Dropdown.Item
                onClick={() => {
                  removeToken();
                }}
                >Cerrar Sesión</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
