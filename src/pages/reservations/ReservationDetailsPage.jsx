import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReservationById } from "../../services/reservationsService";
export const ReservationDetailsPage = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reservation", id],
    queryFn: () => getReservationById(id),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="sm:w-11/12 lg:w-3/4 mx-auto">
        <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
          <div className="flex justify-between">
            <div>
             <img 
              className=""
              src="/public/logo.jpg" 
              />


              <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                {data.name}
              </h1>
            </div>

            <div className="text-end">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                Reserva
              </h2>
             
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Propiedad:{" "}
                <span className="font-normal text-gray-600 dark:text-gray-400">
                  {data.property.name}
                </span>
              </h3>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Ubicación:{" "}
                <span className="font-normal text-gray-600 dark:text-gray-400">
                  {data.property.location.displayName}
                </span>
              </h3>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Huesped:{" "}
                <span className="font-normal text-gray-600 dark:text-gray-400">
                  {data.guest.name}
                </span>
              </h3>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Email:{" "}
                <span className="font-normal text-gray-600 dark:text-gray-400">
                  {data.guest.email}
                </span>
              </h3>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Estado:{" "}
                <span className="font-normal text-gray-600 dark:text-gray-400">
                  {data.state.toLowerCase()}
                </span>
              </h3>
            </div>

            <div className="sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                    Desde:
                  </dt>
                  <dd className="col-span-2 text-gray-500">{data.startDate}</dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                    Hasta:
                  </dt>
                  <dd className="col-span-2 text-gray-500">{data.endDate}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Productos
              </h2>
              {data.reservationProducts.length === 0 ? (
                <p className="text-gray-500">No hay productos en la reserva</p>
              ) : (
                data.reservationProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-white  rounded-lg flex justify-between items-center mb-4"
                  >
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 uppercase">
                        Producto
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {product.product.name}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 uppercase">
                        Cantidad
                      </h5>
                      <p className="text-gray-800 dark:text-gray-200">
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border border-gray-200 mt-2 p-4 rounded-lg space-y-4 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Servicios
              </h2>
              {data.reservationServices.length === 0 ? (
                <p className="text-gray-500">No hay servicios en la reserva</p>
              ) : (
                data.reservationServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 bg-white  rounded-lg flex justify-between items-center mb-4"
                  >
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 uppercase">
                        Servicio
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {service.servicesProperty.name}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div class="mt-8 flex sm:justify-end">
            <div class="w-full max-w-2xl sm:text-end space-y-2">
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                    Precio total:
                  </dt>
                  <dd class="col-span-2 text-gray-500">${data.totalPrice}</dd>
                </dl>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">© 2024 Preline.</p>
        </div>

        {/* <div className="mt-6 flex justify-end gap-x-3">
          <a
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Invoice PDF
          </a>
          <a
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
            Print
          </a>
        </div> */}
      </div>
    </div>
  );
};
