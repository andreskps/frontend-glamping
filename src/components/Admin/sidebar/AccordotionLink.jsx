import { Link } from "react-router-dom";

const AccordionLink = ({ name, icon, subLinks }) => {
  return (
    <>
      <button
        type="button"
        className="hs-accordion-toggle hs-accordion-active:text-slate-900 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-green-200 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 text-green-600">
          {icon}
        </span>
        {name}
        <svg
          className="hs-accordion-active:block ms-auto hidden w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>

        <svg
          className="hs-accordion-active:hidden ms-auto block w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="projects-accordion"
        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
      >
        <ul className="pt-2 ps-2">
          {subLinks.map((subLink, subIndex) => (
            <li key={subIndex}>
              <Link
                to={subLink.link}
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                {subLink.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AccordionLink;
