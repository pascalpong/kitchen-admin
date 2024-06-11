import { Box, TextField, Grid } from '@mui/material';

const TheInput = ({ id, name, amount, handleChange }: { id: string, name: string, amount: number, handleChange: (id: string, field: string, value: string) => void }) => {

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size='small'
            label={`Lot ${id} Name`}
            variant="outlined"
            value={name}
            onChange={(e) => handleChange(id, 'name', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size='small'
            label="Amount"
            variant="outlined"
            type="amount"
            value={amount}
            onChange={(e) => handleChange(id, 'amount', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TheInput;
