import { AlertColor, Button, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SnackbarNotify from "@/components/SnackBar";

interface Notify {
    open: boolean,
    message: string,
    color: AlertColor
}

const Assign = ({data}: {data: any[]}) => {

    const [ notify, setNotify ] = useState<Notify>({
        open: false,
        message: "",
        color: "error"
    })
    
    const [ rows, setRows ] = useState<any[]>([])
    useEffect(() => {
        setRows(data)
    },[data])

    const assingType = async (assign: string, type: string) => {
        if(assign === type) {
            setNotify({
                open: true,
                message: "Message",
                color: "error"
            })
        } else {

        }
    }

    return (
        <>
            <SnackbarNotify color={notify.color} open={notify.open} message={notify.message} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Full name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="center">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, key) => (
                        <TableRow
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                {row.email}
                            </TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={1} sx={{ width:'100%' }}>
                                    <Button fullWidth 
                                        variant={row.type === 'admin' ? "contained" : "outlined"} 
                                        size="small" color="error" 
                                        startIcon={<AdminPanelSettingsOutlinedIcon />}
                                        onClick={()=>assingType('admin', row.type)}
                                    >
                                        Admin
                                    </Button>
                                    <Button fullWidth 
                                        variant={row.type === 'employee' ? "contained" : "outlined"} 
                                        size="small" color="primary" 
                                        startIcon={<GroupOutlinedIcon />}
                                        onClick={()=>assingType('employee', row.type)}
                                    >
                                        Employee
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Assign;