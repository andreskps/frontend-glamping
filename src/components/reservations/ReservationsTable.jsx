import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import TableReservation from "../Table/TableRervations";
import { getReservations } from "../../services/reservationsService";



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
