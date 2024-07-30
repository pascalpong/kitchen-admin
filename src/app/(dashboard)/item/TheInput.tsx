import { useState, ChangeEvent, DragEvent } from 'react';
import { Box, Button, TextField, Grid, Select, MenuItem } from '@mui/material';
import Image from 'next/image';
import { resizeAndCompressImage } from './imageUtils';

const TheInput = ({ id, name, price, categoryId, image, handleChange, selects }: { id: string, name: string, price: string, categoryId: string, image: string | null, handleChange: (id: string, field: string, value: string) => void, selects: any[] }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(image);
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    console.log('Dropped file:', file); // Debug log

    if (file && file.type.startsWith('image/')) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const result = e.target?.result as string;
          const compressedImage = await resizeAndCompressImage(result, 800, 0.7);
          setImageSrc(compressedImage);
          handleChange(id, 'image', compressedImage);
        };
        reader.onerror = (error) => console.error('FileReader error:', error);
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    } else {
      console.log('Invalid file type or no file dropped');
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
        handleChange(id, 'image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeselectImage = () => {
    setImageSrc(null);
    handleChange(id, 'image', '');
  };

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
                label="Categories"
                value={categoryId}
                onChange={(e) => handleChange(id, 'categoryId', e.target.value)}
            >
              { selects.map((select: any, key: number) => 
                <MenuItem key={key} value={select.id}>{select.name}</MenuItem>
              )}
            </Select>
        </Grid>
        <Grid item xs={3}>
          <div
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: dragging ? '2px dashed #007bff' : '2px dashed transparent', 
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            Drag and drop image here or <br />
            <input
              type="file"
              id={`file-input-${id}`}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <label htmlFor={`file-input-${id}`}>
              <Button
                variant="outlined"
                component="span"
              >
                Select Image
              </Button>
            </label>
          </div>
          {imageSrc && (
            <Box mt={2} textAlign="center">
              <Image src={imageSrc} alt="Preview" width={100} height={100} style={{ maxWidth: '100%', height: 'auto' }} />
              <Button variant="outlined" color="secondary" onClick={handleDeselectImage} style={{ marginTop: '10px' }}>
                Deselect Image
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TheInput;