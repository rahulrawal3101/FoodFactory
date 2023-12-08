'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddNewCategory = () => {
  const param = useParams();
  const router = useRouter();

  const [getCatDetails, setGetCatDetails] = useState({
    name: '',
    mid: param.mid,
  });
  const catHandler = (e) => {
    const { name, value } = e.target;
    setGetCatDetails({ ...getCatDetails, [name]: value })

  };
  const createHandler = async () => {
    if (getCatDetails.name) {
      try {
        const res = await axios.post(`/api/category/${param.mid}`, getCatDetails);
        console.log(res);
        if (res.status == 201) {
          router.back()
        }


      } catch (err) {
        console.log(err);
        alert(err.message)


      };
    } else {
      alert('Fill The Category Name')
    }


  }
  // console.log(getCatDetails)
  return (
    <>
      <Grid container >
        <AdminPanel />
        <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
          <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>Add Category</Typography>

        </Grid>
        <Grid container sx={{ p: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item lg={2} md={3} sm={12} xs={12} >
            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Name :</Typography>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} sx={{ color: 'red' }}>
            <TextField placeholder='Name..' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={catHandler} name='name' value={getCatDetails.name} />
          </Grid>

        </Grid>
        <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item lg={2} md={3} sm={12} xs={12}>
            <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Image :</Typography>

          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} >
            <Box sx={{ height: "30px", width: "100%", border: '1px solid black', }}>
              <Typography sx={{ position: "relative", top: "0px", mt: "4px", textAlign: 'center' }}>
                <input type='file' style={{ zIndex: 99, opacity: 0, position: "absolute", left: "0px", top: "0px", height: "30px", width: "100%" }} />
                Choose Image
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
          <Button variant='contained' onClick={createHandler}>Create Category</Button>

        </Grid>

      </Grid>
    </>
  )
}

export default AddNewCategory