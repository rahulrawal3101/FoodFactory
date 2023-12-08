import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';

const AdminPanel = () => {
  return (
    <>
    <Grid container>
        <AppBar position="static" sx={{ borderBottom:'1px solid white', bgcolor:'black'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          
          <Typography sx={{fontSize:{lg:'24px', md:'22px', sm:'19px', xs:'17px'}, fontWeight:'bold'}}>Admin Dashboard</Typography>
          
        </Toolbar>
      </AppBar>
        </Grid>
    </>
  )
}

export default AdminPanel