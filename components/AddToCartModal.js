'use client'
import { Box, Button, CircularProgress, Grid, IconButton, Modal, OutlinedInput, Paper, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import cardImg from '../assets/pizza2.jpg'
import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AlertSnackbar from './AlertSnackbar';


const AddToCartModal = ({ modalData, setModalData,fetchCartApi }) => {
    const [open, setOpen] = useState(false);
    const [loaders, setLoaders] = useState(false);
    

    // console.log("new data", modalData);


    const handleClose = () => {
        setModalData({ ...modalData, open: false })
    };

    const minusHandler = () => {
        if (modalData.data.qty > 0) {
            setModalData({ ...modalData, data: { ...modalData.data, qty: modalData.data.qty - 1 } })
        }


    };

    const plusHandler = () => {
        setModalData({ ...modalData, data: { ...modalData.data, qty: modalData.data.qty + 1 } })


    };

    const addToCartHandler = async () => {
        
        setLoaders(true)
        const newModalData = { ...modalData.data, uid: JSON.parse(localStorage.getItem('UID')) };
        // console.log(" add to cart uid check",newModalData);
        try {
            const res = await axios.post('/api/cart/', newModalData);
            // console.log(res);
            if (res.data.message == 'Add To Cart Successfully') {
                setModalData({ ...modalData, open: false });
                // alert(res.data.message);
                setLoaders(false)
                setOpen(true);
                fetchCartApi();
            } 
            if (res.data.message == 'Failed to Add Item') {
                alert(res.data.message);
                setLoaders(false)
            }

        } catch (err) {
            console.log(err);
            alert(err.message);

        }
    };

    return (
        <>
            <Modal
                open={modalData.open}
                onClose={handleClose}
                sx={{ border: "none", }}
                disableAutoFocus
            >

                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { lg: 400, md: 400, sm: 380, xs: 320 },
                    bgcolor: 'white',
                    textAlign: 'center',
                    borderRadius: "15px",
                    overflow: "hidden",
                    height: { lg: 200, md: 200, sm: 180, xs: 160 },

                }}>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", position: "relative", bgcolor: "#white", }}>

                        <IconButton sx={{ position: "absolute", top: "-5px", right: "-8px", zIndex: 9999 }} onClick={() => { setModalData({ ...modalData, open: false }) }}>
                            <CancelOutlinedIcon sx={{ color: "crimson", fontSize: { lg: "35px", md: "35px", sm: "35px", xs: "30px" } }} />
                        </IconButton>

                        <Box sx={{ height: "100%", mt: "10px", width: { lg: 180, md: 180, sm: 160, xs: 130 }, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <Image src={cardImg} alt='pizza' style={{ height: "85%", width: "95%" }} />
                        </Box>

                        <Box sx={{ width: { lg: 220, md: 220, sm: 220, xs: 200 }, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: '1px solid black', }}>
                            <Box>
                                <Typography align='center' sx={{ fontSize: { lg: "23px", md: "23px", sm: "21px", xs: "20px" }, fontWeight: "800", pt: '10px' }}>{modalData.data.name}</Typography>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", mt: { lg: "15px", md: "15px", sm: "13px", xs: "8px" } }}>
                                    <Box sx={{ width: { lg: "150px", md: "150px", sm: "130px", xs: "100px" }, display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                        <IconButton onClick={minusHandler}>
                                            <IndeterminateCheckBoxIcon sx={{ fontSize: { lg: "35px", md: "35px", sm: "30px", xs: "25px" }, color: "#37474f" }} />
                                        </IconButton>


                                        <Typography align='center' sx={{ fontSize: { lg: "24px", md: "24px", sm: "21px", xs: "15`px" }, fontWeight: 'bold' }}>{modalData.data.qty}</Typography>

                                        <IconButton onClick={plusHandler}>
                                            <AddBoxIcon sx={{ fontSize: { lg: "35px", md: "35px", sm: "30px", xs: "25px" }, color: "#37474f", }} />
                                        </IconButton>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: { lg: "15px", md: "15px", sm: "13px", xs: "8px" }, }}>
                                    {
                                        loaders ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <CircularProgress color='error' />
                                        </Box> :
                                            <Button variant='contained' disabled={ modalData.data.qty < 1} sx={{ width: '80%', bgcolor: "#c62828", "&:hover": { bgcolor: "#c62828" } }} onClick={addToCartHandler}>Add</Button>
                                    }


                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>


            </Modal>

            <AlertSnackbar open={open} setOpen={setOpen} />
        </>
    )
}

export default AddToCartModal