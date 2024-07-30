"use client";

import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TheInput from "./TheInput";
import { resizeAndCompressImage } from './imageUtils'; // We'll create this utility function

const CreateItems = ({
  valueList,
  toClear,
  setToClear,
  categoryList,
}: {
  valueList: (values: any) => void;
  toClear: boolean;
  setToClear: (clear: boolean) => void;
  categoryList: any[];
}) => { 
  const [inputs, setInputs] = useState([
    { id: "0", name: "", price: "", categoryId: "", image: null },
  ]);

  useEffect(() => {
    if (toClear) {
      setInputs([{ id: '0', name: '', price: '', categoryId: '', image: null }]);
      setToClear(false);
    }
  }, [toClear, setToClear]);

  const handleChange = (id: string, field: string, value: string) => {
    setInputs(prevInputs => prevInputs.map(input => input.id === id ? { ...input, [field]: value } : input));
  };

  const addInput = () => {
    setInputs(prevInputs => [...prevInputs, { id: `${prevInputs.length}`, name: '', price: '', categoryId: '', image: null }]);
  };
 
  const toSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedInputs = await Promise.all(inputs.map(async (input) => {
      let compressedImage = null;
      if (input.image) {
        compressedImage = await resizeAndCompressImage(input.image, 800, 0.7); // Max width 800px, 70% quality
      }
      const { id, ...idRemoved } = input ;
      return {
        ...idRemoved,
        image: compressedImage
      };
    }));
    valueList(formattedInputs);
  };

  return (
      <form onSubmit={toSubmit} style={{ width: '100%' }}>
        <Stack width={'100%'} rowGap={1}>
          {inputs.map((input, index) => (
            <TheInput
              key={index}
              id={input.id}
              categoryId={input.categoryId}
              name={input.name}
              price={input.price}
              image={input.image}
              handleChange={handleChange}
              selects={categoryList}
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
};
 

export default CreateItems;