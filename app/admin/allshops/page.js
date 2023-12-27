'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import gif1 from '../../../assets/gif1.gif';




const AllShops = () => {
    const router = useRouter();
    const [getShopData, setGetShopData] = useState([]);
    const skelArr = new Array(6).fill(1);
    const [checkData, setCheckData] = useState(false);
    const [hidebtn, setHideBtn] = useState('');
    const addnewShopHandler = () => {
        router.push('/admin/addnewshop')

    }

    const goToCategoriesHandler = (id) => {
        router.push(`/admin/allcategories/${id}`)
    }
    const fetchShopApi = async () => {
        try {
            const getShopData = await axios.get('/api/shop');
            // console.log(getShopData);
            if (getShopData.data.message == "All Data Fetch") {
                setGetShopData(getShopData.data.resp);
                setCheckData(false);
            }
            if (getShopData.data.message == 'Failed To Fetch Data') {
                setCheckData(true);
            }


        } catch (err) {
            console.log(err);
            alert('Error while fetching', err.message)
        }
    }
    useEffect(() => {
        fetchShopApi();
    }, []);


    const shopOpenHandler = async (e, id) => {
        // console.log(e.target.checked);
        // console.log(id);
        setHideBtn(id)
        try {
            const res = await axios.patch(`/api/userisshopopencontrol/${id}`, { isShopOpen: e.target.checked });
            // console.log(res);
            if(res.data.message == "Shop Update Successfully"){
                fetchShopApi();
                setHideBtn('')
            }
            if(res.data.message == 'Failed To Update Shop'){
                alert(res.data.message);
                setHideBtn('')
            }

        } catch (err) {
            console.log(err);
            alert(err.message);
        }

    };

    const editShopHandler=(id)=>{
        router.push(`/admin/editallshops/${id}`);
    };

    // const deleteShopHandler=async(id)=>{
    //     console.log('delete id ',id);
    //     try{
    //         const deleteshop = await axios.delete(`/api/testing/${id}`);
    //         console.log(deleteshop);
    //         if(deleteshop.data.message == "Shop Delete Successfully"){
    //             alert(deleteshop.data.message);
    //             fetchShopApi();
    //         }
    //         if(deleteshop.data.message =='Something Wrong With Mid' ){
    //             alert(deleteshop.data.message);
    //             fetchShopApi(); 
    //         }
    //     }catch(err){
    //         console.log(err);
    //         alert(err.message)
    //     }
    // }


    const deleteShopHandler=async(id)=>{
        console.log('delete id ',id);
        try{
            const deleteshop = await axios.delete(`/api/deleteshop/${id}`);
            console.log(deleteshop);
            if(deleteshop.data.message == "Shop Delete Successfully"){
                alert(deleteshop.data.message);
                fetchShopApi();
            }
            if(deleteshop.data.message =='Something Wrong With Mid' ){
                alert(deleteshop.data.message);
                fetchShopApi(); 
            }
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }

    // console.log(getShopData);
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

                {
                   checkData ?
                        <Grid container sx={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '150px', height: '200px', position: 'relative' }}>
                                    <Image src={gif1} alt='No Data' fill objectFit='cover' />
                                </Box>
                            </Grid>

                        </Grid> :
                        <Grid container>
                            <Grid item xs={12}>
                                {/* skel  */}

                                {
                                    getShopData.length == 0 ?
                                        <Grid container>
                                            <Grid item xs={12} sx={{ m: '10px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                            </Grid>
                                            {
                                                skelArr.map((ele, index) => {
                                                    return <Grid container key={index} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', m: '10px' }}>
                                                        <Grid item xs={0.5}>
                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px', borderRadius: '7px' }} />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                                        </Grid>
                                                        <Grid item xs={0.5}>
                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                                        </Grid>
                                                        <Grid item xs={2.3}>
                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                                        </Grid>
                                                        <Grid item xs={2.3}>
                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                                        </Grid>

                                                        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                            <Skeleton variant="rectangular" sx={{ width: '35%', height: '40px', borderRadius: '6px' }} />
                                                            <Skeleton variant="rectangular" sx={{ width: '35%', height: '40px', borderRadius: '6px' }} />
                                                        </Grid>

                                                        <Grid item xs={12} sx={{ mt: '10px' }}>
                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '2px', borderRadius: '6px' }} />
                                                        </Grid>
                                                    </Grid>
                                                })
                                            }


                                        </Grid> :
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead sx={{ bgcolor: 'grey' }}>
                                                    <TableRow >
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >ShopName</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Mobile</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>isShopOpen</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Wallet</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody >

                                                    {
                                                        getShopData.map((ele, index) => {
                                                            // console.log(ele)
                                                            return (
                                                                <TableRow key={index} >
                                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>{index + 1}</TableCell>
                                                                    <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', }} onClick={() => { goToCategoriesHandler(ele._id) }}>{ele.shopName}</TableCell>
                                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>{ele.mobileShop}  </TableCell>
                                                                    <TableCell align="center" >
                                                                        {
                                                                            hidebtn == ele._id ?
                                                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                    <CircularProgress size={22} />
                                                                                </Box> :
                                                                                <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                    <FormControlLabel control={<Checkbox checked={ele.isShopOpen} onChange={(e) => { shopOpenHandler(e, ele._id) }} />} />
                                                                                </FormGroup>
                                                                        }



                                                                        {/* <Checkbox checked={ele.isShopOpen} /> */}
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>Rs {ele.walletBal}</TableCell>
                                                                    <TableCell align="center" >
                                                                        <Button variant='contained' color='success' sx={{ fontSize: '10px', m: '2px' }} onClick={()=>{editShopHandler(ele._id)}}>Edit</Button>
                                                                        <Button variant='contained' color='error' sx={{ fontSize: '10px', m: '2px' }} onClick={()=>{deleteShopHandler(ele._id)}}>Delete</Button>
                                                                    </TableCell>
                                                                </TableRow>

                                                            )
                                                        })
                                                    }


                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                }



                            </Grid>
                        </Grid>

                }






            </Grid>
        </>
    )
}

export default AllShops