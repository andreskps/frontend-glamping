import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

import SimpleLink from "./SimpleLink";
import AccordionLink from "./AccordotionLink";
import { FaPeopleRoof } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { BsHouseHeart } from "react-icons/bs";
import { GrCatalog } from "react-icons/gr";
import { HiSpeakerphone } from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";

const Sidebar = () => {

  const links = [
    {
      name: "Inicio",
      icon: <RxDashboard />,
      subLinks: [],
    },
    {
      name: "Reservas",
      icon: <FaPeopleRoof />,
      subLinks: [],
    },
    {
      name: "Propiedades",
      icon: <BsHouseHeart />,
      subLinks: [{
        name:"Ver Propiedades",
        link:"/admin/propiedades",
      },{
        name:"Calendario",
        link:"/admin/calendario",
      },{
        name:"Politicas",
        link:"/admin/politicas",
      },{
        name:"Tarifas",
        link:"/admin/tarifas",
      },
    ],
    },
    {
      name: "Catálogo",
      icon: <GrCatalog />,
      subLinks: [{
        name:"Productos",
        link:"/admin/productos",
      },{
        name:"Servicios",
        link:"/admin/servicios",
      }
    ],
    },
    {
      name:"Marketing",
      icon:<HiSpeakerphone/>,
      subLinks:[{
        name:"Promociones",
        link:"/admin/promociones",
      },{
        name:"Cupones",
        link:"/admin/cupones",
      },
    ],
    },
    {
      name: "Clientes",
      icon: <IoPeopleOutline />,
      subLinks: [],
    },
    {
      name: "Reportes",
      icon: <HiOutlineDocumentReport />,
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
        <AiOutlineBars className="w-6 h-6" />
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
