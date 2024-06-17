import { useUpdateLotStatusMutation } from "@/api/LotService";
import { Stack, Switch, Typography } from "@mui/material"
import { useEffect, useState } from "react";


const StatusSwitch = ({lotId, initStatus}: {lotId: number, initStatus: string}) => {
    const [ updateLot ] = useUpdateLotStatusMutation()
    const [ status, setStatus ] = useState<boolean>(false)
    const updateLotStatus = async (lotId: number, status: boolean) => {
        const update = await updateLot({lotId, status: !status})
        if(update.data.success) {
            setStatus(!status)
        }
    }

    useEffect(()=> {
        if(initStatus === 'active') {
            setStatus(true)
        } else {
            setStatus(false)
        }
    },[initStatus])

    return (
        <Stack direction="row" spacing={1} alignItems="center" width={'100%'}>
            <Typography>Active</Typography>
            <Switch checked={status} onClick={() => updateLotStatus(lotId, status)} inputProps={{ 'aria-label': 'ant design' }} />
            <Typography>Inactive</Typography>
        </Stack> 
    )
}

export default StatusSwitch;