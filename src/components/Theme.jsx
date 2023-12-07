import { useState, useEffect } from "react";

const Theme = () => {
  const [tema, setTema] = useState(localStorage.getItem("theme") === "dark" ? "dark" : "light");

  

  useEffect(() => {
    if (tema === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [tema]);

  const handleTemaSwitch = () => {
    setTema(tema === "dark" ? "light" : "dark");
  };
  return (
    <>
      <button
        className="bg-white dark:bg-gray-800 p-3 rounded-3xl"
        onClick={handleTemaSwitch}
      >
        {tema === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brightness-up"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            // stroke-linecap="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="5" x2="12" y2="3" />
            <line x1="17" y1="7" x2="18.4" y2="5.6" />
            <line x1="19" y1="12" x2="21" y2="12" />
            <line x1="17" y1="17" x2="18.4" y2="18.4" />
            <line x1="12" y1="19" x2="12" y2="21" />
            <line x1="7" y1="17" x2="5.6" y2="18.4" />
            <line x1="6" y1="12" x2="4" y2="12" />
            <line x1="7" y1="7" x2="5.6" y2="5.6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-moon"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="#000000"
            fill="none"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
        )}
      </button>
    </>
  );
};

export default Theme;
