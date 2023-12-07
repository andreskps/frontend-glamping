import React, { useState } from "react";

import SimpleLink from "./SimpleLink";
import AccordionLink from "./AccordotionLink";


const Sidebar = () => {

  const links = [
    {
      name: "Inicio",
      icon: "home-icon",
      subLinks: [],
    },
    {
      name: "Reservas",
      icon: "book-icon",
      subLinks: [],
    },
    {
      name: "Mis propiedades",
      icon: "property-icon",
      subLinks: ["Calendarios", "Políticas"],
    },
    {
      name: "Catálogo",
      icon: "catalog-icon",
      subLinks: ["Productos", "Servicios"],
    },
    {
      name:"Marketing",
      icon:"marketing-icon",
      subLinks:["Promociones","Cupones"]

    },
    {
      name: "Clientes",
      icon: "client-icon",
      subLinks: [],
    },
    {
      name: "Reportes",
      icon: "report-icon",
      subLinks: [],
    },
  
  ];


  return (
    <>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600"
        data-hs-overlay="#docs-sidebar"
        aria-controls="docs-sidebar"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg
          className="flex-shrink-0 w-4 h-4"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-6">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Brand
          </a>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {links.map((link, index) =>
              link.subLinks.length > 0 ? (
                <li
                  className="hs-accordion"
                  key={index}
                  id="projects-accordion"
                >
                  
                  <AccordionLink name={link.name} icon={link.icon} subLinks={link.subLinks} />
                </li>
              ) : (
                <li key={index}>
                  <SimpleLink name={link.name} icon={link.icon} />
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
