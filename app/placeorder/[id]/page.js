'use client'
import { Box, Button, Divider, Grid, Icon, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import order from '../../../assets/order.gif';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Details } from '@mui/icons-material';


const orderPlaced = () => {
    const router = useRouter();
    const param = useParams();
    const [details, setDetails] = useState({})
    // console.log(param);

    const fetchPlaceOrderApi = async () => {
        try {
            const res = await axios.get(`/api/placeorderid/${param.id}`);
            // console.log(res.data.message);
            if (res.data.message == 'Placed Order Successfully') {
                setDetails(res.data.resp)
            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    };

    useEffect(() => {
        fetchPlaceOrderApi();
    }, []);

    console.log(details)

    return (
        <Grid container sx={{ justifyContent: "center", alignItems: "center", height: "100dvh" }}>
            <Grid item xs={11.5} sm={10} md={7} lg={5}>
                <Paper elevation={3} sx={{ p: "10px", bgcolor: "#fbfbfb" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ position: "relative" }}>
                            <Image src={order} style={{ height: "200px", width: "250px" }} />
                        </Box>
                    </Box>
                    <Box>
                        <Typography align='center' sx={{ fontSize: "20px", color: "green" }}>Order Placed Successfully.</Typography>
                        <Typography align='center' sx={{ fontSize: "16px", color: "#9e9e9e" }}>Order ID : <span style={{ color: "black" }}> #{details._id}</span></Typography>
                        <Typography align='center' sx={{ fontSize: "16px", color: "#9e9e9e" }}>Order Amount : <span style={{ color: "black" }}>{details.toPay} Rs</span></Typography>
                        <Typography align='center' sx={{ fontSize: "16px", color: "#9e9e9e" }}>Payment Method : <span style={{ color: "black" }}>{details.payment}</span></Typography>
                        <Divider sx={{ mt: "15px" }} />
                    </Box>
                    <Box>
                        <Typography align='center' sx={{ overflowWrap: "break-word", fontSize: "20px", fontWeight: "600" }}>
                            A comfirmation mail has been sent to your Email
                        </Typography>
                    </Box>
                    <Box sx={{ mb: "10px" }}>
                        <Button variant='contained' sx={{ fontSize: "17px", mt: "25px", bgcolor: "#546e7a", '&:hover': { bgcolor: "#546e7a" } }} fullWidth onClick={() => { router.push('/myorder') }}>Track order</Button>
                        <Button variant='contained' sx={{ mt: "5px", fontSize: "17px", bgcolor: "#009688", '&:hover': { bgcolor: "#009688" } }} fullWidth onClick={() => { router.push('/') }}>back to home</Button>
                    </Box>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default orderPlaced