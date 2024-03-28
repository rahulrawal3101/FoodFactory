'use client'
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import { Paper } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const userDetails = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })

    }
    const loginHandler=async()=>{
        try{
            if(loginData.email && loginData.password){
                const userLogin = await axios.post('/api/verifyuser',loginData)
                console.log(userLogin);
                // console.log('login user details',userLogin.data.resp.uid)
                if(userLogin.data.message == 'Login Successfull'){
                    await localStorage.setItem('UID',JSON.stringify(userLogin.data.resp.uid));
                    router.push('/')
                }else{
                    alert(userLogin.data.message)
                }
            }else{
                alert('Please Fill the required feilds')
            }
            
        }catch(err){
            console.log(err);
            alert(err.message);
        }
    }
    // console.log(loginData)
    return (
        <>
            <Grid container>
                <Grid item xs={12} sx={{ bgcolor: "black", p: '10px', position: 'sticky', top: '0px' }}>
                    <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Login</Typography>

                </Grid>
                <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={4} md={6} sm={6} xs={8} sx={{ mt: '60px' }}>
                        <Paper sx={{ p: '5px' }} elevation={2}>

                            <CssBaseline />
                            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box  sx={{ mt: 1 }}>
                                    <TextField size='small'
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        value={loginData.email}
                                        autoComplete="email"
                                        autoFocus
                                        onChange={userDetails}
                                    />
                                    <TextField
                                    size='small'
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={loginData.password}
                                        label="Password"
                                        type="password"
                                        onChange={userDetails}
                                        autoComplete="current-password"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button

                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
                                        onClick={loginHandler}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
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

export default LoginPage