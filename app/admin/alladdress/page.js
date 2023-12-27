'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import gif1 from '../../../assets/gif1.gif';

const AllUsers = () => {
    const router = useRouter();
    const [userAddress, setUserAddress] = useState([]);
    const [open, setOpen] = useState(false);
    const skelArr = new Array(6).fill(1);
    const [checkData, setCheckData] = useState(false)

    const fetchAllAddressApi = async () => {
        try {
            const body = await axios.get('/api/alladdress');
            console.log(body);
            if (body.data.message == "All Address Data Fetch Successfully") {
                setUserAddress(body.data.resp);
                setCheckData(false);
            }
            if (body.data.message == 'Failed To Fetch All Address Data') {
                setCheckData(true);
            }


        } catch (err) {
            console.log(err);
            alert(err.message)
        }

    };
    // console.log(userAddress)
    useEffect(() => {
        fetchAllAddressApi();
    }, []);

    // const goToAddNewUser = () => {
    //     setOpen(true)

    // };

    const deleteHandler = async (id) => {
        // console.log(id)
        try {
            const body = await axios.delete(`/api/user/${id}`);
            // console.log(body);
            if (body.data.message == "User Delete successfully") {
                alert(body.data.message)
                fetchUserApi();
            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }


    };

    //     const allAddressHandler=(id)=>{
    // router.push(`/admin/useraddress/${id}`);
    //     }
    return (
        <>
            <Grid container>
                <AdminPanel />

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>ALL ADDRESS</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} >Add new ADDRESS</Button>

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
                                {
                                    userAddress.length == 0 ?
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
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >Reviver Name</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Address</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Land Mark </TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Pincode</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Country</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody >

                                                    {
                                                        userAddress.map((ele, index) => {
                                                            return <TableRow key={index} >
                                                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{index + 1}</TableCell>
                                                                <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} >{ele.recieverName}</TableCell>
                                                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.address} </TableCell>
                                                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.landMark}</TableCell>
                                                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.pinCode}</TableCell>
                                                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.country}</TableCell>
                                                                <TableCell align="center" >
                                                                    <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} >Edit</Button>
                                                                    <Button variant='contained' color='error' sx={{ fontSize: '10px' }} >Delete</Button>
                                                                </TableCell>
                                                            </TableRow>
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
            {/* <AddNewUser open={open} setOpen={setOpen} fetchUserApi={fetchUserApi} /> */}
        </>
    )
}

export default AllUsers