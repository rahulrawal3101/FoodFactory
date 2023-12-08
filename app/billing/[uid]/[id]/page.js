'use client'
import Header from '@/components/Header';
import { Box, Button, Container, Divider, Fab, FormControl, Grid, InputBase, InputLabel, MenuItem, Paper, Select, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';



const BillingPage = () => {
    const [cartData, setCartData] = useState([]);
    const param = useParams();
    const router = useRouter();
    const skelArr = new Array(3).fill();
    const [age, setAge] = useState('');
    const [verify, setVerify] = useState(false);
    const [showbtn, setShowBtn] = useState(true);
    const [upiVerify, setUpiVerify] = useState(
        {
            upiId: ''
        }
    )

    const handleChange = (event) => {
        // console.log(event.target.value)
        setAge(event.target.value);
        if (event.target.value === 'COD') {
            // alert('cod');
            setVerify(false);
            setShowBtn(false)
        }
        if (event.target.value === 'ONLINE') {
            setVerify(true);
            setShowBtn(true);
        }
    };
    // console.log(param.uid)
    // console.log(param)

    const fetchCartApi = async () => {
        try {
            const res = await axios.get(`/api/cart/${param.uid}`);
            // console.log('new data ',res);
            if (res.data.message == 'Data Fetch Successfully') {
                setCartData(res.data.resp);
            }

        } catch (err) {
            console.log(err);
            alert(err.message);

        }
    };
    // console.log(cartData)
    useEffect(() => {
        fetchCartApi();
    }, []);

    const totalSum = cartData.reduce((acc, curr) => {
        return acc + (curr.qty * curr.srp)
    }, 0);

    // const deleteHandler = async (id) => {
    //     try {
    //         const res = await axios.delete(`/api/cart/${id}`);
    //         // console.log(res);
    //         if (res.data.message == "Item Deleted Successfully") {
    //             fetchCartApi();

    //         }

    //     } catch (err) {
    //         console.log(err);
    //         alert(err.message);

    //     }
    // };
    const disCount = 100;
    const taxCharge = 25;
    const deliveryChrg = 20;
    const toPay = totalSum + deliveryChrg + taxCharge - disCount;

    const ClearCart = async () => {
        console.log(param.uid)
        try {
            const body = await axios.delete(`/api/deleteallcartitems/${param.uid}`);
            // console.log(body)
        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    }




    const placeOrderHandler = async () => {
        try {
            const body = await axios.post('/api/placeorder', {
                subTotal: totalSum,
                delchrg: deliveryChrg,
                tax: taxCharge,
                discount: disCount,
                toPay: toPay,
                uid: param.uid,
                items: cartData,
                address: param.id,

            });
            console.log('placed orderd', body);
            console.log('placed orderd aaa', body.data.resp._id);
            if (body.data.message == "Place Order Successfully") {
                router.push(`/placeorder/${body.data.resp._id}`);
                ClearCart()
            }

        } catch (err) {
            console.log(err);
            alert(err.message);
        }

    };

    const verifyHandler = (e) => {
        const { name, value } = e.target;
        setUpiVerify({ ...upiVerify, [name]: value });
        

    }
    console.log(upiVerify)
    // console.log(cartData.length)

    return (
        <>
            <Container disableGutters maxWidth='xl'>
                <Header />
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '0px', overflow: 'hidden' }}>
                    <Grid item lg={4} md={6} sm={8} xs={11} >
                        <Grid container sx={{ mt: '40px', justifyContent: 'center', alignItems: 'center', }}>
                            <Grid item xs={9} sx={{ height: '50px' }}>
                                <FormControl variant="standard" sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Payment Mode</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={age}
                                        onChange={(e) => { handleChange(e) }}

                                    >

                                        <MenuItem value={'COD'}>COD</MenuItem>
                                        <MenuItem value={'ONLINE'}>ONLINE</MenuItem>

                                    </Select>
                                </FormControl>



                            </Grid>

                            <Grid item xs={9} sx={{ mt: '48px', display: verify ? 'block' : 'none' }}>
                                <Box sx={{ border: '1px solid grey', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <InputBase placeholder='Enter UPI ID' sx={{ ml: '2px', width: '78.5%' }} onChange={verifyHandler} name='upiId' value={upiVerify.upiId} />
                                    <Button variant='contained' sx={{ bgcolor: '#4caf50', width: '20%' }}>Verify</Button>
                                </Box>

                            </Grid>
                        </Grid>

                        <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px' }} elevation={2}>
                            <Grid container>
                                <Grid item xs={12} sx={{ bgcolor: 'black', padding: '8px', textAlign: 'center', borderRadius: '11px 11px 0px 0px' }}>
                                    <Typography sx={{ color: 'White', fontSize: { lg: '25px', md: '23px', sm: '20px', xs: '18px' }, fontWeight: 'bold' }}>Billing </Typography>

                                </Grid>
                                <Grid item xs={12} sx={{ height: '300px' }}>
                                    <Grid container>
                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', }}>Item SubTotal</Typography>

                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography sx={{ fontSize: { lg: '18px', mr: '17px', sm: '15px', xs: '15px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{totalSum} Rs</Typography>

                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', }}>Delivery Charges</Typography>

                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{deliveryChrg} Rs</Typography>

                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', }}>Tax (9%)</Typography>

                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{taxCharge} Rs</Typography>

                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', }}>Discount</Typography>

                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161', textAlign: 'center' }}>{disCount} Rs</Typography>

                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '4px' }} />

                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: '#bdbdbd', borderRadius: '0px 0px 11px 11px' }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', }}>To Pay</Typography>

                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', }}>{toPay} Rs</Typography>

                                            </Grid>
                                        </Grid>


                                    </Grid>

                                </Grid>

                                <Grid item xs={12} sx={{ p: '10px', bgcolor: 'black', borderRadius: '10px 10px 0px 0px' }}>
                                    <Typography sx={{ fontSize: { lg: '20px', md: '19px', sm: '17px', xs: '16px' }, fontWeight: 'bold', color: 'white' }}>Order Items</Typography>
                                </Grid>



                                {
                                    cartData.length == 0 ?
                                        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

                                            {
                                                skelArr.map((ele, index) => {
                                                    return <Grid item xs={12} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, }}>

                                                        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', m: '10px 0px' }}>
                                                            <Grid item xs={5.5} >
                                                                <Skeleton variant="rectangular" sx={{ width: '50%', height: '15px' }} />
                                                                <Skeleton variant="rectangular" sx={{ width: '30%', height: '15px', mt: '7px' }} />
                                                            </Grid>
                                                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                                                <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px', }} />
                                                            </Grid>
                                                            <Grid item xs={2.1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', }}>
                                                                <Skeleton variant="rectangular" sx={{ width: '50%', height: '20px', }} />
                                                            </Grid>
                                                        </Grid>



                                                    </Grid>
                                                })
                                            }



                                        </Grid> :

                                        <Grid item xs={12} >

                                            {
                                                cartData.map((ele, index) => {

                                                    return (
                                                        <Grid container key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                                                            <Grid item xs={5.5}  >
                                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold' }}>{ele.name} x {ele.qty}</Typography>
                                                                <Typography sx={{ fontSize: { lg: '14px', md: '13px', sm: '12px', xs: '9px' }, fontWeight: 'bold', color: '#bdbdbd' }}>{ele.srp} x {ele.qty}</Typography>

                                                            </Grid>
                                                            {/* <Grid item xs={2} >
                    <DeleteForeverIcon sx={{ color: 'crimson', cursor: 'pointer' }} onClick={() => { deleteHandler(ele._id) }} />

                </Grid> */}
                                                            <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                                                <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161' }}>{ele.srp * ele.qty} Rs</Typography>

                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })
                                            }


                                        </Grid>
                                }


                                <Grid container sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', p: '15px', bgcolor: '#bdbdbd', borderRadius: '0px 0px 11px 11px' }}>

                                </Grid>

                            </Grid>
                        </Paper>

                    </Grid>

                </Grid>

            </Container>
            <Fab aria-label="add" variant="extended" sx={{ position: 'fixed', bottom: 20, right: 40, bgcolor: 'black', '&:hover': { bgcolor: 'black' }, color: 'white', fontSize: '15px', borderRadius: '0px 20px 0px 20px' }} onClick={placeOrderHandler} disabled={showbtn}>
                Place Order
            </Fab>

        </>
    )
}

export default BillingPage