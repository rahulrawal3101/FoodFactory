'use client'
import Header from '@/components/Header';
import { Box, Button, CircularProgress, Divider, Fab, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';
import { useParams } from 'next/navigation';
import AddNewAddress from '@/components/AddNewAddressModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import address from '../../../assets/address.gif'


const Address = () => {

    const router = useRouter();
    const param = useParams();
    // console.log(param)
    const [open, setOpen] = useState(false);
    const [allAddress, setAllAddress] = useState([]);
    const [seletAddress, setSelectAddress] = useState('');
    const [addressId, setAddressId] = useState('');
    const [checkData, setCheckData] = useState(false);
    const [loaders, setLoaders] = useState(false);
    const [showbtn, setShowbtn] = useState(false)
    const AddNewAddressModal = () => {
        setOpen(true);
    };

    const skelArr = new Array(4).fill(1)

    const fetchAddressApi = async () => {
        setShowbtn(false)
        try {
            const body = await axios.get(`/api/address/${param.id}`);
            // console.log(body);
            if (body.data.message == "Data Fetch Successfully") {
                setAllAddress(body.data.resp);
                setCheckData(false);
                setShowbtn(true)
            }
            if (body.data.message == 'Failed To Fetch Data') {
                setCheckData(true);
                setShowbtn(true)
            }

        } catch (err) {
            console.log(err);
            alert(err.message)

        }

    };

    useEffect(() => {
        fetchAddressApi();
    }, []);

    const handleChange = (e) => {
        // console.log(e.target.value)
        setSelectAddress(e.target.value);
        setAddressId(e.target.value)
    };
    // console.log(addressId)
    const deleteHandler = async (id) => {
        // console.log(id)
        setLoaders(id)
        try {
            const body = await axios.delete(`/api/address/${id}`);
            // console.log( body);
            if (body.data.message == "Address Delete Successfully") {
                fetchAddressApi();
                setLoaders(false)
                alert(body.data.message);
            } else {
                alert('Something Wrong');
                setLoaders(true)
            }



        } catch (err) {
            console.log(err);
            alert(err.message)

        }
    }

    // console.log(allAddress.length)
    const todoBillingPage = () => {
        if (addressId == '') {

            alert('please Select Address');

        }
        if (addressId != '') {

            router.push(`/billing/${JSON.parse(localStorage.getItem('UID'))}/${addressId}`);
        }

    }

    console.log(allAddress.length)
    return (
        <>
            <Grid container >
                <Header />
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '0px', overflow: 'hidden', pb: '80px' }}>
                    <Grid item lg={4} md={6} sm={8} xs={11} >
                        <Paper sx={{ borderRadius: '10px 10px 10px 10px', mt: '40px' }} elevation={2}>
                            <Grid container>
                                <Grid item xs={12} sx={{ bgcolor: '#212121', padding: '8px', textAlign: 'center', borderRadius: '11px 11px 0px 0px' }}>
                                    <Typography sx={{ color: 'White', fontSize: { lg: '25px', md: '23px', sm: '20px', xs: '18px' }, fontWeight: 'bold' }}>Address</Typography>

                                </Grid>


                                {
                                    checkData ?
                                        <Grid container>
                                            <Grid item xs={12} sx={{ p: '20px' }}>
                                                <Box sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'centet' }}>

                                                    <Image src={address} alt='gif' objectFit='cover' style={{ width: '100%', height: '440px' }} />
                                                </Box>
                                                <Typography sx={{ textAlign: 'center', fontSize: '15px', pt: '45px', fontWeight: 'bold' }}>No Data Found</Typography>

                                            </Grid>
                                        </Grid> :

                                        <Grid container >
                                            {
                                                allAddress.length == 0 ?
                                                    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

                                                        {
                                                            skelArr.map((ele, index) => {
                                                                return <Grid key={index} item xs={12} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, }}>

                                                                    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', m: '10px 0px' }}>
                                                                        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                                            <Skeleton variant="circular" width={30} height={30} />

                                                                        </Grid>
                                                                        <Grid item xs={7} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'left', flexDirection: 'column' }}>
                                                                            <Skeleton variant="rectangular" sx={{ width: '30%', height: '15px', mt: '7px' }} />
                                                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '15px', mt: '20px' }} />
                                                                        </Grid>
                                                                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                                                            <Skeleton variant="rectangular" sx={{ width: '20%', height: '20px', }} />
                                                                        </Grid>
                                                                    </Grid>



                                                                </Grid>
                                                            })
                                                        }



                                                    </Grid> :
                                                    <Grid container>
                                                        {
                                                            allAddress.map((ele, index) => {

                                                                return (
                                                                    <Grid container key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                                                                            <FormControl sx={{ ml: '20px' }} >

                                                                                <RadioGroup
                                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                                    value={seletAddress} onChange={handleChange}
                                                                                    name="radio-buttons-group">
                                                                                    <Typography sx={{ fontWeight: 'bold', ml: '35px', fontSize: { lg: '19px', md: '17px', sm: '16px', xs: '15px' } }}>{ele.recieverName}</Typography>
                                                                                    <FormControlLabel value={ele._id} control={<Radio color='success' />} label={<Typography sx={{ fontSize: '15px' }}>{ele.address} {ele.landMark}, {ele.state}, {ele.country}, {ele.pinCode} <br /> {ele.mobile}</Typography>} />

                                                                                </RadioGroup>
                                                                            </FormControl>

                                                                            {
                                                                                loaders == ele._id ?
                                                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '10px' }}>
                                                                                        <CircularProgress size={25} />
                                                                                    </Box> :

                                                                                    <DeleteForeverIcon sx={{ color: 'red', mt: '4px', mr: '15px', cursor: 'pointer' }} onClick={() => { deleteHandler(ele._id) }} />
                                                                            }
                                                                        </Grid>
                                                                        <Divider sx={{ width: '100%', bgcolor: 'lightgrey', height: '1px' }} />
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                            }
                                        </Grid>
                                }
                                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '10px', borderRadius: '0px 0px 11px 11px' }}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            showbtn ? <Button variant='contained' color='success' onClick={AddNewAddressModal}>Add New Address</Button>
                                                : <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                    <Skeleton variant="rectangular" width={200} height={30} />
                                                </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Fab aria-label="add" variant="extended" sx={{ position: 'fixed', bottom: 20, right: 40, bgcolor: 'green',color:'white', '&:hover': { bgcolor: 'green' } }} onClick={todoBillingPage} disabled={seletAddress.length == 0}>
                    <NavigateNextIcon />Billing
                </Fab>
            </Grid>
            <AddNewAddress open={open} setOpen={setOpen} fetchAddressApi={fetchAddressApi} />
        </>

    )
}

export default Address