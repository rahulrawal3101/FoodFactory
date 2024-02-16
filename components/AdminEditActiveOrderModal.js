'use client'
import { Button, Checkbox, FormControl, Grid, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';



const AdminEditActiveOrderModal = ({ updateActiveOrders, setUpdateActiveOrders, fetchAllAddressApi }) => {
    // console.log(updateActiveOrders.details._id)
 
    const [ordStatusChange, setOrdStatusChange] = useState([])
    const handleClose = () => {
        setUpdateActiveOrders({ ...updateActiveOrders, open: false })
    };

    const EditActiveOrderHandler = (e) => {
        const { name, value } = e.target;
        setUpdateActiveOrders({ ...updateActiveOrders,details:{...updateActiveOrders.details,[name]:value} })

    };

    const fetchOrderStatus = async () => {
        try {
            const body = await axios.get('/api/changeorderstatus');
            // console.log(body);
            setOrdStatusChange(body.data.resp);
            
        } catch (err) {
            console.log(err.message)
        }
    };

    useEffect(() => {
        fetchOrderStatus();
    }, []);

    const updateItemHandler =async () => {
        try{
            const res = await axios.patch(`/api/activeorderupdate/${updateActiveOrders.details._id}`,updateActiveOrders.details)
            // console.log('res data',res);
            if(res.data.message == "Active Order Update Successfully"){
                setUpdateActiveOrders({ ...updateActiveOrders, open: false })
                fetchAllAddressApi();
            }
            if(res.data.message == 'Failed To Update Active Orders'){
                alert(res.data.message)
            }

        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }
    return (
        <>
            <Modal
                open={updateActiveOrders.open}
                onClose={handleClose}
                disableAutoFocus
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
            >

                <Grid container component={Paper} sx={{ bgcolor: 'white', width: '500px', borderRadius: '10px', p: '20px' }} elevation={3}>
                    <Grid item xs={12} sx={{ mt: '10px' }}>
                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>Update Active Orders</Typography>
                    </Grid>
                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Delivery Charger:</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={EditActiveOrderHandler} name='delchrg' value={updateActiveOrders.details.delchrg} />
                        </Grid>

                    </Grid>


                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Discount :</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField  type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={EditActiveOrderHandler} name='discount' value={updateActiveOrders.details.discount} />
                        </Grid>

                    </Grid>
                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>subTotal :</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField  type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={EditActiveOrderHandler} name='subTotal' value={updateActiveOrders.details.subTotal} />
                        </Grid>

                    </Grid>
                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Tax :</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField  type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={EditActiveOrderHandler} name='tax' value={updateActiveOrders.details.tax} />
                        </Grid>

                    </Grid>

                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>ToPay :</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField  type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={EditActiveOrderHandler} name='toPay' value={updateActiveOrders.details.toPay} />
                        </Grid>

                    </Grid>
                    <Grid container sx={{ p: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={4} md={4} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>OrderStatus :</Typography>

                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ color: 'red' }}>
                            <FormControl fullWidth size='small'>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={updateActiveOrders.details.orderStatus}
                                    name='orderStatus'

                                    onChange={EditActiveOrderHandler}
                                >
                                    {
                                        ordStatusChange.map((ele, index) => {
                                            return (
                                                <MenuItem key={index} value={ele}>{ele}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '17px' }}>isAvailable : <Checkbox name="isAvailable" checked={itemData.details.isAvailable} onChange={editItemHandler} /> </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '17px' }}>isPopular : <Checkbox name="isPopular" checked={itemData.details.isPopular} onChange={editItemHandler} /> </Typography>
                    </Grid> */}

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                        <Button variant='contained' onClick={updateItemHandler}>update Active Order</Button>

                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}

export default AdminEditActiveOrderModal