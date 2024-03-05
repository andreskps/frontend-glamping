import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

import SimpleLink from "./SimpleLink";
import AccordionLink from "./AccordotionLink";
import { FaPeopleRoof } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { BsHouseHeart } from "react-icons/bs";
import { GrCatalog } from "react-icons/gr";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiSpeakerphone,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Sidebar } from "flowbite-react";

const SidebarApp = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

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
      subLinks: [
        {
          name: "Ver Propiedades",
          link: "/admin/propiedades",
        },
        {
          name: "Politicas",
          link: "/admin/politicas",
        },
      ],
    },
    {
      name: "Catálogo",
      icon: <GrCatalog />,
      subLinks: [
        {
          name: "Productos",
          link: "/admin/productos",
        },
        {
          name: "Servicios",
          link: "/admin/servicios",
        },
      ],
    },
    {
      name: "Marketing",
      icon: <HiSpeakerphone />,
      subLinks: [
        {
          name: "Promociones",
          link: "/admin/promociones",
        },
        {
          name: "Cupones",
          link: "/admin/cupones",
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
      <div className="fixed top-0 start-0 cursor-pointer z-10 w-14 h-14 bg-white border-e border-gray-200 flex items-center justify-center lg:hidden">
        <button
          className="text-gray-500"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <AiOutlineBars />
        </button>
      </div>

      <div
        className={`
       ${openSidebar ? "translate-x-0" : "-translate-x-full"}
       transition-transform duration-200 ease-in-out
       fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700 lg:block
     `}
      >
        <button
          className="absolute top-0 start-0 w-16 h-16 bg-white border-e border-gray-200 flex items-center justify-center lg:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <AiOutlineBars />
        </button>
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
          className="hs-accordion-group p-6 w-full flex mt-4 flex-col flex-wrap"
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
                  <AccordionLink
                    name={link.name}
                    icon={link.icon}
                    subLinks={link.subLinks}
                  />
                </li>
              ) : (
                <li key={index}>
                  <SimpleLink name={link.name} icon={link.icon} />
                </li>
              )
            )}
          </ul>
        </nav>

        {/* <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar> */}
      </div>
    </>
  );
};

export default SidebarApp;
