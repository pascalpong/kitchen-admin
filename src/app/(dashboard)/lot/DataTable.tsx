"use client";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"; 
import { useRouter } from "next/navigation";
import StatusSwitch from "./StatusSwitch";
import { useCreateBillMutation } from "@/api/BillService";
import { useState } from "react";
import ImageWithEnlargeAndDownload from "@/components/ImageWithEnlargeAndDownload";
import OpenBill from "./OpenBill";


const getNestedValue = (obj: any, path: any) => {
    return path.split('.').reduce((acc: any, part: any) => acc && acc[part], obj);
};

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const DataTable = ({ data, headCells }:{ data:any[], headCells:any[] }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headCells.map((cell, key) => (
                        <TableCell align="center" key={key}>{cell.label}</TableCell>
                    ))}
                    <TableCell align="center">QR Code</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody> 
                {data.map((datum, key) => (
                <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                >
                    {headCells.map((cell, key) => (
                            <TableCell align="center" key={key}>
                            { cell.name === "status" ? (
                                <StatusSwitch lotId={datum.id} initStatus={getNestedValue(datum, cell.name)}/> 
                            ) : cell.name === "qrcode" ? (
                                <ImageWithEnlargeAndDownload src={`${process.env.NEXT_PUBLIC_API_URL}/${getNestedValue(datum, cell.name)}`} alt="" />
                            ) : (
                                <Typography>{getNestedValue(datum, cell.name)}</Typography>
                            ) }
                            </TableCell> 
                    ))}
                    <TableCell>
                        <OpenBill lotId={datum.id} status={datum.status} bills={datum.Bill} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable;