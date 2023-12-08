'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid, InputBase, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: 550, md: 550, sm: 450, xs: 400 },
    borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'


};

const ChangeOrdStatusModal = ({ open, setOpen, status,userDetails, fetchUserDetailsApi }) => {
    const handleClose = () => setOpen(false);
    const [allList, setAllList] = useState('')
    const [ordStatusChange, setOrdStatusChange] = useState([])

    const handleChange = (event) => {
        setAllList(event.target.value);
    }; useEffect(() => {
        setAllList(status)
    }, [status])
    const crossHandler = () => {
        setOpen(false)
    };
    // console.log('check status', status)
    // console.log('33 line no', allList)

    const fetchOrderStatus = async () => {
        try {
            const body = await axios.get('/api/changeorderstatus');
            // console.log(body);
            setOrdStatusChange(body.data.resp)
        } catch (err) {
            console.log(err.message)
        }
    };

    useEffect(() => {
        fetchOrderStatus();
    }, []);

    // console.log(ordStatusChange);
    const editHandler=async ()=>{
        try{
            const resp = await axios.patch(`/api/changeorderstatus/${userDetails._id}`,{newStatus:allList});
            // console.log("Resp Status Change : ",resp);
            if(resp.data.message=="Order Status Changed"){
                setOpen(false);
                fetchUserDetailsApi();
            }
        }catch(err){
            alert(err.message);
            console.log(err);
        }
    }

    return (
        <>

            <Modal
                open={open}
                disableAutoFocus
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ bgcolor: '#635ac053', border: '2px solid white' }}

            >
                <Grid container sx={style}>
                    <Grid item lg={12} md={12} sm={10} xs={10}>
                        <Paper elevation={5} sx={{ borderRadius: '20px' }}>
                            <Grid container >
                                <Grid item xs={12} sx={{ p: '10px', textAlign: 'right' }}>
                                    <ClearIcon sx={{ color: '#635ac0', fontWeight: 'bold', fontSize: '29px', cursor: 'pointer' }} onClick={crossHandler} />
                                </Grid>


                            </Grid>
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                                <Grid item xs={12} sx={{ textAlign: 'center', mt: '40px' }}>
                                    <Typography sx={{ fontSize: '27px', color: '#635ac0', fontWeight: '800', fontFamily: 'poppins,sans-serif' }}>Change OrderStatus </Typography>
                                </Grid>
                            </Grid>

                            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px', pb: '70px' }}>

                                <Grid item xs={6.1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={allList}
                                            // label="Age"
                                            onChange={handleChange}
                                        >
                                            {
                                                ordStatusChange.map((ele, index) => {
                                                    return (
                                                        <MenuItem key={index} value={ele}>{ele}</MenuItem>
                                                    )
                                                })
                                            }

                                            {/* <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6.1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                                    <Button onClick={editHandler} disabled={allList==status?true:false} variant='contained' sx={{ bgcolor: '#635ac0', width: '100%', fontSize: '13px', pt: '10px', pb: '10px', borderRadius: '10px', textTransform: 'lowercase', '&:hover': { bgcolor: '#635ac0', } }}>Change Status</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>



                </Grid>


            </Modal>
        </>
    )
}

export default ChangeOrdStatusModal