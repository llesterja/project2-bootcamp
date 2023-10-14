import React, { useState } from 'react';
import { TextField, Button, Chip, Grid } from '@mui/material';

const ChipForm = () => {
  const [inputValue, setInputValue] = useState(''); // State to store the input value
  const [chips, setChips] = useState([]); // State to store the created chips

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue && chips.length < 5) {
      setChips([...chips, inputValue]);
      setInputValue('');
    }
  };

  const handleChipDelete = (chipToDelete) => () => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            label="Enter text"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            variant="contained"
            disabled={inputValue === '' || chips.length >= 5}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <div>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={handleChipDelete(chip)}
            style={{ margin: '0.5rem' }}
          />
        ))}
      </div>
    </form>
  );
};

export default ChipForm;
