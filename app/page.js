'use client'
import CrouselComp from '@/components/CrouselComp';
import Header from '@/components/Header';
import { Badge, Box, Container, Grid, Paper, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import food2 from '../assets/food2.jpg';
import StarIcon from '@mui/icons-material/Star';
import food3 from '../assets/food3.webp';
import hero1 from '../assets/hero1.jpg';
import axios from 'axios';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';



const page = () => {
    const router = useRouter();
    const [getShopData, setGetShopData] = useState([]);
    const [active, setActive] = useState([]);
    const [checkData, setCheckData] = useState(false)
    const skelArr = new Array(4).fill(1);



    const fetchShopApi = async () => {
        try {
            const respData = await axios.get('/api/shop');
            console.log(respData);
            if (respData.data.message == "All Data Fetch") {
                setGetShopData(respData.data.resp);
                setCheckData(false)
            }
            if (respData.data.message == 'Failed To Fetch Data') {
                setCheckData(true)
                alert(respData.data.message)
            }


        } catch (err) {
            console.log(err);
            alert('Error while fetching', err.message);
        }
    }
    useEffect(() => {
        fetchShopApi();
    }, []);

    const checkActiveOrders = async () => {
        // console.log('hello api data ')
        // console.log(JSON.parse(localStorage.getItem('UID')))
        try {
            const res = await axios.get(`/api/placeorder/${JSON.parse(localStorage.getItem('UID'))}`);
            // console.log(res.data.resp)
            setActive(res.data.resp)
        } catch (err) {
            console.log(err)
        }
    }


    // console.log(JSON.parse(localStorage.getItem('UID')))
    useEffect(() => {
        if (localStorage.getItem('UID')) {
            checkActiveOrders();
        }
    }, [])

    const goToMenuPage = (id) => {
        router.push(`/menu/${id}`);

    }

    const popular = getShopData.filter((ele) => { return ele.isPopular == true })
    const nonPopular = getShopData.filter((ele) => { return ele.isPopular == false })
    // console.log('non pop',nonPopular)

    console.log(popular);


    return (
        <>
            <Container disableGutters maxWidth='xl'>
                <Header />
                <Grid container sx={{ bgcolor: '#f5f5f5' }}>
                    <Grid item xs={12} sx={{ border: '1px solid black' }}>
                        <CrouselComp />
                    </Grid>

                    
                           <Grid item xs={12} sx={{display:getShopData.length != 0 && popular.length == 0 ?'none':'block'}} >
                            <Box sx={{ bgcolor: '#212121', p: '10px' }}>
                                <Typography sx={{ textAlign: 'center', fontSize: { lg: '22px', md: '22px', sm: '20px', xs: '17px' }, fontWeight: 'bold', color: 'white' }}>POPULAR SHOPS</Typography>
                            </Box>
                            {/* skeleton  */}

                            {
                                getShopData.length == 0 ?
                                    <Grid container sx={{ justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

                                        {
                                             skelArr.map((ele, index) => {
                                                return <Grid key={index} item lg={2.3} md={3} sm={5} xs={12} component={Paper} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, m: '10px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '210px' }} />
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '75%', height: '20px' }} />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '10%', height: '20px' }} />
                                                        <Skeleton variant="rectangular" sx={{ width: '10%', height: '20px' }} />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '55%', height: '20px' }} />
                                                    </Box>

                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px' }} />
                                                        <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px' }} />
                                                    </Box>

                                                </Grid>
                                            })
                                        }



                                    </Grid> :
                                    <Grid container sx={{ mt: '20px', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', bgcolor:'#f5f5f5' }}>
                                        {
                                            popular.map((ele, index) => {
                                                return (
                                                    <Grid key={index} item lg={2.4} md={3} sm={5} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '10px',cursor:'pointer' }} onClick={() => { goToMenuPage(ele._id) }}>
                                                        <Paper sx={{ borderRadius: '20px ' }} elevation={1}>


                                                            <Box sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, height: '400px', borderRadius: '10px 10px 10px 10px', }}>


                                                                <Box sx={{ position: 'relative', height: '250px', width: { lg: '285px', md: '280px', sm: '280px', xs: '280px' } }}>

                                                                   <Image src={require(`../public/upload/${ele.image}`)} alt='food' objectFit='cover' style={{ width: '100%', borderRadius: '10px 10px 0px 0px', height: '250px' }} />
                                                                </Box>
                                                                <Box>
                                                                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', mt: '5px' }}>{ele.shopName}</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 8px', mt: '0px' }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                                                        <StarIcon fontSize='small' sx={{ color: ele.rating > 4 ? 'green' : ele.rating > 3 ? 'orange' : 'red' }} />



                                                                        {/* <StarIcon fontSize='small' sx={{ color: 'red' }} /> */}
                                                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold', ml: '3px' }}>{ele.rating}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                            <StopCircleOutlinedIcon fontSize='small' sx={{ color: 'green', display: ele.foodType == 'Veg' || ele.foodType == 'Both' ? 'block' : 'none' }} />
                                                                            <StopCircleOutlinedIcon fontSize='small' sx={{ color: 'red', display: ele.foodType == 'Non Veg' || ele.foodType == 'Both' ? 'block' : 'none' }} />
                                                                        </Box>
                                                                    </Box>

                                                                </Box>
                                                                <Box sx={{ p: '0px 10px', mt: '8px' }}>
                                                                    <Typography sx={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>{ele.delivery} minutes</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '8px' }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{ele.foodForCost} for {ele.foodFormany}</Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green' }}>{ele.offPercentage}% Off</Typography>
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                        </Paper>
                                                    </Grid>
                                                )
                                            })
                                        }




                                    </Grid>

                            }
                        </Grid>
                    


                    <Grid item xs={12}   sx={{display:getShopData.length != 0 && nonPopular.length == 0 ?'none':'block',mt: '15px'}}>
                        <Box sx={{ bgcolor: '#212121', p: '10px' }}>

                            <Typography sx={{ textAlign: 'center', fontSize: { lg: '22px', md: '22px', sm: '20px', xs: '17px' }, fontWeight: 'bold', color: 'white' }}>NON POPULAR SHOPS</Typography>
                        </Box>

                        {/* non popular  */}
                        {
                            nonPopular.length == 0 ?
                                <Grid container sx={{ justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

                                    {
                                        skelArr.map((ele, index) => {
                                            return <Grid key={index} item lg={2.3} md={3} sm={5} xs={12} component={Paper} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, m: '10px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '210px' }} />
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '75%', height: '20px' }} />
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '10%', height: '20px' }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '10%', height: '20px' }} />
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '55%', height: '20px' }} />
                                                </Box>

                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px' }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px' }} />
                                                </Box>

                                            </Grid>
                                        })
                                    }



                                </Grid> :
                                <Grid container sx={{ mt: '20px', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px',cursor:'pointer' }}>
                                    {
                                        nonPopular.map((ele, index) => {
                                            // console.log(ele)
                                            return (
                                                <Grid key={index} item lg={2.4} md={3} sm={5} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '10px' }} onClick={() => { goToMenuPage(ele._id) }}>
                                                    <Paper sx={{ borderRadius: '20px ' }} elevation={1}>


                                                        <Box sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, height: '400px', borderRadius: '10px 10px 0px 0px', }}>


                                                            <Box sx={{ position: 'relative', height: '250px', width: { lg: '285px', md: '280px', sm: '280px', xs: '280px' } }}>

                                                                {/* <Image src={hero1} alt='food' objectFit='cover' style={{ width: '100%', borderRadius: '10px 10px 0px 0px', height: '250px' }} /> */}
                                                                <Image src={require(`../public/upload/${ele.image}`)} alt='food' objectFit='cover' style={{ width: '100%', borderRadius: '10px 10px 0px 0px', height: '250px' }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', mt: '5px' }}>{ele.shopName}</Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '5px' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <StarIcon fontSize='small' sx={{ color: 'red' }} />
                                                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>{ele.rating}</Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <StopCircleOutlinedIcon fontSize='small' sx={{ color: 'green', display: ele.foodType == 'Veg' || ele.foodType == 'Both' ? 'block' : 'none' }} />
                                                                        <StopCircleOutlinedIcon fontSize='small' sx={{ color: 'red', display: ele.foodType == 'Non Veg' || ele.foodType == 'Both' ? 'block' : 'none' }} />
                                                                    </Box>
                                                                </Box>

                                                            </Box>
                                                            <Box sx={{ p: '0px 10px', mt: '8px' }}>
                                                                <Typography sx={{ color: 'green', fontSize: '15px', fontWeight: 'bold' }}>{ele.delivery} minutes</Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '8px' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{ele.foodForCost} for {ele.foodFormany}</Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green' }}>{ele.offPercentage}% Off</Typography>
                                                                </Box>

                                                            </Box>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            )
                                        })
                                    }




                                </Grid>
                        }






                    </Grid>

                  {
                    !checkData && <Grid item xs={12} sx={{ mt: '15px' }} >
                        <Box sx={{ bgcolor: '#212121', p: '10px' }}>

                            <Typography sx={{ textAlign: 'center', fontSize: { lg: '22px', md: '22px', sm: '20px', xs: '17px' }, fontWeight: 'bold', color: 'white' }}>All SHOPS</Typography>
                        </Box>

                        {/* all shops  */}

                        {
                            getShopData.length == 0 ?

                                <Grid container sx={{ justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

                                    {
                                        skelArr.map((ele, index) => {
                                            return <Grid key={index} item lg={2.3} md={3} sm={5} xs={12} component={Paper} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, m: '10px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '210px' }} />
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '75%', height: '20px' }} />
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '10%', height: '20px' }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '10%', height: '20px' }} />
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '55%', height: '20px' }} />
                                                </Box>

                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', p: '7px' }}>
                                                    <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px' }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '30%', height: '20px' }} />
                                                </Box>

                                            </Grid>
                                        })
                                    }



                                </Grid> :
                                <Grid container sx={{ mt: '20px', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px',cursor:'pointer' }}>
                                    {
                                        getShopData.map((ele, index) => {
                                            return (
                                                <Grid key={index} item lg={2.4} md={3} sm={5} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '10px' }} onClick={() => { goToMenuPage(ele._id) }} >
                                                    <Paper sx={{ borderRadius: '20px ' }} elevation={1}>


                                                        <Box sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, height: '400px', borderRadius: '10px 10px 0px 0px', }}>


                                                            <Box sx={{ position: 'relative', height: '250px', width: { lg: '285px', md: '280px', sm: '280px', xs: '280px' } }}>

                                                            <Image src={require(`../public/upload/${ele.image}`)} alt='food' objectFit='cover' style={{ width: '100%', borderRadius: '10px 10px 0px 0px', height: '250px' }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', mt: '5px' }}>{ele.shopName}</Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '8px' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <StarIcon fontSize='small' sx={{ color: 'red' }} />
                                                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>{ele.rating}</Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <StopCircleOutlinedIcon fontSize='small' sx={{ color: 'green', display: ele.foodType == 'Veg' || ele.foodType == 'Both' ? 'block' : 'none' }} />
                                                                        <StopCircleOutlinedIcon fontSize='small' sx={{ color: 'red', display: ele.foodType == 'Non Veg' || ele.foodType == 'Both' ? 'block' : 'none' }} />
                                                                    </Box>
                                                                </Box>

                                                            </Box>
                                                            <Box sx={{ p: '0px 10px', mt: '8px' }}>
                                                                <Typography sx={{ color: 'green', fontSize: '15px', fontWeight: 'bold' }}>{ele.delivery} minutes</Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '8px' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{ele.foodForCost} for {ele.foodFormany}</Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green' }}>{ele.offPercentage}% Off</Typography>
                                                                </Box>

                                                            </Box>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            )
                                        })
                                    }

                                </Grid>

                        }



                    </Grid>
                  } 

                </Grid>
                <Footer/>
            </Container>
            {
                active.length == 0 ? ''
                    :
                    <Badge color='primary' component={Paper} elevation={5} sx={{ position: 'fixed', bottom: 40, left: 10, borderRadius: '50%', cursor: 'pointer' }} overlap="circular" onClick={() => { router.push('/myorder') }}>
                        <Box component="span" sx={{ bgcolor: '#f4511e', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' }} >{active.length} Active orders</Box>
                    </Badge>
            }

        </>
    )
}

export default page
