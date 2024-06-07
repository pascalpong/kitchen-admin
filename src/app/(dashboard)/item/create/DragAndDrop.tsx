import { Box, Button } from '@mui/material';
import { DragEventHandler, useState } from 'react';

const DragAndDrop = ({onImageSelect}: { onImageSelect: (imgSrc: string | null) => void}) => {
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = () => {
    setDragging(false);
  };


  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };


  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDeselectImage = () => {
    setImagePreview(null);
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        onImageSelect(imgSrc); 
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  };

  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: dragging ? '2px dashed #007bff' : '2px dashed transparent',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {imagePreview ? (
        <Box sx={{ position: 'relative' }}>
            <img src={imagePreview} alt="Dropped" style={{ maxWidth: '100%', maxHeight: 200 }} />
            <Button
            variant="outlined"
            size="small"
            onClick={handleDeselectImage}
            sx={{ position: 'absolute', top: 5, right: 5 }}
            >
            Deselect Image
            </Button>
        </Box>
      ) : (
        <>
          Drag and drop image here or <br />
          <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <label htmlFor="file-input">
            <Button variant="outlined" component="span">
              Select Image
            </Button>
          </label> 
        </>
      )}
    </Box>
  );
};

export default DragAndDrop;
