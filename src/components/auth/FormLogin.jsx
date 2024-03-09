import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { login, profile } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await login({
        email,
        password,
      });

      setToken(token);

      const user = await profile();

  
      setProfile(user);

      navigate("/admin");
    } catch (error) {

      setError(error.response.data.message);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a> */}
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Iniciar sesión como propietario
          </h1>
          <form class="space-y-4 md:space-y-6" >
          {error && (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
          
              <span class="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Correo
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              id="email"
              className="bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500"
             placeholder="Tucorreo@example.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
  
          <button
            type="button"
            onClick={handleLogin}
            className="w-full text-white bg-green-500 hover:bg-green-600 
               transition-colors duration-300 

              font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Iniciar sesión
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-green-500 hover:underline"
            >
              Registrate
            </Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  );
};

export default FormLogin;
