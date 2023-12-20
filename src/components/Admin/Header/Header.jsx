import { useState, useEffect } from "react";
import { getPropertiesByOwner } from "../../../services/propertyService";
import { CiSettings, CiLogout } from "react-icons/ci";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { usePropertiesStore } from "../../../store/propertiesStore";
const Header = () => {

  const propertiesStore = usePropertiesStore((state) => state.properties);
  const setProperty = usePropertiesStore((state) => state.setProperty);
  const getProperty = usePropertiesStore((state) => state.property);

  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
        <nav
          className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
          aria-label="Global"
        >
          <div className="me-5 lg:me-0 lg:hidden">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Brand
            </a>
          </div>

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
        onChange={(e) => setProperty(e.target.value)}
              >
                {propertiesStore.map((property) => (
                  <option key={property.id} value={property.id}
                  selected={property.id === getProperty ? true : false}
                  >
                    {property?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row items-center justify-end gap-2">
              {/* <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <img
                    className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      james@site.com
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                    <CiSettings className="flex-shrink-0 w-5 h-5" />
                      Ajustes
                    </a>
                 
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                
                      <CiLogout className="flex-shrink-0 w-5 h-5" />
                      Cerrar sesión
                    </a>
            
                  </div>
                </div>
              </div> */}

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
