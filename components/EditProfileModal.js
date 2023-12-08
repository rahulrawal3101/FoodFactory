'use client'
import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import profile from '../assets/human.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';




const EditProfile = ({ openEdit, setOpenEdit, userData, fetchUserDetails }) => {
    // console.log(userData)
    const [inputData, setInputData] = useState({
        fullName: "",
        mobile: "",
        email: ""
    });
    const [loaders, setLoaders] = useState({
        loading: false,
        isDisabled: true
    })

    const handleClose = () => {
        setOpenEdit(false)
    };

    const handleCollect = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
        if( value != userData[name]){
            setLoaders({...loaders,isDisabled:false})
        }else{
            setLoaders({...loaders,isDisabled:true})
        }
        
    }
    useEffect(() => {
        setInputData({ ...inputData, fullName: userData.fullName, mobile: userData.mobile, email: userData.email })
    }, [userData]);




    const submitHandler = async () => {
        setLoaders({...loaders,loading:true})
        const uid = await JSON.parse(localStorage.getItem('UID'));
        if (inputData.fullName != '' && inputData.mobile != '' && inputData.email != '') {
            try {
                const res = await axios.patch(`/api/editprofile/${uid}`, { fullName: inputData.fullName, mobile: inputData.mobile, email: inputData.email });
                // console.log(res);
                if (res.data.message == "Profile Edit Successfully") {
                    alert(res.data.message);
                    fetchUserDetails();
                    setOpenEdit(false)
                    setLoaders({...loaders,loading:false,isDisabled:true})
                }
                if(res.data.message =='Failed To Edit Profile'){
                    setLoaders({...loaders,loading:true,isDisabled:true})
                }

            } catch (err) {
                console.log(err);
                alert(err.message)
            }
        } else {
            alert('Please Fill The Required Fields')
        };


    }

    return (
        <>
            <Modal open={openEdit} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'white', p: 4, bgcolor: "white" }}>
                    <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ mt: "30px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <Box sx={{ position: "relative", height: "100px", width: "100px", borderRadius: "100%", overflow: "hidden" }}>
                                <Image src={profile} alt='image' style={{ position: "absolute", height: "100%", width: "100%" }} />
                            </Box>
                            <Button variant='contained' sx={{ fontSize: "12px", mt: "15px" }}>Change Photo</Button>
                        </Box>
                        <Typography component="h1" variant="h5" sx={{ mt: "20px" }}>
                            User Profile
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField name="fullName" required fullWidth label="Full Name" value={inputData.fullName} onChange={handleCollect} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth label="Email Address" name="email" value={inputData.email} onChange={handleCollect} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth label="Mobile" name="mobile" value={inputData.mobile} onChange={handleCollect} />
                                </Grid>


                            </Grid>

                            {
                                ! loaders.loading ?  <Button type="submit" disabled={loaders.isDisabled} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={submitHandler} >
                                Submit
                            </Button>
                            :
                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress />
                            </Box>
                            }

                           
                            


                        </Box>
                    </Box>

                </Paper>


            </Modal>
        </>
    )
}

export default EditProfile