"use client";

import { Container, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ToOrder from "./ToOrder";
import BillDetails from "./BillDetails";
import MainPage from "./MainPage";
import { useGetBillWithLotCodeQuery } from "@/api/ScanService";

const Bill = ({ params }: { params: { slug: string[] } }) => {
    const { slug } = params;
    const [ scanPage ] = useState<string>(slug[1])
    const [ lotCode ] = useState<string>(slug[0])
    const bill = useGetBillWithLotCodeQuery({lotCode: lotCode})
    useEffect(() => {
        console.log(bill)
    },[bill])


    return(
        <Container maxWidth="sm">
            <Paper elevation={6}>
                <Stack width={'100%'} paddingY={20}>
                    { scanPage === "main" ? (
                        <MainPage />
                    ) : scanPage === "details" ? (
                        <BillDetails />
                    ) : scanPage === "to-order" ? (
                        <ToOrder />
                    ) : (
                        <>...please open bill</>
                    )}
                </Stack>
            </Paper>
        </Container>
    )
}

export default Bill;