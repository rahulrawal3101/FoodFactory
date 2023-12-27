'use client'
import { Badge, Box, Divider, Fab, Grid, InputBase, Paper, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Image from 'next/image';
import food1 from '../../../assets/food1.png';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import burger from '../../../assets/burger1.jpg';
import burger1 from '../../../assets/burger2.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import pizza2 from '../../../assets/pizza2.jpg';
import rice from '../../../assets/rice.png';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AddToCartModal from '@/components/AddToCartModal';
import NavigationIcon from '@mui/icons-material/Navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import gif1 from '../../../assets/gif1.gif'


const MenuPage = () => {
    const router = useRouter();
    const param = useParams();
    const skelArr = new Array(10).fill(1);
    console.log(param)

    const [category, setCategory] = useState([]);
    const [item, setItem] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [checkData, setCheckData] = useState(false)


    const [modalData, setModalData] = useState({
        open: false,
        data: {}
    })


    // console.log(param.menupagewithid)
    const fetchProductApi = async () => {

        try {
            const getProductData = await axios.get(`/api/products/${param.menupagewithid}`)
            // console.log(getProductData);
            if (getProductData.data.message == "Data Fetch Successfully") {

                setCategory(getProductData.data.respCat);
                setItem(getProductData.data.respItem);
                // setCheckData(true)

            }
            if (getProductData.data.message == 'Failed To Fetch Data') {
                setCategory(getProductData.data.respCat);
                setItem(getProductData.data.respItem);
                setCheckData(true)

            }

        } catch (err) {
            console.log(err)
        }

    }
    console.log(item)
    console.log(item);
    console.log(category)
    useEffect(() => {
        fetchProductApi();
    }, []);

    const newItem = item.map((ele) => { return { ...ele, qty: 0 } });
    // console.log(newItem.length)

    const OpenModalHandler = (ele) => {

        if (localStorage.getItem('UID')) {

            setModalData({ ...modalData, open: true, data: ele });
        }
        else {
            router.push('/login')
        }

    };
    const goTOCartPage = () => {
        router.push(`/checkout/${JSON.parse(localStorage.getItem('UID'))}`);
    };

    const fetchCartApi = async () => {
        const uid = await JSON.parse(localStorage.getItem('UID'))
        try {
            const res = await axios.get(`/api/cart/${uid}`);
            // console.log(res);
            if (res.data.message == 'Data Fetch Successfully') {

                setCartData(res.data.resp);

            }
            if (res.data.message == 'Failed To Fetch Data') {
                setCartData(res.data.resp);

            }

        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    }
    useEffect(() => {
        fetchCartApi();
    }, [])

    console.log(cartData.length)


    // console.log(param);

    // const goToAddressPage=()=>{
    //     router.push(`/address/${JSON.parse(localStorage.getItem('UID'))}`);
    // }
    // console.log(item)

    // console.log(localStorage.getItem('UID'))
    return (
        <>
            <Grid container sx={{ bgcolor: '#f5f5f5' }}>
                {/* <Header /> */}

                <Grid container sx={{ p: '10px 12px', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Grid item lg={4} md={4} sm={5} xs={5}>
                        <Typography sx={{ fontWeight: '800', fontSize: { lg: '30px', md: '27px', sm: '22px', xs: '20px' } }}>Menu Page</Typography>

                    </Grid>
                    <Grid item lg={2} md={2} sm={3} xs={6} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FoodBankIcon sx={{ fontSize: { lg: '28px', md: '25px', sm: '25px', xs: '23px' }, color: '#212121', cursor: 'pointer' }} />
                        <NotificationsOutlinedIcon sx={{ fontSize: { lg: '28px', md: '25px', sm: '25px', xs: '23px' }, color: '#212121', cursor: 'pointer' }} />
                        <SettingsSuggestIcon sx={{ fontSize: { lg: '28px', md: '25px', sm: '25px', xs: '23px' }, color: '#212121', cursor: 'pointer', mr: '3px' }} />
                        <Box sx={{ width: '50px', height: '46px', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                            <Image src={food1} alt='food' fill objectFit='cover' style={{ borderRadius: '10px', }} />
                        </Box>

                    </Grid>
                </Grid>
                <Grid container sx={{ p: '10px 12px', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Grid item lg={4.3} md={5} sm={7} xs={8} sx={{ bgcolor: 'white', borderRadius: '10px' }}>
                        <Box sx={{ padding: '6px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <SearchIcon sx={{ fontSize: '25px', color: 'orange' }} />
                            <InputBase placeholder='What do you want to eat today' sx={{ fontSize: { lg: '15px', md: '15px', sm: '13px', xs: '12px' }, color: 'grey', ml: '10px' }} />
                        </Box>

                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', }}>
                        <Box sx={{ mr: '15px', width: { lg: '40px', md: '40px', sm: '38px', xs: '38px' }, height: { lg: '40px', md: '40px', sm: '38px', xs: '38px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', bgcolor: 'white' }}>

                            <SplitscreenIcon sx={{ fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '18px' }, color: '#212121', }} />
                        </Box>

                        <Box sx={{ width: { lg: '40px', md: '40px', sm: '38px', xs: '38px' }, height: { lg: '40px', md: '40px', sm: '38px', xs: '38px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', bgcolor: '#fff3e0' }}>

                            <GridViewIcon sx={{ fontSize: { lg: '20px', md: '20px', sm: '18px', xs: '18px' }, color: '#ff9800' }} />
                        </Box>

                    </Grid>

                </Grid>
                {/* gif  */}
                {
                    checkData ? <Grid container sx={{ bgcolor:'white'}}>
                        <Grid item xs={12} sx={{ p: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
                            <Box sx={{ width: '30%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' ,  mt:'20px'}}>

                                <Image src={gif1} alt='gif' objectFit='cover' style={{ width: '50%', height: '50%' }} />
                            </Box>
                            {/* <Typography sx={{ textAlign: 'center', color: 'white', fontSize: '19px', fontWeight: 'bold' }}>No Data Found</Typography> */}

                        </Grid>

                    </Grid> :

                        <Grid container>
                            <Categories category={category} />

                            {
                                newItem.length == 0 ?
                                    <Grid container sx={{ justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', overflow: 'hidden', p: '10px', mt: '20px' }}>

                                        {
                                            skelArr.map((ele, index) => {
                                                return <Grid item lg={2.1} md={3} sm={5} xs={12} component={Paper} sx={{ width: { lg: '286px', md: '280px', sm: '280px', xs: '280px' }, m: '10px' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', mt: '5px', p: '5px' }}>
                                                        <Skeleton variant="circular" width={40} height={40} />
                                                    </Box>
                                                    <Skeleton variant="rectangular" sx={{ width: '100%', height: '180px' }} />
                                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '5px', p: '5px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '45%', height: '10px' }} />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '5px', p: '5px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '65%', height: '10px' }} />
                                                    </Box>
                                                    <Box sx={{ p: '5px' }}>
                                                        <Skeleton
                                                            animation="wave"
                                                            height={3}
                                                            width="100%"
                                                            style={{ marginBottom: 6 }}
                                                        />
                                                    </Box>

                                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: '5px', p: '5px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '55%', height: '10px' }} />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '5px', p: '7px' }}>
                                                        <Skeleton variant="rectangular" sx={{ width: '20%', height: '10px' }} />
                                                        <Skeleton variant="circular" width={40} height={40} />
                                                    </Box>




                                                </Grid>
                                            })
                                        }



                                    </Grid> :
                                    <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', }}>

                                        {
                                            newItem.map((ele, index) => {
                                                return (
                                                    <Grid item key={index} lg={2.1} md={3} sm={5} xs={12} sx={{ m: '15px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' }}>
                                                        <Paper sx={{ borderRadius: '10px', cursor: 'pointer' }}>
                                                            <Box sx={{ width: { lg: '220px', md: '220px', sm: '220px', xs: '260px' }, bgcolor: 'white', height: '300px', p: '10px 12px', borderRadius: '10px', }}>


                                                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'flex-end' }}>

                                                                    <FavoriteIcon sx={{ fontSize: '20px', color: '#e53935', mr: '15px', mt: '10px' }} />
                                                                </Box>
                                                                <Box sx={{ height: '150px', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Image alt='burger' src={pizza2} objectFit='cover' style={{ width: '80%', height: '150px', }} />

                                                                </Box>
                                                                <Box sx={{ width: '100%', mt: '8px' }}>
                                                                    <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>{ele.name}</Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <StarIcon sx={{ fontSize: '15px', color: '#ffa000' }} />
                                                                        <Typography sx={{ fontSize: { lg: '13px', md: '13px', sm: '11px', xs: '12px' }, color: 'grey', ml: '7px', wordSpacing: '1px' }}>{ele.rating} <strong>.</strong>{ele.review} Review<strong>.</strong> 2{ele.km}km</Typography>
                                                                    </Box>


                                                                </Box>
                                                                <Divider sx={{ width: '100%', bgcolor: 'lightgrey', mt: '6px', }}></Divider>
                                                                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', mt: '7px' }}>
                                                                    <Grid item xs={7} >
                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>{ele.name}</Typography>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: '6px' }}>

                                                                            {/* <CurrencyRupeeIcon sx={{ fontSize: '22px', color: '#ffa000', fontWeight: 'bold', }} /> */}
                                                                            <Typography sx={{ fontSize: '22px', color: '#ffa000', fontWeight: 'bold', }}>₹</Typography>
                                                                            <Typography sx={{ fontSize: '18px', fontWeight: 'bold', ml: '4px' }}> <del style={{ color: 'red' }}>{ele.mrp}</del> <span style={{ color: 'green' }}>{ele.srp}</span></Typography>
                                                                        </Box>

                                                                    </Grid>
                                                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }} >
                                                                        <AddBoxIcon sx={{ fontSize: { lg: '37px', md: '37px', sm: '37px', xs: '43px' }, color: '#ffb300', }} onClick={() => { OpenModalHandler(ele) }} />

                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Paper>
                                                    </Grid>
                                                )
                                            })
                                        }


                                    </Grid>

                            }

                        </Grid>
                }








            </Grid>

        

         

            {

                cartData.length == 0 ? '' :
                    <Badge color="secondary" overlap="circular" badgeContent={cartData.length} sx={{ position: 'fixed', bottom: 40, right: 40, width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#4caf50',cursor:'pointer' }} onClick={goTOCartPage} >
                        <ShoppingCartIcon sx={{ fontSize: '25px', color: 'white' }} />
                    </Badge>



            }


            <AddToCartModal modalData={modalData} setModalData={setModalData} fetchCartApi={fetchCartApi} />


        </>
    )
}

export default MenuPage