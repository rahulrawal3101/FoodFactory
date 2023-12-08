'use client'
import AdminPanel from '@/components/AdminPanel';
import { Button, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';

const AllCategories = () => {
    const param = useParams();
    const router = useRouter();
    const [catData, setCatData] = useState([]);

    const fetchCatApi = async () => {
        try {
            const getCataData = await axios.get(`/api/category/${param.mid}`);
            setCatData(getCataData.data.resp)
        } catch (err) {
            console.log(err);
            alert('Error while Fetching', err.message)

        }
    }
    // console.log('/api/category/ajjhahh767t698gyh78g67hy8')
   
    const addnewCatHandler = (id) => {
        router.push(`/admin/addnewcategory/${id}`)

    }
    const goToAllItemsHandler = (id) => {
        router.push(`/admin/allitem/${param.mid}/${id}`)

    };

    const deleteHandler = async (id) => {
        console.log(id)
        try {
            const res = await axios.delete(`/api/deletecategory/${id}`);
            console.log(res);
            if(res.data.message == 'Category Deleted Successfully'){
                fetchCatApi();
            }

        } catch (err) {
            console.log(err.message);
            alert(err.message)

        }

    };
    useEffect(() => {
        fetchCatApi();
    }, []);
    // console.log(param)
    // console.log(catData)
    return (
        <>
            <Grid container>
                <AdminPanel />

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>All Categories</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} onClick={() => { addnewCatHandler(param.mid) }} >Add new categories</Button>

                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Category Name</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>isActive</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Image</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        catData.map((ele, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>{index + 1}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', }} onClick={() => { goToAllItemsHandler(ele._id) }} >{ele.name}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}><Checkbox checked={ele.isAvailable} /></TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}></TableCell>
                                                    <TableCell align="center" >
                                                        <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} >Edit</Button>
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
        </>
    )
}

export default AllCategories