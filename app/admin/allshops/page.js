'use client'
import AdminPanel from '@/components/AdminPanel';
import { Button, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';




const AllShops = () => {
    const router = useRouter();
    const [getShopData, setGetShopData] = useState([])
    const addnewShopHandler = () => {
        router.push('/admin/addnewshop')

    }

    const goToCategoriesHandler = (id) => {
        router.push(`/admin/allcategories/${id}`)
    }
    const fetchShopApi = async () => {
        try {
            const getShopData = await axios.get('/api/shop');
            setGetShopData(getShopData.data.resp)

        } catch (err) {
            console.log(err);
            alert('Error while fetching', err.message)
        }
    }
    useEffect(() => {
        fetchShopApi();
    }, []);

    console.log(getShopData)
    return (
        <>
            <Grid container>
                <AdminPanel />

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>All Shops</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} onClick={addnewShopHandler} >Add new shop</Button>

                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ bgcolor: 'grey' }}>
                                    <TableRow >
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >ShopName</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Mobile</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>isActive</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Wallet</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >

                                    {
                                        getShopData.map((ele, index) => {
                                            return (
                                                <TableRow key={index} >
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>{index + 1}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', }} onClick={()=>{goToCategoriesHandler(ele._id)}}>{ele.shopName}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>{ele.mobileShop}  </TableCell>
                                                    <TableCell align="center" ><Checkbox checked={ele.isShopOpen} /></TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>Rs {ele.walletBal}</TableCell>
                                                    <TableCell align="center" >
                                                        <Button variant='contained' color='success' sx={{ fontSize: '10px',m:'2px'  }} >Edit</Button>
                                                        <Button variant='contained' color='error' sx={{ fontSize: '10px',m:'2px' }} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>

                                            )
                                        })
                                    }


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>


            </Grid>
        </>
    )
}

export default AllShops