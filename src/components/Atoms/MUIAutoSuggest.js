import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function AirportAutoSuggest() {
  return (
    <Stack spacing={1} sx={{ width: 300 }} className="mui-auto-suggest">
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={airports.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="airport, city or country" />
        )}
      />
    </Stack>
  );
}

const airports = [];
