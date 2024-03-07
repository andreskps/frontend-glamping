import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import TableReservation from "../Table/TableRervations";
import { getReservations } from "../../services/reservationsService";

// const reservations = Array.from({ length: 5 }, (_, i) => ({
//   id: Math.random().toString(36).substring(2, 9),
//   totalPrice: Math.floor(Math.random() * 1000000),
//   startDate: `2024-03-${String(i + 1).padStart(2, "0")}`,
//   endDate: `2024-03-${String(i + 2).padStart(2, "0")}`,
//   state: ["CONFIRMED", "FINISHED", "CANCELLED"][Math.floor(Math.random() * 3)],
//   code: Math.random().toString(36).toUpperCase().substr(2, 6),
//   property: {
//     name: [
//       "Glamping La Yurany",
//       "Glamping La Zafiro",
//       "Glamping La Esmeralda",
//       "Glamping La Rubí",
//       "Glamping La Diamante",
//     ][i],
//   },
//   guest: {
//     name: ["vale", "luis", "ana", "carlos", "maria"][i],
//   },
// }));

export const ReservationsTable = () => {
 
  const {isLoading,error,data:reservations} = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

const colums = [

    {
        header: "Code",
        accessorKey: "code",
        footer: "Code",
    },
    {
        header: "Start Date",
        accessorKey: "startDate",
        footer: "Start Date",
    },
    {
        header: "End Date",
        accessorKey: "endDate",
        footer: "End Date",
    },

    {
        header: "Property",
        accessorKey: "property.name",
        footer: "Property",
    },
    {
        header: "Total Price",
        accessorKey: "totalPrice",
        footer: "Total Price",
    },
    {
        header: "Guest",
        accessorKey: "guest.name",
        footer: "Guest",
    },
    {
      header: "Estado",
      accessorKey: "state",
      footer: "State",
  },
    
]

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;



  return (
    <TableReservation columns={colums} data={reservations} />
  )
};
