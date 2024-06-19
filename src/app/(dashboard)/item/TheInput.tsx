import { useState, ChangeEvent, DragEvent } from 'react';
import { Box, Button, TextField, Grid, Select, MenuItem } from '@mui/material';

const TheInput = ({ id, name, price, image, handleChange, selects }: { id: string, name: string, price: string, image: string | null, handleChange: (id: string, field: string, value: string) => void, selects: any[] }) => {
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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
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
                label="Age" 
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
              <img src={imageSrc} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
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
