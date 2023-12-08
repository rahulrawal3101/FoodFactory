'use client'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';
import bakery from '../assets/bakery.png';
import beverage from '../assets/beverage.png';
import burger0 from '../assets/burger0.png';
import chicken from '../assets/chicken.png';
import seafood from '../assets/seafood.png';
import Image from 'next/image';
import '../stylecss/style.css';

const catArr = [
    {
        logo: bakery,
        name: 'Bakery'
    },
    {
        logo: beverage,
        name: 'Beverage'
    },
    {
        logo: burger0,
        name: 'Burger'
    },
    {
        logo: chicken,
        name: 'Chicken'
    },
    {
        logo: seafood,
        name: 'Seafood'
    },
    {
        logo: bakery,
        name: 'Bakery'
    },
    {
        logo: beverage,
        name: 'Bakery'
    },
    {
        logo: burger0,
        name: 'Bakery'
    },
    {
        logo: chicken,
        name: 'Bakery'
    },
    {
        logo: seafood,
        name: 'Bakery'
    },
    {
        logo: bakery,
        name: 'Bakery'
    },
    {
        logo: beverage,
        name: 'Bakery'
    },
    {
        logo: burger0,
        name: 'Bakery'
    },
    {
        logo: chicken,
        name: 'Bakery'
    },
    {
        logo: seafood,
        name: 'Bakery'
    },
    {
        logo: bakery,
        name: 'Bakery'
    },
    {
        logo: beverage,
        name: 'Bakery'
    },
    {
        logo: burger0,
        name: 'Bakery'
    },
    {
        logo: chicken,
        name: 'Bakery'
    },
    {
        logo: seafood,
        name: 'Bakery'
    },
    {
        logo: bakery,
        name: 'Bakery'
    },
    {
        logo: beverage,
        name: 'Bakery'
    },
    {
        logo: burger0,
        name: 'Bakery'
    },
    {
        logo: chicken,
        name: 'Bakery'
    },
    {
        logo: seafood,
        name: 'Bakery'
    },

];


const Categories = ({ category }) => {
    // console.log(category)
    const skelArr = new Array(6).fill(1)
    // console.log(category)
    return (
        <Grid container sx={{ p: '0px 12px', overflow: 'hidden' }}>
            <Grid item xs={12}>
                <Typography sx={{ fontWeight: '800', fontSize: { lg: '22px', md: '20px', sm: '18px', xs: '15px' } }}>Category</Typography>
            </Grid>

            {/* skeleton  */}

            {category == ''?
             <Grid container sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

             {
                 skelArr.map((ele, index) => {
                     return <Grid item lg={1.4} md={1.4} sm={2} xs={4} component={Paper} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, m: '10px' }}>
                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '5px', p: '5px' }}>
                             <Skeleton variant="circular" width={50} height={50} />
                         </Box>

                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '5px', p: '5px' }}>
                             <Skeleton variant="rectangular" sx={{ width: '45%', height: '10px' }} />
                         </Box>
                     </Grid>
                 })
             }
         </Grid> :

<Box className='hideScroll' sx={{ display: 'flex', overflowX: 'scroll', height: { lg: '150px', md: '150px', sm: '140px', xs: '140px' } }} >
{
    category.map((ele, index) => {
        return (
            <Box key={index} sx={{ mr: '10px', }} >
                <Paper sx={{ width: { lg: '100px', md: '100px', sm: '95px', xs: '90px' }, mt: '20px', pt: '5px', borderRadius: '10px' }}>
                    <Box sx={{ height: { lg: '70px', md: '70px', sm: '60px', xs: '54px' }, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: { lg: '100%', md: '100%', sm: '99%', xs: '99%' } }}>
                        <Image src={burger0} alt='bakery' objectFit='cober' style={{ width: '75px', height: '90%' }} />

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: '10px' }}>
                        <Typography sx={{ color: 'grey', fontSize: '15px' }}>{ele.name}</Typography>
                    </Box>
                </Paper>
            </Box>
        )
    })
}

</Box>
        }
           



           




        </Grid>
    )
};

export default Categories