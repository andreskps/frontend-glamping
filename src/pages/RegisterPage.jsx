import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RegisterOwner } from "../services/authService";

export const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await RegisterOwner({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      setError("");
      setCredentials({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");

      toast.success("Cuenta creada con éxito");
    } catch (error) {
      if (error.response.data.message === "Registro duplicado") {
        setError("El correo ya esta registrado");

        return;
      }
      setError("Error al crear la cuenta");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 mx-auto">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear cuenta
            </h1>
            <form className="space-y-4 md:space-y-6">
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={credentials.name}
                  onChange={(e) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                  id="name"
                  className="bg-gray-50 border border-gray-300
                  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  id="email"
                  className="bg-gray-50 border border-gray-300
                  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500"
                  placeholder="tucorreo@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300
                  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleRegister}
                className="w-full text-white bg-green-500 hover:bg-green-600 
                   transition-colors duration-300 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Crear cuenta
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Ya tienes cuenta?{" "}
                <Link to="/" className="text-green-500 hover:underline">
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
