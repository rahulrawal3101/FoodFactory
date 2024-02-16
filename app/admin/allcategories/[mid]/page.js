'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import CustomSkeleton from '@/components/CustomSkeleton';
import Image from 'next/image';
import gif1 from '../../../../assets/gif1.gif'
import EditCategoriesModal from '@/components/EditCategoriesModal';

const AllCategories = () => {
    const param = useParams();
    const router = useRouter();
    const [catData, setCatData] = useState([]);
    const [checkData, setCheckData] = useState(false);
    const tableHead = ['S.No', 'Category Name', 'isAvailable', 'Image', 'Action'];
    const [hidebtn, setHideBtn] = useState('');
    const [catDetails, setCatDetails] = useState({
        open: false,
        details: {}
    })

    const fetchCatApi = async () => {
        try {
            const getCataData = await axios.get(`/api/category/${param.mid}`);
            // console.log(getCataData)
            if (getCataData.data.message == 'All Data Fetch') {
                setCatData(getCataData.data.resp);
                setCheckData(false)

            }
            if (getCataData.data.message == 'Failed To Fetch Data') {
                // alert(getCataData.data.message);
                setCheckData(true)
            }

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

    const deleteCatHandler = async (id) => {
        // console.log(id)
        try {
            const res = await axios.delete(`/api/deletecategory/${id}`);
            // console.log(res);
            if (res.data.message == 'Category Deleted Successfully') {
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

    const isActiveHandler = async (e, id) => {
        // console.log(e)
        setHideBtn(id)
        try {
            const controlIsActive = await axios.patch(`/api/editcategories/${id}`, { isAvailable: e.target.checked })
            // console.log(controlIsActive)
            if (controlIsActive.data.message == "Category Updated Successfully") {
                fetchCatApi();
                setHideBtn('')
            }
            if (controlIsActive.data.message == 'Failed To Update Category') {
                alert(controlIsActive.data.message);
                setHideBtn('')
            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }

    };

    const editCatHandler = (ele) => {
        // console.log(ele)
        setCatDetails({ ...catDetails, open: true, details: ele })
    }
    return (
        <>
            <Grid container >
                <AdminPanel />
                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>All Categories</Typography>

                </Grid>
                <Grid item xs={12} sx={{ p: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ fontSize: '14px' }} onClick={() => { addnewCatHandler(param.mid) }} >Add new categories</Button>

                </Grid>

                {
                    checkData ?
                        <Grid container sx={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '150px', height: '200px', position: 'relative' }}>
                                    <Image src={gif1} alt='No Data' fill objectFit='cover' />
                                </Box>
                            </Grid>

                        </Grid>
                        :
                        <Grid container>
                            {
                                catData.length == 0 ?
                                    <CustomSkeleton tableHead={tableHead} /> :
                                    <Grid container>


                                        <Grid container>
                                            <Grid item xs={12}>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow sx={{ bgcolor: 'grey' }}>
                                                                {
                                                                    tableHead.map((ele, index) => {
                                                                        return <TableCell key={index} align="center" sx={{ fontSize: '15px', fontWeight: '800' }}>{ele}</TableCell>
                                                                    })
                                                                }


                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                catData.map((ele, index) => {

                                                                    return (
                                                                        <TableRow key={index}>
                                                                            <TableCell align="center" sx={{ fontSize: '14px' }}>{index + 1}</TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px', cursor: 'pointer', }} onClick={() => { goToAllItemsHandler(ele._id) }} >{ele.name}</TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px' }}>

                                                                                {/* <Checkbox checked={ele.isAvailable} /> */}
                                                                                {
                                                                                    hidebtn == ele._id ?
                                                                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <CircularProgress size={22} />
                                                                                        </Box> :
                                                                                        <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                            <FormControlLabel control={<Checkbox checked={ele.isAvailable} onChange={(e) => { isActiveHandler(e, ele._id) }} />} />
                                                                                        </FormGroup>
                                                                                }


                                                                            </TableCell>
                                                                            <TableCell align="center" sx={{ fontSize: '14px' }}>
                                                                                <Image src={require(`../../../../public/upload/${ele.image}`)} height={50} width={50} alt='cat iamge'/>
                                                                            </TableCell>
                                                                            <TableCell align="center" >
                                                                                <Button variant='contained' color='success' sx={{ fontSize: '10px', mr: '20px', }} onClick={() => { editCatHandler(ele) }} >Edit</Button>
                                                                                <Button variant='contained' color='error' sx={{ fontSize: '10px' }} onClick={() => { deleteCatHandler(ele._id) }} >Delete</Button>
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
            <EditCategoriesModal catDetails={catDetails} setCatDetails={setCatDetails} catData={catData} fetchCatApi={fetchCatApi} />
        </>
    )
}

export default AllCategories