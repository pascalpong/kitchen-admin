import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import TheInput from "./TheInput";

const CreateItems = ({valueList, toClear, setToClear}: {valueList: (values: any[]) => void, toClear: boolean, setToClear:(clear: boolean)=>void}) => {
    const [inputs, setInputs] = useState([{ id: '0', name: '', price: '', image: null }]);

    useEffect(() => {
      if (toClear) {
        setInputs([{ id: '0', name: '', price: '', image: null }]);
        setToClear(false);
      }
    }, [toClear]);
  
    const handleChange = (id: string, field: string, value: string) => {
      setInputs(prevInputs => prevInputs.map(input => input.id === id ? { ...input, [field]: value } : input));
    };
  
    const addInput = () => {
      setInputs(prevInputs => [...prevInputs, { id: `${prevInputs.length}`, name: '', price: '', image: null }]);
    };
  
    const toSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const values = inputs.filter(input => input.name !== "" || input.price !== "" || input.image !== null);
      valueList(values);
    };

    return (
        <form onSubmit={toSubmit} style={{ width: '100%' }}>
            <Stack width={'100%'} rowGap={1}>
                {inputs.map((input, index) => (
                <TheInput
                    key={index}
                    id={input.id}
                    name={input.name}
                    price={input.price}
                    image={input.image}
                    handleChange={handleChange}
                />
                ))}
                <Grid container columnSpacing ={1} columns={12}>
                    <Grid item xs={8}>
                        <Button 
                            fullWidth
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={addInput}
                            startIcon={<ControlPointIcon />}
                        >
                             Add Row
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button 
                            fullWidth
                            size="small"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </form>
    );
}

export default CreateItems;
