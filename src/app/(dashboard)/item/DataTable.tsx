"use client";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"; 
import { useRouter } from "next/navigation";
import { useCallback } from "react";


const getNestedValue = (obj: any, path: any) => {
    return path.split('.').reduce((acc: any, part: any) => acc && acc[part], obj);
};

const DataTable = ({ data, headCells }:{ data:any[], headCells:any[] }) => {

    const router = useRouter(); 
    const routeTo = useCallback((path: string) => {
        // router.push(path, { scroll: false });
    }, [router]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headCells.map((cell, key) => (
                        <TableCell key={key}>{cell.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody> 
                {data.map((datum, key) => (
                <TableRow
                    key={key}
                    onClick={() => routeTo(`/item/${datum.id}`)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                >
                    {headCells.map((cell, key) => (
                        <TableCell key={key}>{getNestedValue(datum, cell.name)}</TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable;