import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";


const SnackbarNotify = ({open, message, color}:{open: boolean, message: string, color:AlertColor }) => {
    
    const [ notifyOpen, setNotifyOpen ] = useState(false)
    useEffect(() => {
        setNotifyOpen(open)
    },[open])
    
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotifyOpen(false)
    };

    return (
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={notifyOpen} 
            autoHideDuration={5000} 
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={color}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarNotify;