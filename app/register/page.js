'use client'
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Button, CssBaseline, OutlinedInput, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
    const router = useRouter();
    const [btn, setbtn] = useState(true)
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: ''

    });

    const userDetails = (e) => {
        const { name, value } = e.target;
        if (name == 'mobile' && value.length > 10) {

        } else {
            setUserData({ ...userData, [name]: value })
        }

    };

    const handleSubmit = async () => {
        console.log(userData);
        if (userData.fullName && userData.email && (userData.mobile.length > 9 && userData.mobile.length < 11) && userData.password.length > 7) {
            try {
                const getUserData = await axios.post('/api/user', userData);
                if (getUserData.data.message == 'This Mobile No is Already Register') {
                    alert(getUserData.data.message);
                }
                if (getUserData.data.message == 'User Registered Successfully') {
                    router.push('/login');
                }


            } catch (err) {
                console.log(err);
                alert(err.message)
            }
        } else {
            alert('please Fill The Required Details')
        }


    }

    useEffect(() => {
        if (userData.fullName && userData.email && (userData.mobile.length > 9 && userData.mobile.length < 11) && userData.password.length > 7) {
            setbtn(false)
        } else {
            setbtn(true)
        }

    }, [userData])
    console.log(userData)
    return (
        <>
            <Grid container>
                <Grid item xs={12} sx={{ bgcolor: "black", p: '10px', position: 'sticky', top: '0px', zIndex: '99999' }}>
                    <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Register</Typography>

                </Grid>



                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid item lg={4} md={5} sm={6} xs={8}>

                        <Paper sx={{ p: '5px', mt: '60px' }} elevation={2}>
                            
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <Box >
                                    <Grid container >
                                    <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '17px', }}>Full Name</Typography>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <OutlinedInput
                                                autoComplete="given-name"

                                                required
                                                fullWidth
                                                name="fullName"
                                                value={userData.fullName}
                                                
                                                onChange={userDetails}
                                                autoFocus
                                                size='small'
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '17px', mt:'10px' }}>Email</Typography>
                                        </Grid><OutlinedInput
                                                required
                                                fullWidth
                                                name="email"
                                                value={userData.email}
                                                label="Email"
                                                autoComplete="email"
                                                onChange={userDetails}
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '17px', mt:'10px' }}>Mobile</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <OutlinedInput
                                                required
                                                fullWidth
                                                name="mobile"
                                                value={userData.mobile}
                                                label="Mobile"
                                                type="number"
                                                autoComplete="new-password"
                                                onChange={userDetails}
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '17px', mt:'10px' }}>Password</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <OutlinedInput
                                                required
                                                fullWidth
                                                label="Password"
                                                type="password"
                                                autoComplete="new-password"
                                                name="password"
                                                value={userData.password}
                                                onChange={userDetails}
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '17px', mt:'10px' }}>Image</Typography>
                                        </Grid>

                                        <Grid item xs={12} sx={{ mt: '3px' }}>
                                            <Box sx={{ height: "30px", width: "100%", border: '1px solid black', }}>
                                                <Typography sx={{ position: "relative", top: "0px", mt: "4px", textAlign: 'center' }}>
                                                    <input type='file' style={{ zIndex: 99, opacity: 0, position: "absolute", left: "0px", top: "0px", height: "30px", width: "100%" }} />
                                                    Choose Image
                                                </Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, bgcolor: 'black', }}
                                        disabled={btn}
                                        onClick={handleSubmit}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default RegisterPage