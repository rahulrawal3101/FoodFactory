'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const AddNewItem = () => {
    const param = useParams();
    const router = useRouter();
    const [addItem, setAdditem] = useState({
        name: '',
        cid: param.cid,
        mid: param.mid,
        mrp: '',
        srp: '',
        foodType: '',
        image:''
    });

    const addNewItemHandler = (e) => {
        if(e.target.name == 'image'){
            const {name,files}=e.target;
            setAdditem({...addItem,image:files[0]})
        }else{
            const { name, value } = e.target;
            setAdditem({ ...addItem, [name]: value })
        }


    };

    const AddItemHandler = async () => {
        if (addItem.name && addItem.mrp && addItem.srp && addItem.foodType) {
            const formData = new FormData;
            formData.append('name',addItem.name);
            formData.append('cid',addItem.cid);
            formData.append('mid',addItem.mid);
            formData.append('mrp',addItem.mrp);
            formData.append('srp',addItem.srp);
            formData.append('foodType',addItem.foodType);
            formData.append('image',addItem.image)
            try {
                const res = await axios.post(`/api/item/${param.cid}`, formData);
                // console.log(res);
                if (res.status == 200) {
                    router.back()
                }
            } catch (err) {
                console.log(err);
                alert(err.message)

            }
        } else {
            alert('Fill The Required Feilds');
        }

    }
    // console.log(param)
    return (
        <>
            <Grid container>
                <AdminPanel />
                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>Add New Item</Typography>

                </Grid>


                <Grid container sx={{ p: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Name :</Typography>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Name..' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={addNewItemHandler} name='name' value={addItem.name} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Image :</Typography>

                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} >
                        {/* <Box sx={{ height: "30px", width: "100%", border: '1px solid black', }}>
                            <Typography sx={{ position: "relative", top: "0px", mt: "4px", textAlign: 'center' }}>
                                <input type='file' style={{ zIndex: 99, opacity: 0, position: "absolute", left: "0px", top: "0px", height: "30px", width: "100%" }} />
                                Choose Image
                            </Typography>
                        </Box> */}
                        <Box sx={{ border: '1px solid black', p: '5px' }}>

                            <input type='file' onChange={addNewItemHandler} name='image' />

                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ p: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Mrp :</Typography>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Mrp..' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={addNewItemHandler} name='mrp' value={addItem.mrp} />
                    </Grid>

                </Grid>
                <Grid container sx={{ p: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={3} md={3} sm={12} xs={12} >
                        <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Srp :</Typography>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                        <TextField placeholder='Srp..' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={addNewItemHandler} name='srp' value={addItem.srp} />
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
                                value={addItem.foodType}
                                name='foodType'

                                onChange={addNewItemHandler}
                            >
                                <MenuItem value={'Veg'}>Veg</MenuItem>
                                <MenuItem value={'Non Veg'}>Non Veg</MenuItem>
                                <MenuItem value={'Both'}>Both</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                    <Button variant='contained' onClick={AddItemHandler} >Add item</Button>

                </Grid>
            </Grid>

        </>
    )
}

export default AddNewItem