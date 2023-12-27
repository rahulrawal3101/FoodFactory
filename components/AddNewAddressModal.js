'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  Grid, TextField, CircularProgress } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';


const AddNewAddress = ({ open, setOpen, fetchAddressApi }) => {
    // const router = useRouter();
    const id = JSON.parse(localStorage.getItem('UID'))
    const [addressdetails, setAddressDetails] = useState({
        recieverName: '',
        address: '',
        landMark: '',
        state: '',
        country: '',
        pinCode: '',
        mobile: '',
        uid: id
    });
    const [loaders, setLoaders] = useState(false)

    // console.log('local id',id)
    const handleClose = () => {
        setOpen(false)
    };

    const AddressInputDetails = (e) => {
        const { name, value } = e.target;
        setAddressDetails({ ...addressdetails, [name]: value })

    };
    // console.log(addressdetails);

    const submitHandler = async () => {
        setLoaders(true)
        if (addressdetails.recieverName && addressdetails.address && addressdetails.landMark && addressdetails.state && addressdetails.country && addressdetails.pinCode && addressdetails.mobile) {
            try {
                const res = await axios.post('/api/address', addressdetails);
                console.log(res);
                if (res.data.message == "Address Add Successfully") {
                    setOpen(false)
                    // alert(res.data.message);
                    fetchAddressApi();
                    setLoaders(false);
                    setAddressDetails({
                        recieverName: '',
                        address: '',
                        landMark: '',
                        state: '',
                        country: '',
                        pinCode: '',
                        mobile: '',
                        uid: id
                    })
    
                }
    
            } catch (err) {
                console.log(err);
                alert(err.message);
    
            }
            
        }
    };



    return (
        <>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container sx={{ height: 'fit-content', width: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12} sx={{ borderRadius: '10px', bgcolor: 'white' }}>
                        <Grid container>
                            <Grid item xs={12} sx={{ p: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'black' }}>
                                <Typography sx={{ fontSize: '20px', fontWeight: '800', color: 'white' }}>Add New Address</Typography>
                            </Grid>


                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Reciever Name :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='Enter...' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='recieverName' value={addressdetails.recieverName} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Address :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='Address...' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='address' value={addressdetails.address} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Land Mark :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='LandMark...' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='landMark' value={addressdetails.landMark} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>State :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='State...' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='state' value={addressdetails.state} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Country :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='Country...' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='country' value={addressdetails.country} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>PinCode :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='PinCode...' type='number' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='pinCode' value={addressdetails.pinCode} />

                                </Grid>
                            </Grid>
                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>mobile :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='mobile...' type='number' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={AddressInputDetails} name='mobile' value={addressdetails.mobile} />

                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px', pb: '10px' }}>
                                {
                                    loaders ?
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <CircularProgress size={20} />
                                        </Box> :
                                        <Button variant='contained' sx={{ fontSize: '15px' }} onClick={submitHandler} >Add This Address</Button>
                                }

                            </Grid>


                        </Grid>

                    </Grid>
                </Grid>

            </Modal>
        </>
    );
}
export default AddNewAddress