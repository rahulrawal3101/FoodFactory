'use client'
import Header from '@/components/Header';
import { Box, CircularProgress, Container, Fab, Grid, Paper, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import gif1 from '../../../assets/gif1.gif';
import Image from 'next/image';


const CheckOutPage = () => {
    const router = useRouter();
    const [cartData, setCartData] = useState([]);
    const param = useParams();
    const [btn, setBtn] = useState(true);
    const skelArr = new Array(4).fill(1);
    const [checkData, setCheckData] = useState(false);
    const [loaders, setLoaders] = useState(false)
    // console.log(param)

    const fetchCartApi = async () => {
        try {
            const res = await axios.get(`/api/cart/${param.id}`);
            console.log('new data ', res);
            if (res.data.message == 'Data Fetch Successfully') {
                setCartData(res.data.resp);
                setCheckData(false)

            }
            if (res.data.message == "Failed To Fetch Data") {
                setCheckData(true)
            }

        } catch (err) {
            console.log(err);
            alert(err.message)

        }

    };
    console.log(checkData)
    useEffect(() => {
        fetchCartApi();
    }, []);


    const totalSum = cartData.reduce((acc, curr) => {
        return acc + (curr.qty * curr.srp)
    }, 0);

    const deleteHandler = async (id) => {
        setLoaders(id)
        try {
            const res = await axios.delete(`/api/cart/${id}`);
            // console.log(res);
            if (res.data.message == "Item Deleted Successfully") {
                fetchCartApi();
                setLoaders(false)
            }

        } catch (err) {
            console.log(err);
            alert(err.message);
            setLoaders(false)

        }
    }

    // console.log(totalSum);
    const goToAddressPage = () => {

        if (cartData == '') {

            alert('Please Add items');
        }
        if (cartData != '') {

            router.push(`/address/${JSON.parse(localStorage.getItem('UID'))}`);
        }

    };
    //   console.log('check cartdata',cartData.length )

    return (
        <>
            <Container disableGutters maxWidth='xl'>
                <Header />
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '0px', overflow: 'hidden', pb: '40px' }}>
                    <Grid item lg={4} md={6} sm={7} xs={11} >
                        <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px' }} elevation={2}>
                            <Grid container>
                                <Grid item xs={12} sx={{ bgcolor: 'black', padding: '8px', textAlign: 'center', borderRadius: '11px 11px 0px 0px' }}>
                                    <Typography sx={{ color: 'White', fontSize: { lg: '25px', md: '23px', sm: '20px', xs: '18px' }, fontWeight: 'bold' }}>CheckOut</Typography>

                                </Grid>

                                {
                                    checkData ?
                                        <Grid container>
                                            <Grid item xs={12} sx={{ p: '20px' }}>
                                                <Box sx={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Image src={gif1} alt='gif' objectFit='cover' style={{ width: '50%', height: '50%' }} />
                                                </Box>
                                                

                                            </Grid>
                                        </Grid> :

                                        <Grid container>

                                            {
                                                cartData.length == 0 ?
                                                    <Grid item xs={12}>
                                                        <Skeleton variant="rectangular" sx={{ width: '20%', height: '20px', mt: '7px', ml: '13px' }} />
                                                    </Grid> :

                                                    <Grid item xs={12} sx={{ p: '10px' }}>
                                                        <Typography sx={{ fontSize: { lg: '21px', md: '19px', sm: '17px', xs: '16px' }, fontWeight: 'bold', color: '#616161' }}>{cartData.length} Items</Typography>

                                                    </Grid>
                                            }







                                            {/* skeleton   */}





                                            {
                                                cartData.length == 0 ?
                                                    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px', }}>

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
                                                                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '8px' }}>
                                                                        {
                                                                            checkData ? <Grid item xs={12}>
                                                                                <Typography sx={{ textAlign: 'center' }}>No Data Found</Typography>

                                                                            </Grid> :
                                                                                <Grid container key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '8px' }}>
                                                                                    <Grid item xs={5.5}  >
                                                                                        <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold' }}>{ele.name} x {ele.qty}</Typography>
                                                                                        <Typography sx={{ fontSize: { lg: '14px', md: '13px', sm: '12px', xs: '9px' }, fontWeight: 'bold', color: '#bdbdbd' }}>{ele.srp} x {ele.qty}</Typography>

                                                                                    </Grid>
                                                                                    <Grid item xs={2} >
                                                                                        {
                                                                                            loaders == ele._id ?
                                                                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                    <CircularProgress size={20} />
                                                                                                </Box> :

                                                                                                <DeleteForeverIcon sx={{ color: 'crimson', cursor: 'pointer' }} onClick={() => { deleteHandler(ele._id) }} />
                                                                                        }


                                                                                    </Grid>
                                                                                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                                                                        <Typography sx={{ fontSize: { lg: '16px', mr: '16px', sm: '14px', xs: '14px' }, fontWeight: 'bold', color: '#616161' }}>Rs {ele.srp * ele.qty}</Typography>

                                                                                    </Grid>
                                                                                 </Grid>
                                                                        }


                                                                    </Grid>
                                                                )
                                                            })
                                                        }


                                                    </Grid>

                                            }
                                            <Grid container>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: 'black', borderRadius: '0px 0px 11px 11px' }}>
                                                    <Grid item xs={4}>
                                                        <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', color: 'white' }}>To Pay</Typography>


                                                    </Grid>
                                                    <Grid item xs={4} sx={{ textAlign: 'right', }}>
                                                        <Typography sx={{ fontSize: { lg: '19px', md: '18px', sm: '16px', xs: '15px' }, fontWeight: 'bold', color: 'white' }}>Rs {totalSum}</Typography>

                                                    </Grid>
                                                </Grid>
                                            </Grid>


                                        </Grid>
                                }



                            </Grid>
                        </Paper>

                    </Grid>

                </Grid>

            </Container>
            <Fab aria-label="add" variant="extended" sx={{ position: 'fixed', bottom: 20, right: { lg: 40, md: 37, sm: 30, xs: 30 }, bgcolor: 'black', '&:hover': { bgcolor: 'black' }, color: 'white', fontSize: '15px', borderRadius: '0px 20px 0px 20px' }} onClick={goToAddressPage} disabled={cartData.length == 0} >
                <LocationOnIcon /> Address
            </Fab>

        </>
    )
}

export default CheckOutPage