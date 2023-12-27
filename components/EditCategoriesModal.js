'use client'
import { Box, Button, Checkbox, Grid, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditCategoriesModal = ({ catDetails, setCatDetails,fetchCatApi }) => {
    console.log(catDetails.details.name);

    const handleClose = () => {
        setCatDetails({ ...catDetails, open: false })
    }

    const handleCollect = (e) => {
        // console.log(e.target.name)
        const { name, checked,value } = e.target;
        if(e.target.name == 'isAvailable'){
        setCatDetails({...catDetails,details:{...catDetails.details,[name]:checked}})
        }else{
          
            setCatDetails({...catDetails,details:{...catDetails.details,[name]:value}})
        }


    };


    const updateCatHandler=async()=>{
        try{
            const res = await axios.patch(`/api/editfullcategories/${catDetails.details._id}`,catDetails.details)
            console.log(res);
            if(res.data.message == "Category Updated Successfully"){
                setCatDetails({ ...catDetails, open: false })
                fetchCatApi()
            }
            if(res.data.message == 'Failed To Update Category'){
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
                open={catDetails.open}
                onClose={handleClose}
                disableAutoFocus
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Grid container sx={{ width: '450px', bgcolor: 'white', p: '10px', borderRadius: '17px' }}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Edit Category</Typography>
                    </Grid>
                    <Grid item xs={12} id="modal-modal-title" variant="h6" component="h2">
                        <Typography sx={{ fontSize: '17px' }}>Categort Name</Typography>
                        <TextField fullWidth size='small' sx={{ mt: "10px" }} name='name' onChange={handleCollect} value={catDetails.details.name} />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '17px' }}>isAvailable : <Checkbox name="isAvailable" checked={catDetails.details.isAvailable} onChange={handleCollect} /> </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: 'center', mt: '10px' }}>
                        <Button variant='contained' sx={{ fontSize: '13px' }} onClick={updateCatHandler}>Update Category</Button>
                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}

export default EditCategoriesModal