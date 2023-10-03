import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'carrier',
    headerName: 'flight Provider',
    width: 150,
    editable: false,
  },
  {
    field: 'departureDate',
    headerName: 'departure Date',
    width: 150,
    editable: false,
  },
  {
    field: 'departureFlightDuration',
    headerName: 'Dep Flight Duration',
    width: 150,
    editable: false,
  },
  {
    field: 'returnDate',
    headerName: 'return Date',
    width: 150,
    editable: false,
  },
  {
    field: 'returnFlightDuration',
    headerName: 'Return Flight Duration',
    width: 150,
    editable: false,
  },
  {
    field: 'totalCost',
    headerName: 'Total Cost',
    width: 150,
    editable: false,
  },
  {
    field: 'ticketType',
    headerName: 'Cabin Class',
    width: 150,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    carrier: 'Snow',
    departureDate: 'Jon',
    departureFlightDuration: 35,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 2,
    carrier: 'Lannister',
    departureDate: 'Cersei',
    departureFlightDuration: 42,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 3,
    carrier: 'Lannister',
    departureDate: 'Jaime',
    departureFlightDuration: 45,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 4,
    carrier: 'Stark',
    departureDate: 'Arya',
    departureFlightDuration: 16,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 5,
    carrier: 'Targaryen',
    departureDate: 'Daenerys',
    departureFlightDuration: 12,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 6,
    carrier: 'Melisandre',
    departureDate: null,
    departureFlightDuration: 15,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 7,
    carrier: 'Clifford',
    departureDate: 'Ferrara',
    departureFlightDuration: 44,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 8,
    carrier: 'Frances',
    departureDate: 'Rossini',
    departureFlightDuration: 36,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
  {
    id: 9,
    carrier: 'Roxie',
    departureDate: 'Harvey',
    departureFlightDuration: 65,
    returnFlightDate: 24,
    returnFlightDuration: 22,
    totalCost: 100,
    ticketType: 'economy',
  },
];

export default function FlightsTable({ flights }) {
  console.log(flights);
  return (
    <Box sx={{ height: 400, width: 'fit-content' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
