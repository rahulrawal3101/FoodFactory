'use client'
import { Box, Button, Checkbox, FormControl, Grid, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditItemsModal = ({ itemData, setItemData, fetchItemApi }) => {
    // console.log(itemData.details)

    const handleClose = () => {
        setItemData({ ...itemData, open: false })
    }

    const editItemHandler = (e) => {
        const {name,value,checked}=e.target;
        if(e.target.name == 'isAvailable' || e.target.name == 'isPopular'){
            setItemData({...itemData,details:{...itemData.details,[name]:checked}})
        }else{
            setItemData({...itemData,details:{...itemData.details,[name]:value}})
        }

    };

    const updateItemHandler=async()=>{
     try{
        const res = await axios.patch(`/api/editfullitem/${itemData.details._id}`,itemData.details);
        console.log(res);
        if(res.data.message == "Item Updated Successully"){
            setItemData({ ...itemData, open: false })
            fetchItemApi()
        }
        if(res.data.message == "Failed To Update Item"){
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
                open={itemData.open}
                onClose={handleClose}
                disableAutoFocus
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,}}
            >

                <Grid container component={Paper} sx={{ bgcolor: 'white', width: '500px', borderRadius:'10px' ,p:'20px'}} elevation={3}>
                    <Grid item xs={12} sx={{mt:'10px'}}>
                        <Typography sx={{fontSize:'25px', fontWeight:'bold', textAlign:'center'}}>Update Changes</Typography>
                    </Grid>
                <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Name :</Typography>
                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField placeholder='Name..'  sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={editItemHandler} name='name' value={itemData.details.name} />
                        </Grid>

                    </Grid>


                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Mrp :</Typography>
                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField placeholder='Mrp..' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={editItemHandler} name='mrp' value={itemData.details.mrp} />
                        </Grid>

                    </Grid>
                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Srp :</Typography>
                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField placeholder='Srp..' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={editItemHandler} name='srp' value={itemData.details.srp} />
                        </Grid>

                    </Grid>
                    <Grid container sx={{ p: '7px', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Rating :</Typography>
                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                            <TextField placeholder='Rating..' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={editItemHandler} name='rating' value={itemData.details.rating} />
                        </Grid>

                    </Grid>
                    <Grid container sx={{ p: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>FoodType :</Typography>

                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                            <FormControl fullWidth size='small'>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={itemData.details.foodType}
                                    name='foodType'

                                    onChange={editItemHandler}
                                >
                                    <MenuItem value={'Veg'}>Veg</MenuItem>
                                    <MenuItem value={'Non Veg'}>Non Veg</MenuItem>
                                    <MenuItem value={'Both'}>Both</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '17px' }}>isAvailable : <Checkbox name="isAvailable" checked={itemData.details.isAvailable} onChange={editItemHandler} /> </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '17px' }}>isPopular : <Checkbox name="isPopular" checked={itemData.details.isPopular} onChange={editItemHandler} /> </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                        <Button variant='contained' onClick={updateItemHandler}>update Item</Button>

                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}

export default EditItemsModal