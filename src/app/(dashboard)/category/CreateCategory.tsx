import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const TheInput = ({ id, value, handleChange }: { id: string, value: string, handleChange: (id: string, value: string) => void }) => {
    return (
        <Box>
            <TextField  
                fullWidth
                variant="outlined"
                placeholder="Cateory name"
                size="small"
                aria-describedby="my-helper-text" 
                id={id} 
                value={value}
                onChange={(e) => handleChange(id, e.target.value)}
            />
        </Box>
    )
}

const CreateCategory = ({valueList, toClear, setToClear}: {valueList:(values: string[])=>void, toClear: boolean, setToClear:(clear: boolean)=>void}) => {
    const [inputs, setInputs] = useState([{ id: '0', value: '' }]);

    useEffect(() => {
        if(toClear === true) {
            setInputs([{ id: '0', value: '' }])
            setToClear(false)
        }
    },[toClear])

    const handleChange = (id: string, value: string) => {
        setInputs(prevInputs => prevInputs.map(input => input.id === id ? { ...input, value } : input));
    };

    const addInput = () => {
        setInputs(prevInputs => [...prevInputs, { id: `${prevInputs.length}`, value: '' }]);
    };

    const toSubmit = async (event: any) => {
        event.preventDefault();
        const values = inputs.filter(input => input.value !== "").map(input => input.value);
        valueList(values)
    };

    return (
        <form onSubmit={toSubmit} style={{ width: '100%' }}>
            <Stack width={'100%'} rowGap={1}>
                {inputs.map((input, index) => (
                    <TheInput 
                        key={index} 
                        id={input.id} 
                        value={input.value} 
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

export default CreateCategory;
