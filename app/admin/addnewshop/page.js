'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AddNewShop = () => {
    const router = useRouter();
    
    const [age, setAge] = useState('');
    const [getData, setGetData] = useState([])
    const [sendData, setSendData] = useState({
        shopName: '',
        foodType: '',
        offPercentage: '',
        foodFormany: '',
        foodForCost: '',
        delivery: '',
        mobileShop: '',
        emailShop: '',
        shopAddress: ''


    })

    const shopDetailsHandler = (e) => {
        const { name, value } = e.target;
        setSendData({ ...sendData, [name]: value });

    };


    const SubmitHandler = async () => {
        if (sendData.shopName && sendData.foodType && sendData.delivery && sendData.offPercentage && sendData.foodForCost && sendData.foodFormany && sendData.mobileShop && sendData.emailShop && sendData.shopAddress) {
            try {
                const res = await axios.post('/api/shop', sendData);
                // console.log(res);
                if(res.status == 201){
                    router.push('/admin/allshops')
                }
            } catch (err) {
                console.log(err.message);
                alert(err.message);

            }
        } else {
            alert('fill the required fields');
        }
        

    }


    // console.log(sendData)
    console.log(getData)
    return (
        <>
            <Grid container>
                <AdminPanel />
                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>Add New Shops</Typography>

                </Grid>


                <Grid container sx={{ p: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>ShopName :</Typography>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='ShopName.......' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='shopName' value={sendData.shopName} />
                    </Grid>

                </Grid>


                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>FoodType :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <FormControl fullWidth size='small'>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sendData.foodType}
                                name='foodType'

                                onChange={shopDetailsHandler}
                            >
                                <MenuItem value={'Veg'}>Veg</MenuItem>
                                <MenuItem value={'Non Veg'}>Non Veg</MenuItem>
                                <MenuItem value={'Both'}>Both</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Image :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} >
                        <Box sx={{ height: "30px", width: "100%", border: '1px solid black', }}>
                            <Typography sx={{ position: "relative", top: "0px", mt: "4px", textAlign: 'center' }}>
                                <input type='file' style={{ zIndex: 99, opacity: 0, position: "absolute", left: "0px", top: "0px", height: "30px", width: "100%" }} />
                                Choose Image
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Rating :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='rating...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Offer Discount :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Offer...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='offPercentage' value={sendData.offPercentage} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Food For Cost :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Food for cost...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='foodForCost' value={sendData.foodForCost} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Food For Many :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Food for mnay...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='foodFormany' value={sendData.foodFormany} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Delivery In :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Delivery in ...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='delivery' value={sendData.delivery} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Mobile Shop :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='mobileShop ' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='mobileShop' value={sendData.mobileShop} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Email Shop :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Email ...' type='email' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='emailShop' value={sendData.emailShop} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Shop Address :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Address ...' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='shopAddress' value={sendData.shopAddress} />
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                        <Button variant='contained' onClick={SubmitHandler}>Submit</Button>

                    </Grid>

                </Grid>
            </Grid>

        </>
    )
}

export default AddNewShop