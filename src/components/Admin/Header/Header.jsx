import { useState, useEffect } from "react";
import { getPropertiesByOwner } from "../../../services/propertyService";
import { CiSettings, CiLogout } from "react-icons/ci";
import { useQueryClient, useQuery} from "@tanstack/react-query";
import { usePropertiesStore } from "../../../store/propertiesStore";
const Header = () => {

  const queryClient = useQueryClient();

  const setProperty = usePropertiesStore((state) => state.setProperty);
  const getProperty = usePropertiesStore((state) => state.property);

  const { isLoading,data: properties,isSuccess } = useQuery({
    queryKey: ["properties"],
    queryFn: getPropertiesByOwner,
  });

  if(isLoading) return null;

  if(!isSuccess) return null;


  if(getProperty === null && properties.length > 0){
    setProperty(properties[0].id);
  }




  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
        <nav
          className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
          aria-label="Global"
        >
          {/* <div className="me-5 lg:me-0 lg:hidden">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Brand
            </a>
          </div> */}

          <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
            <div className="sm:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                data-hs-overlay="#docs-sidebar"
                aria-controls="docs-sidebar"
                aria-label="Toggle navigation"
              >
                <span className="sr-only">Toggle Navigation</span>
                {/* <AiOutlineBars className="w-6 h-6" /> */}
              </button>
            </div>

            <div className="hidden sm:block">
              <select
                className="form-select form-select-sm w-full max-w-xs text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                aria-label="Selected tab"
                data-hs-select2-options='{
          "minimumResultsForSearch": "Infinity",
          "dropdownAutoWidth": true
        }'
        onChange={(e) => {
          setProperty(e.target.value);
          queryClient.invalidateQueries(["products",e.target.value])
        }}
              >
                {properties?.map((property) => (
                  <option key={property.id} value={property.id}
                  selected={property.id === getProperty ? true : false}
                  >
                    {property?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row items-center justify-end gap-2">
  

              <div className="avatar avatar-ring avatar-md">
                <div className="dropdown-container">
                  <div className="dropdown">
                    <label
                      className="btn btn-ghost flex cursor-pointer px-0"
                      tabIndex="0"
                    >
                      <img
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        alt="avatar"
                      />
                    </label>
                    <div className="dropdown-menu dropdown-menu-bottom-left">
                      <a className="dropdown-item text-sm">Profile</a>
                      <a tabIndex="-1" className="dropdown-item text-sm">
                        Account settings
                      </a>
                      <a tabIndex="-1" className="dropdown-item text-sm">
                        Subscriptions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
