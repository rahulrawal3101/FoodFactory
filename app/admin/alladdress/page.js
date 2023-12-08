'use client'
import AdminPanel from '@/components/AdminPanel';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const router = useRouter();
    const [userAddress, setUserAddress] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchAllAddressApi = async () => {
        try {
            const body = await axios.get('/api/alladdress');
            // console.log(body)
            setUserAddress(body.data.resp);

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

                <Grid container>
                    <Grid item xs={12}>
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
                                        userAddress.map((ele,index)=>{
                                            return  <TableRow key={index} >
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
                    </Grid>
                </Grid>


            </Grid>
            {/* <AddNewUser open={open} setOpen={setOpen} fetchUserApi={fetchUserApi} /> */}
        </>
    )
}

export default AllUsers