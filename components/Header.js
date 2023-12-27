'use client'
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useRouter } from 'next/navigation';
import avatar from '../assets/hero2.webp'

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

      <Grid container>
        <AppBar position="static" sx={{ bgcolor: 'black' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid container>
              <Grid item lg={3}>
                <Typography sx={{ fontSize: { lg: '24px', md: '22px', sm: '19px', xs: '17px' }, fontWeight: 'bold', color: '#43a047' }} onClick={homePage}>AdelsocialFood</Typography>

              </Grid>
              <Grid item lg={8} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>Home</Typography>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>About</Typography>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>Contact</Typography>
                <Typography sx={{ fontSize: { lg: '15px', md: '14px', sm: '13px', xs: '13px' }, cursor: 'pointer', fontWeight: 'bold', color: 'white' }} onClick={goToAdminDashboard}>Services</Typography>
                <Box>

                  <Button variant='contained' color='success' sx={{ fontSize: '15px', p: '4px 13px', mr: '10px' }} onClick={() => { router.push('/login') }}>Login</Button>
                  <Button variant='contained' color='error' sx={{ fontSize: '15px', p: '4px 13px' }} onClick={() => { router.push('/register') }}>SignUp</Button>
                </Box>

              </Grid>
            </Grid>

            <Grid item lg={1} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', }}>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar content='R' alt="Remy Sharp" sx={{ ml: '10px', cursor: 'pointer' }} onClick={profileHanlder} />
              </Box>
            </Grid>

          </Toolbar>
        </AppBar>
      </Grid>



    </>
  )
}

export default Header