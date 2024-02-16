'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useScrollTrigger } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminAllItems = () => {
    const [itemsData, setItemsData] = useState([]);
    const tableHead = ['S.No', 'ItemName', 'isAvailable', 'Mrp', 'Srp', 'Action'];

    const fetchItemData =async ()=>{
        try{
            const res = await axios.get('/api/adminallitems');
            // console.log(res);
            if(res.data.message == 'Items Data Fetch Successfully'){
                setItemsData(res.data.resp)
            }
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }
    useEffect(()=>{
        fetchItemData();
    },[]);

    console.log(itemsData)

  return (
    <>
    <Grid container>
        <AdminPanel/>
        <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>All_Items </Typography>

                </Grid>
    <Grid container>
                                            <Grid item xs={12}>
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="simple table">
                                                        <TableHead sx={{ bgcolor: 'grey' }} >
                                                            <TableRow>
                                                                {
                                                                    tableHead.map((ele, index) => {
                                                                        return <TableCell key={index} align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>{ele}</TableCell>
                                                                    })
                                                                }


                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>

                                                            {
                                                                itemsData.map((ele,index)=>{
                                                                    return (
                                                                        <TableRow key={index}>
                                                                        <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>1</TableCell>
                                                                        <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} >{ele.name} </TableCell>
                                                                        <TableCell align="center" sx={{ fontSize: '14px' }}>

                                                                                    <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                        <FormControlLabel control={<Checkbox checked={ele.isAvailable} />} />
                                                                                    </FormGroup>
                                                                            
                                                                        </TableCell>
                                                                        <TableCell align="center" sx={{ fontSize: '14px', color: 'red', fontWeight: 'bold' }}>Rs {ele.mrp}</TableCell>
                                                                        <TableCell align="center" sx={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}>Rs {ele.srp} </TableCell>
                                                                        <TableCell align="center" >

                                                                            <Button variant='contained' color='success' sx={{ fontSize: '10px', m: '2px', }} >Edit</Button>
                                                                            <Button variant='contained' color='error' sx={{ fontSize: '10px', m: '2px' }} >Delete</Button>

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

export default AdminAllItems