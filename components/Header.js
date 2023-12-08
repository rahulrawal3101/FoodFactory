'use client'
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useRouter } from 'next/navigation';
import avatar from '../assets/hero2.webp'

const Header = () => {

  const goToAdminDashboard=()=>{
    router.push('/admin/admindashboard')
  };

  const homePage=()=>{
    router.push('/')
  };
  const profileHnalder=()=>{
    router.push(`/profile/${JSON.parse(localStorage.getItem('UID'))}`)
  }
  const router = useRouter();
  return (
    <>
    
        <Grid container>
        <AppBar position="static" sx={{bgcolor:'black'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          
          <Typography sx={{fontSize:{lg:'24px', md:'22px', sm:'19px', xs:'17px'}, fontWeight:'bold'}} onClick={homePage}>AdelsocialFood</Typography>
          <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography sx={{fontSize:{lg:'20px', md:'18px', sm:'17px', xs:'15px'}, cursor:'pointer', fontWeight:'bold'}} onClick={goToAdminDashboard}>Services</Typography>
          <Avatar alt="Remy Sharp" src={avatar} sx={{ml:'10px',cursor:'pointer'}} onClick={profileHnalder}/>
          </Box>
        </Toolbar>
      </AppBar>
        </Grid>
    
    </>
  )
}

export default Header