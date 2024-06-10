import { useState, ChangeEvent, DragEvent } from 'react';
import { Box, Button, TextField, Grid, Select, MenuItem } from '@mui/material';

const TheInput = ({ id, name, price, handleChange }: { id: string, name: string, price: string, handleChange: (id: string, field: string, value: string) => void }) => {

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            size='small'
            label={`Item ${id} Name`}
            variant="outlined"
            value={name}
            onChange={(e) => handleChange(id, 'name', e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            size='small'
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => handleChange(id, 'price', e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
            <Select
                fullWidth
                size='small'
                labelId="demo-select-small-label"
                id="demo-select-small" 
                label="Age" 
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </Grid> 
      </Grid>
    </Box>
  );
};

export default TheInput;
