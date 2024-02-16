'use client'
import AdminPanel from '@/components/AdminPanel'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const AdminAllCategories = () => {
    const [categoryData, setCategoryData] = useState([])
    const [hidebtn, setHidebtn] = useState('')
    const tableHead = ['S.No', 'Category Name', 'isAvailable', 'Image', 'Action'];


    const fetchCategoryDetails = async () => {
        try {
            const res = await axios.get('/api/admincategory');
            // console.log('res data', res);
            if (res.data.message == "Category Data Fetch Successfully") {
                setCategoryData(res.data.resp);
            }
            if (res.data.message == 'Failed To Fetch Data') {
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err);
        }


    };
    console.log(categoryData)

    useEffect(() => {
        fetchCategoryDetails()
    }, [])
    return (
        <>
            <Grid container>
                <AdminPanel />
                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>All_Categories </Typography>

                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'grey' }}>
                                        {
                                            tableHead.map((ele, index) => {
                                                return (

                                                    <TableCell key={index} align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>{ele}</TableCell>
                                                )
                                            })
                                        }


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        categoryData.map((ele, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>{index + 1}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', }}  >{ele.name}</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '14px' }}>
                                                   
                                                        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <CircularProgress size={22} />
                                                        </Box> */}
                                                        <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <FormControlLabel control={<Checkbox checked={ele.isAvailable}/>} />
                                                        </FormGroup>
                                                    </TableCell>
                                                   

                                                    <TableCell align="center" sx={{ fontSize: '14px', }}>
                                                        <Image src={require(`../../../public/upload/${ele.image}`)} height={50} width={50} alt='cat iamge'/>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} >Edit</Button>
                                                        <Button variant='contained' color='error' sx={{ fontSize: '10px' }} >Delete</Button>
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

export default AdminAllCategories