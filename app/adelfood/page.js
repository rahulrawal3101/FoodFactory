import CrouselComp from '@/components/CrouselComp';
import Header from '@/components/Header';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import food1 from '../../assets/food1.png';
import food2 from '../../assets/food2.jpg';
import StarIcon from '@mui/icons-material/Star';
import food3 from '../../assets/food3.webp';

const popData = [
    {
        img: food1,
        title: 'Sabka Food',
        rate: 3.7,
        type: 'Veg',
        time:'Deliveryt in 10 mins',
        persons: '300 for two persons',
        off: '20% Off'
    },
    {
        img: food2,
        title: 'Sabka Food',
        rate: 3.7,
        type: 'Veg',
        time:'Deliveryt in 10 mins',
        persons: '300 for two persons',
        off: '20% Off'
    },
    {
        img: food3,
        title: 'Sabka Food',
        rate: 3.7,
        type: 'Veg',
        time:'Deliveryt in 10 mins',
        persons: '300 for two persons',
        off: '20% Off'
    },
    {
        img: food1,
        title: 'Sabka Food',
        rate: 3.7,
        type: 'Veg',
        time:'Deliveryt in 10 mins',
        persons: '300 for two persons',
        off: '20% Off'
    },
]

const page = () => {
    return (
        <>
            <Header />
            <Grid container>
                <Grid item xs={12} sx={{ border: '1px solid black' }}>
                    <CrouselComp />
                </Grid>
                <Grid item xs={12} sx={{mt:'15px'}} >
                    <Typography sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>POPULAR SHOPS</Typography>
                    <Grid container sx={{ mt: '20px', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', display: 'flex' }}>
                        {
                            popData.map((ele) => {
                                return (
                                    <Grid item xs={2.5} sx={{ height: '400px',bgcolor:'#eeeeee ' , borderRadius:'20px 20px 0px 0px'}}>
                                        <Box sx={{ position: 'relative', height: '250px', }}>

                                            <Image src={ele.img} alt='food' fill objectFit='cover' style={{borderRadius:'20px 20px 0px 0px'}}/>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', mt:'10px' }}>{ele.title}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '8px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <StarIcon fontSize='small' sx={{ color: 'red' }} />
                                                <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>{ele.rate}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{ele.type}</Typography>
                                            </Box>

                                        </Box>
                                        <Box sx={{ p: '0px 10px', mt: '8px' }}>
                                            <Typography sx={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>{ele.time}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt:'8px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{ele.persons}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{ele.off}</Typography>
                                            </Box>

                                        </Box>
                                    </Grid>
                                )
                            })
                        }

                 


                    </Grid>



                </Grid>
                <Grid item xs={12} sx={{ mt: '20px' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>All SHOPS</Typography>
                    <Grid container sx={{ mt: '20px', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', display: 'flex' }}>
                        {
                            popData.map((ele) => {
                                return (
                                    <Grid item xs={2.5} sx={{  height: '400px',borderRadius:'7px' ,bgcolor:'#e0e0e0',borderRadius:'20px 20px 0px 0px'}}>
                                        <Box sx={{ position: 'relative', height: '250px', }}>

                                            <Image src={ele.img} alt='food' fill objectFit='cover'style={{borderRadius:'20px 20px 0px 0px'}} />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{ele.title}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt: '10px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <StarIcon fontSize='small' sx={{ color: 'red' }} />
                                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{ele.rate}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{ele.type}</Typography>
                                            </Box>

                                        </Box>
                                        <Box sx={{ p: '0px 10px', mt: '10px' }}>
                                            <Typography sx={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>{ele.time}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0px 10px', mt:'15px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{ele.persons}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{ele.off}</Typography>
                                            </Box>

                                        </Box>
                                    </Grid>
                                )
                            })
                        }

                 


                    </Grid>



                </Grid>
            </Grid>
        </>
    )
}

export default page