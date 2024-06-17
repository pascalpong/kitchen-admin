"use client";

import { useGetLotDetailsQuery } from "@/api/LotService";
import withAuth from "@/hoc/withAuth";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const LotDetails = ({ params }: { params: { slug: string } }) => { 
    const { slug } = params;
    const [ lotId ] = useState(slug)
    const { data } = useGetLotDetailsQuery({id: lotId});


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
            </CardActionArea>
        </Card>
    );
}

export default withAuth(LotDetails);
