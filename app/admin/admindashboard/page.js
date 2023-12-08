'use client'
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Grid, Typography } from '@mui/material';
import AdminPanel from '@/components/AdminPanel';


  const dashbaordalist = [
    {
      list: 'All Users',
      route:'allusers',
    },
    {
      list: 'All Shops',
      route:'allshops',
    },
    {
      list: 'All Categories',
      route:'allshops',
    },
    {
      list: 'All items',
      route:'allshops',
    },
    {
      list: 'All Address',
      route:'alladdress',
    },
    {
      list: 'Active Orders',
      route:'allactiveorders',
    },
    {
      list: 'All past Orders',
      route:'allshops',
    },
   
  
  ]

const AdminDashboard = () => {
   const router = useRouter();
    const categoriesHandler=(e)=>{
      console.log(e)
        if(e == 'allshops'){
            router.push('/admin/allshops')
        }
        if(e == 'allusers'){
          router.push('/admin/allusers')
        }
        if(e == 'alladdress'){
          router.push('/admin/alladdress')
        }if(e == 'allactiveorders'){
          router.push('/admin/allactiveorders')
        }
    }


  return (
    <>
    <AdminPanel/>
    <Grid container sx={{bgcolor:'#eeeeee'}}>
    <Grid item xs={12} sx={{  bgcolor: 'black', p:'10px' }}>
      <Typography sx={{ fontSize:{ lg:'25px', md:'22px', sm:'20px', xs:'20px'}, textAlign: 'center', color: '#2196f3', fontWeight:'800' }}>Admin Dashboard</Typography>

    </Grid>
    <Grid container sx={{justifyContent:'space-evenly', alignItems:'center'}}>
      {
        dashbaordalist.map((ele, index)=>{
          return(
            <Grid key={index} item lg={2.8} md={3} sm={5} xs={10}sx={{ m:'10px 8px',height: '200px',bgcolor:'black', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor:'pointer',color:'white', '&:hover':{color:'#2196f3', border:'3px solid #2196f3'} }} onClick={()=>{categoriesHandler(ele.route)}}>
            <Typography sx={{fontSize:{lg:'25px', md:'22px', sm:'20px', xs:'18px'} }}>{ele.list}</Typography>
          </Grid>
          )
        })
      }
    
    </Grid>
  </Grid>
  </>
  )
}

export default AdminDashboard