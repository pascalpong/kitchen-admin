import React, { useEffect, useState } from 'react';
import { Box, Modal, IconButton, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ImageWithEnlargeAndDownload = ({ src, alt }: { src: string, alt: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenInNewTab = () => {
    window.open(src, '_blank');
  };

  return (
    <>
        <Stack direction="row" spacing={2}>
            <Box
                component="img"
                sx={{
                height: 100,
                width: 100,
                cursor: 'pointer',
                }}
                alt={alt}
                src={src}
                onClick={handleOpen}
                
            />
            <IconButton onClick={handleOpenInNewTab} aria-label="download" sx={{ marginLeft: 1 }}>
                <DownloadIcon />
            </IconButton>
        </Stack>
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
        <Box
            component="img"
            sx={{
            height: 'auto',
            maxWidth: '90%',
            maxHeight: '90%',
            }}
            alt={alt}
            src={src}
        />
        </Modal>
    </>
  );
};
 
export default ImageWithEnlargeAndDownload;
