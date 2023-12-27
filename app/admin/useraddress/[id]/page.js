'use client'
import AdminPanel from '@/components/AdminPanel'
import { Box, Button, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import gif1 from '../../../../assets/gif1.gif';
import CustomSkeleton from '@/components/CustomSkeleton';

const UserAddress = () => {
    const param = useParams();
    const [addressDetails, setAddressDetails] = useState([]);
    const skelArr = new Array(6).fill();
    const [checkData, setCheckData] = useState(false);
    const tableHead = ['S.No','RecieverName','Address','LandMark','country'];
    const [hidebtn, setHideBtn] = useState('')
    // console.log(param);

    const fetchAllUserAddressApi = async () => {
        try {
            const body = await axios.get(`/api/address/${param.id}`);
            // console.log(body);
            if (body.data.message == "Data Fetch Successfully") {
                setAddressDetails(body.data.resp);
                setCheckData(false)
            }
            if (body.data.message == "Failed To Fetch Data") {
                setCheckData(true)
            }

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
                            {
                                addressDetails.length == 0 ?
                                    <CustomSkeleton  tableHead={tableHead}/>
                                    :
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead sx={{ bgcolor: 'grey' }}>
                                                        <TableRow >
                                                            {
                                                                tableHead.map((ele, index)=>{
                                                                    return <TableCell key={index} align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>{ele}</TableCell>
                                                                })
                                                            }
                                                            
                                                            
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
                                                                        <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.country}</TableCell>

                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                }




            </Grid>
        </>
    )
}

export default UserAddress