'use client'
import AdminPanel from '@/components/AdminPanel'
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const UserAddress = () => {
    const param = useParams();
    const [addressDetails, setAddressDetails] = useState([]);
    // console.log(param);

    const fetchAllUserAddressApi = async () => {
        try {
            const body = await axios.get(`/api/address/${param.id}`);
            // console.log(body);
            setAddressDetails(body.data.resp);
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };
    useEffect(() => {
        fetchAllUserAddressApi();
    }, []);

    // console.log(addressDetails);

    return (
        <>
            <Grid container>
                <AdminPanel />

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>USER ADDRESS</Typography>

                </Grid>
                {/* <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} >Add new user</Button>

                </Grid> */}

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ bgcolor: 'grey' }}>
                                    <TableRow >
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >RecieverName</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Address</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>LandMark</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>country</TableCell>
                                        {/* <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        addressDetails.map((ele, index) => {
                                            return (
                                    <TableRow key={index} >
                                        <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{index + 1}</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} >{ele.recieverName}</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.address}</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.landMark}</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '14px',fontWeight:'bold' }}>{ele.country}</TableCell>
                                        {/* <TableCell align="center" >
                                            <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} >Edit</Button>
                                            <Button variant='contained' color='error' sx={{ fontSize: '10px' }}  >Delete</Button>
                                        </TableCell> */}
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

export default UserAddress