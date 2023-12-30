'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import CustomSkeleton from '@/components/CustomSkeleton';
import Image from 'next/image';
import gif1 from '../../../../../assets/gif1.gif'
import EditItemsModal from '@/components/EditItemsModal';

const Allitem = () => {
    const param = useParams();
    // console.log(param)
    const router = useRouter();
    const [itemAllData, setItemAllData] = useState([])
    const [checkData, setCheckData] = useState(false);
    const [hidebtn, setHideBtn] = useState('')
    const tableHead = ['S.No', 'ItemName', 'isAvailable', 'Mrp', 'Srp', 'Action']
    const [itemData, setItemData] = useState(
        {
            open:false,
            details:[{}]
        }
    )
    const addNewItemHandler = () => {
        router.push(`/admin/addnewitem/${param.mid}/${param.cid}`)
    };

    const fetchItemApi = async () => {
        try {
            const getItemData = await axios.get(`/api/item/${param.cid}/`)
            // console.log(getItemData);
            if (getItemData.data.message == 'All Data Fetch') {
                setItemAllData(getItemData.data.resp);
                setCheckData(false)
            }
            if (getItemData.data.message == 'Failed To Fetch Data') {
                // alert(getItemData.data.message);
                setCheckData(true)
            }

        } catch (err) {
            console.log(err);
            alert('Error While Fetching', err.message)

        }

    }



    const deleteHandler = async (id) => {
        console.log(id)
        try {
            const res = await axios.delete(`/api/deleteitem/${id}`);
            // console.log(res);
            if (res.data.message == 'Item Deleted successfully') {
                fetchItemApi();
            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }

    };
    useEffect(() => {
        fetchItemApi();
    }, []);
    // console.log(itemAllData);

    const itemAvailable = async (e, id) => {
        console.log(e)
        setHideBtn(id)
        try {
            const updateItem = await axios.patch(`/api/edititem/${id}`, { isAvailable: e.target.checked });
            // console.log(updateItem);
            if (updateItem.data.message == "Item Update Successfully") {
                fetchItemApi();
                setHideBtn('')
            }
            if (updateItem.data.message == "Failed To Update Item") {
                alert(updateItem.data.message)
                setHideBtn('')
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }

    const editItemHandler=(ele)=>{
        setItemData({...itemData,open:true,details:ele})
    }
    // console.log(param)
    return (
        <>
            <Grid container>
                <AdminPanel />

                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>All Items</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} onClick={addNewItemHandler} >Add new items</Button>

                </Grid>

                {
                    checkData ?
                        <Grid container sx={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '150px', height: '200px', position: 'relative' }}>
                                    <Image src={gif1} alt='No Data' fill objectFit='cover' />
                                </Box>
                            </Grid>

                        </Grid> :
                        <Grid container>
                            {
                                itemAllData.length == 0 ?
                                    <CustomSkeleton tableHead={tableHead} /> :
                                    <Grid container>


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
                                                                itemAllData.map((ele, index) => {
                                                                    // console.log(ele)
                                                                    return (
                                                                        <TableRow key={index}>
                                                                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{index + 1}</TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} >{ele.name} </TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px' }}>

                                                                                {/* <Checkbox checked={ele.isAvailable} /> */}
                                                                                {
                                                                                    hidebtn == ele._id ?
                                                                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <CircularProgress size={22} />
                                                                                        </Box> :
                                                                                        <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <FormControlLabel control={<Checkbox checked={ele.isAvailable} onChange={(e) => { itemAvailable(e, ele._id) }} />} />
                                                                                        </FormGroup>
                                                                                }




                                                                            </TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px', color: 'red', fontWeight: 'bold' }}>Rs {ele.mrp}</TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}>Rs {ele.srp} </TableCell>
                                                                            <TableCell align="center" >

                                                                                <Button variant='contained' color='success' sx={{ fontSize: '10px', m: '2px', }} onClick={()=>{editItemHandler(ele)}}>Edit</Button>
                                                                                <Button variant='contained' color='error' sx={{ fontSize: '10px', m: '2px' }} onClick={() => { deleteHandler(ele._id) }}>Delete</Button>

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
                            }
                        </Grid>
                }
            </Grid>
            <EditItemsModal itemData={itemData} setItemData={setItemData} fetchItemApi={fetchItemApi}/>
        </>
    )
}

export default Allitem