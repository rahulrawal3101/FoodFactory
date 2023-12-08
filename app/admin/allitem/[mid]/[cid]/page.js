'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';

const Allitem = () => {
    const param = useParams();
    // console.log(param)
    const router = useRouter();
    const [itemAllData, setItemAllData] = useState([])
    const addNewItemHandler=()=>{
        router.push(`/admin/addnewitem/${param.mid}/${param.cid}`)
    };

    const fetchItemApi = async()=>{
        try{
            const getItemData = await axios.get(`/api/item/${param.cid}/`)
            // console.log(getItemData);
            setItemAllData(getItemData.data.resp)


        }catch(err){
            console.log(err);
            alert('Error While Fetching',err.message)

        }

    }

  

    const deleteHandler=async(id)=>{
        console.log(id)
        try{
            const res = await axios.delete(`/api/deleteitem/${id}`);
            console.log(res);
            if(res.data.message == 'Item Deleted successfully'){
                fetchItemApi();
            }

        }catch(err){
            console.log(err);
            alert(err.message)
        }

    };
    useEffect(()=>{
        fetchItemApi();
    },[]);
// console.log(itemAllData)
    // console.log(param)
  return (
   <>
   <Grid container>
               <AdminPanel/>

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color:'#2196f3' }}>All Items</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} onClick={addNewItemHandler} >Add new items</Button>

                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table  aria-label="simple table">
                                <TableHead sx={{bgcolor:'grey'}} >
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>S.No</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>ItemName</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>isAvtive</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Mrp</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Srp</TableCell>
                                        <TableCell align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

{
    itemAllData.map((ele, index)=>{
        return(
            <TableRow key={index}>
            <TableCell align="center" sx={{ fontSize: '14px' , fontWeight:'bold'}}>{index + 1}</TableCell>
            <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer',fontWeight:'bold' }} >{ele.name} </TableCell>
            <TableCell align="center" sx={{ fontSize: '14px' }}>
                
                <Checkbox checked={ele.isAvailable}/>
            </TableCell>
            <TableCell align="center" sx={{ fontSize: '14px' , color:'red', fontWeight:'bold'}}>Rs {ele.mrp}</TableCell>
            <TableCell align="center" sx={{ fontSize: '14px', color:'green', fontWeight:'bold' }}>Rs {ele.srp} </TableCell>
            <TableCell align="center" >
                
                <Button variant='contained' color='success' sx={{ fontSize: '10px', m: '2px', }} >Edit</Button>
                <Button variant='contained' color='error' sx={{ fontSize: '10px' , m:'2px'}} onClick={()=>{deleteHandler(ele._id)}}>Delete</Button>
               
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

export default Allitem