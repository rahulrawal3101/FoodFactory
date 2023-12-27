'use client'
import AdminPanel from '@/components/AdminPanel';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


const EditAllShops = () => {
    const param = useParams();
    const router = useRouter();
    // console.log(param)
    const [sendData, setSendData] = useState('');
    const skelArr = new Array(8).fill(1);
    const [hidebtn, setHideBtn] = useState(true);
    const [backUp, setBackUp] = useState();

   

    const shopDetailsHandler = (e) => {
        // console.log(e.target.name)
        if (e.target.name == 'shopName' || e.target.name == 'foodType' || e.target.name == 'rating' || e.target.name == 'offPercentage' || e.target.name == 'foodForCost' || e.target.name == 'foodFormany' || e.target.name == 'delivery' || e.target.name == 'mobileShop' || e.target.name == 'emailShop' || e.target.name == 'shopAddress') {
            const { name, value } = e.target;
            setSendData({ ...sendData, [name]: value });
          
        }

        if (e.target.name == "isShopBanned" || e.target.name == "isShopOpen" || e.target.name == "isPopular" || e.target.name == "isShopBanned") {
            const { name, checked } = e.target;
            setSendData({ ...sendData, [name]: checked });
          
            
        }
    };

    const fetchShopApi = async () => {
        try {
            const res = await axios.get(`/api/singleshop/${param.id}`);
            // console.log(res);
            if (res.data.message == "Shop Data Fetch Successfully") {
                setSendData(res.data.resp);
                setBackUp(res.data.resp)
            }
            if(res.data.message == 'Failed To Fetch Shop Data'){
               alert(res.data.message) 
            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }

    };
    useEffect(() => {
        fetchShopApi();
    }, []);

    // useEffect(()=>{
        
    //     if(backUp != sendData){
    //         setHideBtn(false)
    //     }
    //     else{
    //         setHideBtn(true) 
    //     }
    // },[])

    console.log(sendData);

    const UpdateShopHandle = async () => {
        console.log(param.id)
        try {
            const updateShop = await axios.patch(`/api/editshop/${param.id}`, sendData);
            console.log(updateShop);
            if (updateShop.data.message == "Shop Update Successfully") {
                fetchShopApi();
                router.back();
                alert(updateShop.data.message)
            }
            if (updateShop.data.message == 'Failed To Update Shop') {
                alert(updateShop.data.message)
            }
        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    }
    return (
        <>
            <Grid container>
                <AdminPanel />
                <Grid item xs={12} sx={{ bgcolor: 'black', p: '10px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '800', textAlign: 'center', color: '#2196f3' }}>Update Shop</Typography>

                </Grid>

                {/* skelton  */}

                {
                    sendData  == ''?
                        <Grid container>
                            {
                                skelArr.map((ele, index) => {
                                    return <Grid container key={index} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', m: '10px' }}>
                                        <Grid item xs={7}>
                                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px', mt: '10px' }} />
                                        </Grid>


                                    </Grid>
                                })
                            }

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Skeleton variant="rectangular" sx={{ width: '30%', height: '40px', mt: '10px' }} />
                            </Grid>
                        </Grid> :


                        <Grid container>
                            <Grid container sx={{ p: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>ShopName :</Typography>
                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='ShopName.......' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='shopName' value={sendData.shopName} />
                                </Grid>

                            </Grid>


                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>FoodType :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <FormControl fullWidth size='small'>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sendData.foodType || 'hello'}
                                            name='foodType'

                                            onChange={shopDetailsHandler}
                                        >
                                            <MenuItem value={'Veg'}>Veg</MenuItem>
                                            <MenuItem value={'Non Veg'}>Non Veg</MenuItem>
                                            <MenuItem value={'Both'}>Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Image :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} >
                                    <Box sx={{ height: "30px", width: "100%", border: '1px solid black', }}>
                                        <Typography sx={{ position: "relative", top: "0px", mt: "4px", textAlign: 'center' }}>
                                            <input type='file' style={{ zIndex: 99, opacity: 0, position: "absolute", left: "0px", top: "0px", height: "30px", width: "100%" }} />
                                            Choose Image
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Rating :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='rating...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='rating' value={sendData.rating} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Offer Discount :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='Offer...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='offPercentage' value={sendData.offPercentage} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Food For Cost :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='Food for cost...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='foodForCost' value={sendData.foodForCost} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Food For Many :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='Food for mnay...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='foodFormany' value={sendData.foodFormany} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Delivery In :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='Delivery in ...' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='delivery' value={sendData.delivery} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Mobile Shop :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='mobileShop ' type='number' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='mobileShop' value={sendData.mobileShop} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Email Shop :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='Email ...' type='email' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='emailShop' value={sendData.emailShop} />
                                </Grid>

                            </Grid>
                            <Grid container sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Typography sx={{ fontSize: { lg: '16px', md: '15px', sm: '14px', xs: '14px' }, textAlign: { lg: 'right', md: 'right', sm: 'left', xs: 'left' }, mr: '10px' }}>Shop Address :</Typography>

                                </Grid>
                                <Grid item lg={7} md={7} sm={12} xs={12} sx={{ color: 'red' }}>
                                    <TextField placeholder='Address ...' sx={{ fontSize: '14px', color: 'red', }} size='small' fullWidth onChange={shopDetailsHandler} name='shopAddress' value={sendData.shopAddress} />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Box>
                                    <FormControl component="fieldset" sx={{ ml: "30px" }}>
                                        <FormGroup aria-label="position" column={'true'}>
                                            <FormControlLabel

                                                sx={{ mt: "15px", ml: "10px" }}
                                                control={<Checkbox size='small' sx={{ ml: "4px", p: "4px" }} name='isShopBanned' checked={sendData.isShopBanned} onChange={shopDetailsHandler} />}
                                                label={<Typography sx={{ mt: "4px", fontSize: "16px", fontWeight: "700" }}>Is Shop Banned</Typography>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel

                                                sx={{ mt: "10px", ml: "10px" }}
                                                control={<Checkbox size='small' sx={{ ml: "3px", p: "4px" }} name='isShopOpen' checked={sendData.isShopOpen} onChange={shopDetailsHandler} />}
                                                label={<Typography sx={{ mt: "4px", fontSize: "16px", fontWeight: "700" }}>Is Shop Open</Typography>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel

                                                sx={{ mt: "10px", ml: "10px" }}
                                                control={<Checkbox size='small' sx={{ ml: "3px", p: "4px" }} name='isPopular' checked={sendData.isPopular} onChange={shopDetailsHandler} />}
                                                label={<Typography sx={{ mt: "4px", fontSize: "16px", fontWeight: "700" }}>Is Popular</Typography>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel

                                                sx={{ mt: "10px", ml: "10px" }}
                                                control={<Checkbox size='small' sx={{ ml: "3px", p: "4px" }} name='isTrending' checked={sendData.isTrending} onChange={shopDetailsHandler} />}
                                                label={<Typography sx={{ mt: "4px", fontSize: "16px", fontWeight: "700" }}>Is Trending</Typography>}
                                                labelPlacement="end"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                               
                                <Button variant='contained' onClick={UpdateShopHandle} disabled={backUp == sendData?true:false }>Update shop</Button>

                            </Grid>
                        </Grid>
                }

            </Grid>
        </>
    )
}

export default EditAllShops