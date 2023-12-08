'use client'
import AddNewUser from '@/components/AddNewUserModal';
import AdminPanel from '@/components/AdminPanel';
import EditAdminUser from '@/components/EditAdminUserModal';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { set } from 'mongoose';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const router = useRouter();
    const [userData, setUserData] = useState([]);
    const [open, setOpen] = useState(false);
    const [hidebtn, setHideBtn] = useState('');
    const [openEdit, setOpenEdit] = useState({
        details:{},
        open:false

    })


    const fetchUserApi = async () => {
        try {
            const body = await axios.get('/api/user');
            // console.log(body.data.resp)
            setUserData(body.data.resp)

        } catch (err) {
            console.log(err);
            alert(err.message)
        }

    };

    useEffect(() => {
        fetchUserApi();
    }, []);

    const goToAddNewUser = () => {
        setOpen(true)

    };

    const deleteHandler = async (id) => {
        // console.log(id)
        try {
            const body = await axios.delete(`/api/user/${id}`);
            // console.log(body);
            if (body.data.message == "User Delete successfully") {
                alert(body.data.message);

                fetchUserApi();
            } else {
                alert(body.data.message);

            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }


    };

    const allAddressHandler = (id) => {
        router.push(`/admin/useraddress/${id}`);

    };

    const userActiveHandler = async (e, id) => {
        setHideBtn(id)
        try {
            const res = await axios.patch(`/api/userisactivecontrol/${id}`, { isActive: e.target.checked });
            console.log(res);
            if (res.data.message == 'User Updated Successfully') {
                fetchUserApi();
                setHideBtn('')
            } else {
                alert(res.data.message);
                setHideBtn('')
            }
        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    };

    const editHandler = (ele) => {
    //    console.log(ele)
        setOpenEdit({
            open:true,
            details:ele
        })
    }
    // console.log(userData)

    return (
        <>
            <Grid container>
                <AdminPanel />

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>ALL USERS</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} onClick={goToAddNewUser}>Add new user</Button>

                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ bgcolor: 'grey' }}>
                                    <TableRow >
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >UserName</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }} >IsActive</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Mobile </TableCell>
                                        {/* <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Password</TableCell> */}
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        userData.map((ele, index) => {
                                            // console.log(ele)

                                            return (
                                                <TableRow key={index} >
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{index + 1}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { allAddressHandler(ele._id) }}>{ele.fullName}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                        {
                                                            hidebtn == ele._id ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CircularProgress size={22} />
                                                            </Box> :
                                                                <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <FormControlLabel control={<Checkbox checked={ele.isActive} />} onChange={(e) => { userActiveHandler(e, ele._id) }} />
                                                                </FormGroup>
                                                        }
                                                        {/* <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <FormControlLabel control={<Checkbox checked={ele.isActive} />} onChange={(e) => { userActiveHandler(e, ele._id) }} />
                                                                </FormGroup> */}


                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.email}  </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{ele.mobile}</TableCell>
                                                    {/* <TableCell align="center" sx={{ fontSize: '14px',fontWeight:'bold' }}>1234567890</TableCell> */}
                                                    <TableCell align="center" >
                                                        <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} onClick={() => { editHandler(ele) }}>Edit</Button>
                                                        <Button variant='contained' color='error' sx={{ fontSize: '10px' }} onClick={() => { deleteHandler(ele._id) }} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }






                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>


            </Grid>

            <AddNewUser open={open} setOpen={setOpen} fetchUserApi={fetchUserApi} />
            <EditAdminUser openEdit={openEdit} setOpenEdit={setOpenEdit} fetchUserApi={fetchUserApi} />
        </>
    )
}

export default AllUsers