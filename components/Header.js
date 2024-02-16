'use client'
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useRouter } from 'next/navigation';
import avatar from '../assets/hero2.webp';
import Image from 'next/image';
import adellogo from '../assets/adellogo.png'


const Header = () => {

  const goToAdminDashboard = () => {
    router.push('/admin/admindashboard')
  };

  const homePage = () => {
    router.push('/')
  };
  const profileHanlder = () => {
    router.push(`/profile/${JSON.parse(localStorage.getItem('UID'))}`)
  }
  const router = useRouter();
  return (
    <>

      <Grid container sx={{position:'sticky', top:'0px', zIndex:9999999}}>
        <AppBar position='static' sx={{ bgcolor: 'black' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid container>
              <Grid item lg={3} md={3} sm={2} xs={4}>
                {/* <Typography sx={{ fontSize: { lg: '24px', md: '22px', sm: '19px', xs: '17px' }, fontWeight: 'bold', color: '#43a047' }} onClick={homePage}>AdelsocialFood</Typography> */}
                <Box sx={{width:'90px', height:'48px', borderRadius:'10px'}}>
                  <Image src={adellogo} style={{width:'100%', height:'100%',borderRadius:'10px'}}/>
                </Box>

              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={6} sx={{ display:{ lg:'flex', md:'flex', sm:'none', xs:'none'}, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }} onClick={()=>{router.push('/')}}>Home</Typography>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>About</Typography>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>Contact</Typography>
                
                <Box>

                  <Button variant='contained' color='success' sx={{ fontSize: '15px', p: '4px 13px', mr: '10px' }} onClick={() => { router.push('/login') }}>Login</Button>
                  <Button variant='contained' color='error' sx={{ fontSize: '15px', p: '4px 13px' }} onClick={() => { router.push('/register') }}>SignUp</Button>
                </Box>

              </Grid>
            </Grid>

            <Grid item lg={1} md={1} sm={2} xs={2} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', }}>
            <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }} onClick={goToAdminDashboard}>Services</Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar content='R' alt="Remy Sharp" sx={{ ml: '10px', cursor: 'pointer' }} onClick={profileHanlder}>R</Avatar>
              </Box>
            </Grid>

          </Toolbar>
        </AppBar>
      </Grid>



    </>
  )
}

export default Header