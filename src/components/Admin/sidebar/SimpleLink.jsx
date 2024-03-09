import { Link } from "react-router-dom";

const SimpleLink = ({ name, icon,link }) => {
    return (
      <>
        <Link
          className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-green-200 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          to={link}
        >
          
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 text-green-600">
            {icon}
          </span>

          {name}
        </Link>
      </>
    );
  };

    export default SimpleLink;