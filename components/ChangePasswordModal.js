'use client'
import { Box, Button, Grid, Modal, Paper, Typography, } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import profile from '../assests/profile.avif';



const ChangePassword = ({ passOpen, setPassOpen,userData,fetchUserDetails }) => {
    const [hide, setHide] = useState(false)
    const [passwrd, setPasswrd] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const editPassword = (e) => {
        const { value, name } = e.target;
        setPasswrd({ ...passwrd, [name]: value });
    };

    useEffect(()=>{
     if(passwrd.currentPassword.length == 0 || passwrd.newPassword.length == 0 || passwrd.confirmPassword.length == 0){
        setHide(true)
     }else{
        setHide(false)
     }
    },[passwrd])
    


    const handleClose = () => {
        setPassOpen(false)
    };
    const submitHandler = async () => {
        const uid = await JSON.parse(localStorage.getItem('UID'));
        if (passwrd.currentPassword != '' && passwrd.newPassword != '' && passwrd.confirmPassword != '' && (passwrd.newPassword == passwrd.confirmPassword)) {
            try {
                const res = await axios.patch(`/api/edituserpassword/${uid}`, { currentPassword: passwrd.currentPassword, newPassword: passwrd.newPassword });
                console.log(res)
                if (res.data.message == "Password Changed Successfully") {
                    alert(res.data.message);
                    setPassOpen(false)
                    setPasswrd({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                } else {
                    alert(res.data.message);
                }
            } catch (err) {
                console.log(err);
                alert(err.message)
            }
        } else {
            alert('Please Fill The Correct Password')
        }
    }


    // console.log(passwrd)

    return (
        <>
            <Modal open={passOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'white', p: 4, bgcolor: "white" }}>
                    <Box>
                        <Typography align='center' sx={{ fontSize: "17px", fontWeight: "800" }}>Change Password</Typography>
                    </Box>
                    <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField required fullWidth label="Current Password" onChange={editPassword} name='currentPassword' value={passwrd.currentPassword} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth label="New Password" name="newPassword" onChange={editPassword} value={passwrd.newPassword} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth label="Confirm Password" name="confirmPassword" onChange={editPassword} value={passwrd.confirmPassword} />
                                </Grid>


                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={submitHandler} disabled={hide} >
                                Submit
                            </Button>
                        </Box>
                    </Box>

                </Paper>


            </Modal>
        </>
    )
}

export default ChangePassword