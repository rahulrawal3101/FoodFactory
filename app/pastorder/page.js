'use client'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Image from 'next/image';
import gif1 from '../../assets/gif1.gif'

const MyOrders = () => {
  const [unActive, setUnActive] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const skelArr = new Array(4).fill(1);

  const checkActiveOrders = async () => {
    // console.log('hello api data ')
    console.log(JSON.parse(localStorage.getItem('UID')))
    try {
      const res = await axios.get(`/api/pastorder/${JSON.parse(localStorage.getItem('UID'))}`);
      console.log(res);
      if (res.data.message == 'Data Fetch Successfully') {
        setUnActive(res.data.resp);
        setCheckData(false);
      }
      if (res.data.message == 'Failed To Fetch Data') {
        setCheckData(true);
      }

    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    checkActiveOrders();
  }, [])
  // console.log(unActive.length)

  return (
    <>
      <Grid container sx={{ overflow: 'hidden' }}>
        <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px', }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Past Orders</Typography>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', bgcolor: '#212121' }}>
          <Grid item xs={12} >
            <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px', color: 'white', fontWeight: 'bold' } }}>{unActive.length} Past Orders</Typography>

          </Grid>

        </Grid>

        {
          checkData ?
            <Grid container sx={{ mt: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <Grid item lg={7} md={8} sm={10} xs={12} sx={{ p: '20px', mt: '100px' }}>
                <Box sx={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <Image src={gif1} alt='gif' objectFit='cover' style={{ width: '50%', height: '50%' }} />
                </Box>


              </Grid>
            </Grid>
            :

            <Grid container>

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
                  </Grid> :
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
                                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>Order ID :<span style={{ fontSize: '13px' }}>#{ele._id}</span></Typography>
                                <Typography sx={{ width: '30%', fontSize: { lg: '14px', md: '14px', sm: '12px', xs: '12px' }, fontWeight: 'bold' }}>Status :<span style={{ color: 'green' }}>{ele.orderStatus}</span> </Typography>
                                <Typography sx={{ width: '20%', textAlign: 'right', fontWeight: 'bold', fontSize: { lg: '15px', md: '14px', sm: '12px', xs: '12px' } }}>{ele.toPay} Rs</Typography>

                              </AccordionSummary>
                              <AccordionDetails sx={{ p: '10px', }}>
                                <Grid container sx={{ borderBottom: '1px solid lightgrey', p: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Grid item xs={12} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold' }}>Payment Mode : <span style={{ color: 'green' }}>{ele.payment}</span></Typography>
                                  </Grid>
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
                                    // console.log(ele)
                                    return <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px', }}>
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


                                <Grid container sx={{ borderTop: '1px solid lightgrey' }}>

                                  <Grid item xs={12} sx={{ mt: '10px' }}>
                                    <Typography sx={{ fontSize: '19px', textAlign: 'center', fontWeight: 'bold' }}>Delivery Address</Typography>
                                  </Grid>

                                  <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Reciever Name :</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography sx={{ textAlign: 'center' }}>{ele.addres.recieverName}</Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Land Mark :</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography sx={{ textAlign: 'center' }}>{ele.addres.landMark}</Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>State :</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography sx={{ textAlign: 'center' }}>{ele.addres.state}</Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>PinCode :</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography sx={{ textAlign: 'center' }}>{ele.addres.pinCode}</Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Country :</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography sx={{ textAlign: 'center' }}>{ele.addres.country}l</Typography>
                                    </Grid>
                                  </Grid>


                                </Grid>



                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        )
                      })
                    }
                  </Grid>



              }
            </Grid>

        }






        {/* Skeleton */}





      </Grid>
    </>
  )
}

export default MyOrders