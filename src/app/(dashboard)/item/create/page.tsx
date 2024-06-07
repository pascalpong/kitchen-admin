"use client";

import { Box, Button, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import DragAndDrop from "./DragAndDrop";
import { ChangeEvent, FormEvent, useState } from "react";


const Create = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null); 
  
    const handleItemNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    };

    const handleItemPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItemPrice(e.target.value);
    };
  
    const handleImageSelect = (imgSrc: string | null) => {
        setImagePreview(imgSrc);
    };

    const handleCategoryChange = (e: ChangeEvent<{ value: unknown }>) => {
      setCategory(e.target.value as string);
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', itemName);
        formData.append('price', itemPrice);
        formData.append('category', category);
        if (imagePreview) {
            // Convert the base64 image data to a File object and append it to the form data
            const blob = await fetch(imagePreview).then((res) => res.blob());
            formData.append('image', blob, 'image.png');
        }

        
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Box width={'100%'} display="flex" flexDirection="column" alignItems="center" gap={2}>
            <DragAndDrop onImageSelect={handleImageSelect} />
            <TextField
                fullWidth
                label="Add item name here"
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Name: </InputAdornment>,
                }}
                variant="outlined"
                value={itemName}
                onChange={()=>handleItemNameChange}
            />
            <TextField
                fullWidth
                label="Add price here"
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Price: </InputAdornment>,
                }}
                variant="outlined"
                value={itemPrice}
                onChange={()=>handleItemPriceChange}
            />
            <Select
                fullWidth
                size="small"
                value={category}
                onChange={()=>handleCategoryChange}
                displayEmpty
                variant="outlined"
                style={{ minWidth: 200 }}
            >
                <MenuItem value="" disabled>
                Select Category
                </MenuItem>
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
                <MenuItem value="category3">Category 3</MenuItem>
            </Select>
            <Button 
                fullWidth
                size="small"
                type="submit" variant="contained" color="primary"
            >
            Create Item
          </Button>
        </Box>
      </form>
    );
}

export default Create;