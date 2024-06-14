"use client";

import { useCloseBillMutation, useCreateBillMutation } from "@/api/BillService";
import { Button, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const OpenBill = ({status, lotId, bills}: {status: string, lotId: number, bills: any[]}) => {
    const router = useRouter()
 
    const [ disabled, setDisabled ] = useState(true)
    const [ lotValue ] = useState(lotId) 
    const [ createBill ] = useCreateBillMutation()
    const [ closeBill ] = useCloseBillMutation()
    const [ billStatus, setBillStatus ] = useState<string>('')
    const [ billId, setBillId ] = useState<number>()
    const openBill = async () => {
        const open = await createBill({lotId: lotValue, status: 'open'})
        if(open.data.success) {
            const { data } = open.data
            setBillId(data.id)
            setDisabled(false)
        }
    }

    const toCloseBill = async (lotId: number) => {
        const close = await closeBill({billId, lotId, status: 'close'})
        if(close.data.success) {
            const { data } = close.data
            setBillId(data.id)
            setDisabled(false)
        }
    }

    useEffect(() => {
        if(bills.length > 0) {
            const bill = bills[0]
            setBillStatus(bill.status)
            if(bill.status !== 'open') {

            } else {
                setDisabled(false)
            }
        } else {
            setDisabled(false)
        }
        if(status === 'inactive') {
            setDisabled(true)
        }
    },[bills, status])


    return (
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
            { billStatus === 'open' ? (
                <Button fullWidth disabled={disabled} onClick={() => toCloseBill(lotValue)} variant={'contained'} color="warning" >Close</Button>
            ) : (
                <Button fullWidth disabled={disabled} onClick={() => openBill()} variant={'contained'} >Open Bill</Button>
            )}
        </Stack>
    )
}

export default OpenBill;