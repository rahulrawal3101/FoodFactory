'use client'
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const MyOrders = () => {
  const [unActive, setUnActive] = useState([]);
  const skelArr = new Array(4).fill(1);

  const checkActiveOrders = async () => {
    // console.log('hello api data ')
    console.log(JSON.parse(localStorage.getItem('UID')))
    try {
      const res = await axios.get(`/api/pastorder/${JSON.parse(localStorage.getItem('UID'))}`);
      // console.log(res.data.resp)
      setUnActive(res.data.resp)
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    checkActiveOrders();
  }, [])
  console.log(unActive.length)

  return (
    <>
      <Grid container >
        <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px', }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Past Orders</Typography>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: '#212121' }}>
          <Grid item xs={12} >
            <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px', color: 'white', fontWeight: 'bold' } }}>{unActive.length} Past Orders</Typography>

          </Grid>

        </Grid>
        {/* Skeleton */}

{
  unActive.length == 0 ?
<Grid container sx={{ mt: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

{
  skelArr.map((ele, index) => {
    return <Grid key={index} item lg={7} md={8} sm={10} xs={12} sx={{ m: '10px' }}>
      <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px' }} />
    </Grid>
  })
}
</Grid>:
 <Grid container sx={{ mt: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
 {
   unActive.map((ele) => {
     console.log(ele.items)
     return (
       <Grid item lg={7} md={8} sm={10} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '10px' }}>
         <Accordion sx={{ width: '100%' }}>
           <AccordionSummary
             sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
             <Typography sx={{ width: '80%', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>Order ID :#{ele._id}</Typography>
             <Typography sx={{ width: '20%', textAlign: 'right', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>{ele.toPay} Rs</Typography>
           </AccordionSummary>
           <AccordionDetails sx={{ p: '10px', }}>
             <Grid container sx={{ borderBottom: '1px solid lightgrey', p: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Grid item xs={4}>
                 <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>Delivery Charges</Typography>
               </Grid>
               <Grid item xs={4}>
                 <Typography sx={{ fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' }, textAlign: 'right' }}>{ele.delchrg} Rs</Typography>
               </Grid>
             </Grid>

             <Grid container sx={{ borderBottom: '1px solid lightgrey', p: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Grid item xs={4}>
                 <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>Tax (9%)</Typography>
               </Grid>
               <Grid item xs={4}>
                 <Typography sx={{ fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' }, textAlign: 'right' }}>{ele.tax} Rs</Typography>
               </Grid>
             </Grid>

             <Grid container sx={{ borderBottom: '1px solid lightgrey', p: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Grid item xs={4}>
                 <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>Discount</Typography>
               </Grid>
               <Grid item xs={4}>
                 <Typography sx={{ fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' }, textAlign: 'right' }}>-{ele.discount} Rs</Typography>
               </Grid>
             </Grid>

             <Grid container sx={{ mt: '40px', p: '10px' }}>
               <Grid item xs={12}>
                 <Typography sx={{ fontSize: { lg: '17px', md: '17px', sm: '17px', xs: '15px' }, fontWeight: 'bold' }}>Ordered Items</Typography>
               </Grid>
             </Grid>
             {
               ele.items.map((ele) => {
                 console.log(ele)
                 return <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
                   <Grid item xs={5.5}  >
                     <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' }, fontWeight: 'bold' }}>{ele[0].name} x {ele[0].qty}</Typography>
                     <Typography sx={{ fontSize: { lg: '14px', md: '13px', sm: '12px', xs: '9px' }, fontWeight: 'bold', color: '#bdbdbd' }}>{ele[0].srp} x {ele[0].qty}</Typography>

                   </Grid>

                   <Grid item xs={3} sx={{ textAlign: 'right' }}>
                     <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' }, fontWeight: 'bold', color: '#616161' }}>{ele[0].srp * ele[0].qty} Rs</Typography>

                   </Grid>
                 </Grid>


               })
             }

           </AccordionDetails>
         </Accordion>
       </Grid>
     )
   })
 }

</Grid>
}
        

       
      </Grid>
    </>
  )
}

export default MyOrders