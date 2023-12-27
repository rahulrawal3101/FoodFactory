'use client'
import AdminPanel from '@/components/AdminPanel'
import { Button, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ChangeOrdStatusModal from '@/components/ChangeOrdStatusModal';
import { Details } from '@mui/icons-material';

const userActiveOrder = () => {
    const param = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [open, setOpen] = useState(false);
    const [checkData, setCheckData] = useState(true);
    const skelArr = new Array(3).fill(1)

    // console.log(param.uid);

    const fetchUserDetailsApi = async () => {
        try {
            const body = await axios.get(`/api/userdetails/${param.id}`);

            // console.log(body)
            if (body.data.message == "User Details Fetch SuccessFully") {
                setUserDetails(body.data.resp);
                setCheckData(false);
            }
            if (body.data.message == 'Failed To Fetch User Details') {
                alert(body.data.message);
                setCheckData(true);
            }


        } catch (err) {
            console.log(err.message)
        }
    };

    useEffect(() => {
        fetchUserDetailsApi();
    }, []);

    // console.log(userDetails.items)
    console.log(userDetails);
    // setTimeout(()=>{

    //     console.log(userDetails.addres.recieverName)
    // },2000);



    const changeHandler = () => {
        setOpen(true)
    }


    //   console.log(userDetails)

    return (
        <>
            <Grid container>
                <AdminPanel />

                {
                    checkData ?
                        <Grid container >
                            <Grid container sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', p: '3px', pt: '10px' }}>
                                <Grid item xs={2} >
                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '50px', borderRadius: '7px' }} />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '3px', pt: '10px' }}>
                                <Grid item xs={2} >
                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '50px', borderRadius: '7px' }} />
                                </Grid>
                            </Grid>

                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '3px', pt: '10px' }}>
                                <Grid item xs={12} >
                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '50px', borderRadius: '7px' }} />
                                </Grid>
                                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '10px' }}>
                                    <Grid item xs={0.5}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px', borderRadius: '7px' }} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                </Grid>

                            </Grid>


                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '3px', pt: '50px' }}>
                                <Grid item xs={2} >
                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '50px', borderRadius: '7px' }} />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '3px', pt: '10px' }}>
                                <Grid container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: '10px' }}>
                                    <Grid item xs={2}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px', borderRadius: '7px' }} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                    </Grid>


                                </Grid>
                                <Grid item xs={12} >
                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '50px', borderRadius: '7px' }} />
                                </Grid>
                                {
                                    skelArr.map((ele, index) => {
                                        return <Grid container key={index} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: '10px' }}>
                                            <Grid item xs={0.5}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px', borderRadius: '7px' }} />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                            </Grid>

                                            <Grid item xs={1}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />
                                            </Grid>
                                            <Grid item xs={12} sx={{ mt: '10px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '2px', borderRadius: '6px' }} />
                                            </Grid>
                                        </Grid>
                                    })
                                }
                                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '3px', pt: '20px' }}>
                                    <Grid item xs={2} >
                                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '50px', borderRadius: '7px' }} />
                                    </Grid>
                                </Grid>

                            </Grid>

                        </Grid> :

                        <Grid container>
                            <Grid item xs={12} sx={{ p: '10px', textAlign: 'right' }}>
                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', }}>{Object.keys(userDetails) != 0 ? userDetails.addres.recieverName : ''} Order</Typography>
                                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'green' }}>Order Status: <span style={{ fontSize: '12px', color: '#green' }}>{userDetails.orderStatus}</span></Typography>

                            </Grid>
                            <Grid item xs={12} sx={{ p: '10px' }}>
                                <Typography sx={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', }}>User Details</Typography>

                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead sx={{ bgcolor: 'grey' }}>
                                                <TableRow >
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >Reciever Name</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Delivery Address</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Reciever Mobile No</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Address</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >

                                                <TableRow  >
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>1</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} >{Object.keys(userDetails) != 0 ? userDetails.addres.recieverName : ''}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{Object.keys(userDetails) != 0 ? userDetails.addres.address : ''},{Object.keys(userDetails) != 0 ? userDetails.addres.state : ''},{Object.keys(userDetails) != 0 ? userDetails.addres.country : ''}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{Object.keys(userDetails) != 0 ? userDetails.addres.mobile : ''}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>xyz</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                        xyz
                                                        {/* <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} >Edit</Button>
                                            <Button variant='contained' color='error' sx={{ fontSize: '10px' }}  >Delete</Button> */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: '40px' }}>
                                <Typography sx={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', }}>Items Details</Typography>
                            </Grid>
                            <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', }}>
                                <Grid item xs={3}>
                                    <Typography sx={{ textAlign: 'center', color: 'green', fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '13px' }, fontWeight: 'bold' }}>Order Status : <span style={{ fontSize: '12.5px', color: 'black', fontWeight: 'bold' }}>{userDetails.orderStatus}</span><Button variant='contained' size='small' sx={{ ml: '5px' }} onClick={changeHandler}>Change</Button> </Typography>
                                </Grid>
                                <Grid item xs={2} >
                                    <Typography sx={{ textAlign: 'center', color: 'green', fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '13px' }, fontWeight: 'bold' }}>Tax :  <span style={{ fontSize: '12.5px', color: 'black', fontWeight: 'bold' }}>{userDetails.tax}</span></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography sx={{ textAlign: 'center', color: 'green', fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '13px' }, fontWeight: 'bold' }}>Delivery Charge :  <span style={{ fontSize: '12.5px', color: 'black', fontWeight: 'bold' }}>{userDetails.delchrg}</span></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography sx={{ textAlign: 'center', color: 'green', fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '13px' }, fontWeight: 'bold' }}>Discount :  <span style={{ fontSize: '12.5px', color: 'black', fontWeight: 'bold' }}>{userDetails.discount}</span></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography sx={{ textAlign: 'center', color: 'green', fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '13px' }, fontWeight: 'bold' }}>Sub Total :  <span style={{ fontSize: '12.5px', color: 'black', fontWeight: 'bold' }}>{userDetails.subTotal}</span></Typography>
                                </Grid>

                            </Grid>
                            <Grid container sx={{ mt: '10px' }}>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead sx={{ bgcolor: 'grey' }}>
                                                <TableRow >
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >Item Name</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Qty</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Mrp</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Srp</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Item Price</TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {
                                                    Object.keys(userDetails) != 0 &&
                                                    userDetails.items.map((ele, index) => {
                                                        // console.log(ele)
                                                        return <TableRow key={index} >
                                                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{index + 1}</TableCell>
                                                            <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} >{ele[0].name}</TableCell>
                                                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele[0].qty}</TableCell>
                                                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele[0].mrp}</TableCell>
                                                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele[0].srp}</TableCell>
                                                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele[0].srp * ele[0].qty}</TableCell>
                                                        </TableRow>
                                                    })

                                                }

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ bgcolor: '#eeeeee', p: '10px' }}>
                                <Typography sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>To Pay : <span style={{ fontSize: '14px', color: 'Green', fontWeight: 'bold' }}>{userDetails.toPay} Rs</span></Typography>
                            </Grid>
                        </Grid>
                }







            </Grid>
            <ChangeOrdStatusModal fetchUserDetailsApi={fetchUserDetailsApi} open={open} setOpen={setOpen} status={userDetails.orderStatus} userDetails={userDetails} />
        </>
    )
}

export default userActiveOrder