'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Image from 'next/image';
import human from '../../../assets/human.jpg'
import { Paper, Skeleton } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import ChangePassword from '@/components/ChangePasswordModal';
import EditProfile from '@/components/EditProfileModal';
import Image from 'next/image';



const Profile = () => {
    const [userData, setUserData] = useState([]);
    const [passOpen, setPassOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const param = useParams();
    // console.log(param)

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`/api/profile/${param.uid}`)
            // console.log(res);
            setUserData(...res.data.resp)

        } catch (err) {
            console.log(err)
            alert(err.message)
        }
    };
    useEffect(() => {
        fetchUserDetails();
    }, []);
    console.log(userData);

    const passwordHandler = () => {
        setPassOpen(true)
    };
    const editProfile = () => {
        setOpenEdit(true)
    }

    return (
        <>
            <Container disableGutters maxWidth='xl'>
                <Header />
                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', mt: '70px' }}>
                    <Grid item lg={4.5} md={6} sm={10} xs={11} sx={{ mt: '30px' }}>
                        <Paper elevation={3} sx={{ p: '10px' }}>


                            <Grid container >
                                {
                                    userData == '' ?
                                        <Grid container >
                                            <Grid item xs={12} sx={{ m: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Skeleton variant="circular" width={100} height={100} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '25px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>

                                            <Grid item xs={12} sx={{ mt: '19px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '25px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>

                                            <Grid item xs={12} sx={{ mt: '19px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '25px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>

                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: '10px' }}>
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '35px', borderRadius: '7px' }} />
                                                <Skeleton variant="rectangular" sx={{ width: '20%', height: '35px', mt: '10px', borderRadius: '7px' }} />
                                            </Grid>
                                        </Grid> :

                                        <Grid container >

                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '100px', height: '100px' }}>
                                                    <Box sx={{ width: '100px', height: '100px' }}>

                                                        <Image src={human} alt='img'  style={{ width: '100px', height: '100px' }} />
                                                    </Box>
                                                </Avatar>
                                            </Grid>
                                            <Typography sx={{ fontSize: '15px', fontWeight: 'bold', ml: '5px' }}>Name</Typography>
                                            <Grid item xs={12} sx={{ border: '1px solid grey', borderRadius: '10px', p: '10px' }} >
                                                <Typography sx={{ fontSize: "15px", color: 'grey' }}>{userData.fullName}</Typography>

                                            </Grid>
                                            <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mt: '10px', ml: '5px' }}>Email</Typography>
                                            <Grid item xs={12} sx={{ border: '1px solid grey', borderRadius: '10px', p: '10px', }} >
                                                <Typography sx={{ fontSize: "15px", color: 'grey' }}>{userData.email}</Typography>

                                            </Grid>
                                            <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mt: '10px', ml: '5px' }}>Mobile</Typography>
                                            <Grid item xs={12} sx={{ border: '1px solid grey', borderRadius: '10px', p: '10px', }} >
                                                <Typography sx={{ fontSize: "15px", color: 'grey' }}>{userData.mobile}</Typography>

                                            </Grid>



                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: { lg: 'space-evenly', md: 'space-evenly', sm: 'space-evenly', xs: 'space-between' }, alignItems: 'center', p: '15px 0px' }}>
                                                <Button variant='contained' sx={{ fontSize: { lg: '13px', md: '12px', sm: '11px', xs: '11px' }, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'black', color: 'white' } }} onClick={passwordHandler}>Change password</Button>
                                                <Button variant='contained' sx={{ fontSize: { lg: '13px', md: '12px', sm: '11px', xs: '11px' }, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'black', color: 'white' } }} onClick={editProfile}>edit profile</Button>
                                            </Grid>

                                        </Grid>

                                }

                            </Grid>



                        </Paper>


                    </Grid>
                </Grid>


            </Container>

            <ChangePassword passOpen={passOpen} setPassOpen={setPassOpen} userData={userData} fetchUserDetails={fetchUserDetails} />
            <EditProfile openEdit={openEdit} setOpenEdit={setOpenEdit} userData={userData} fetchUserDetails={fetchUserDetails} />

        </>
    )
}

export default Profile