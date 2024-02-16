'use client'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import p1 from '../../assets/p1.jpg';
import p2 from '../../assets/p2.jpg';
import p3 from '../../assets/p3.jpg';
import p4 from '../../assets/p4.jpg';
import Image from 'next/image';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';
import veg1 from '../../assets/veg1.jpg';
import veg2 from '../../assets/veg2.jpg';
import veg3 from '../../assets/veg3.jpg'




const imgArr = [
    {
        img: p1,
        title: 'App Development',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p2,
        title: 'Web Design',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p3,
        title: 'Landing Page Design',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p4,
        title: 'Web Development',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p1,
        title: 'App Development',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p2,
        title: 'Web Design',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p3,
        title: 'Landing Page Design',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },
    {
        img: p4,
        title: 'Web Development',
        desc: 'Crafting innovative mobile applications with cutting-edge technologies. Our expert team ensures seamless user experiences and efficient functionality. Elevate your business with our custom app development solutions.'
    },

]

const catArr = ['Indian Food', 'Chinese Food', 'Punjabi Food', 'Nepali Food', 'Burgers', 'Cold Drinks', 'Pizza']

const SecondMenu = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);



    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1700); // Set your threshold for small screen width
        };

        // Initial check and event listener for window resize
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <Container disableGutters maxWidth='xl'>
                <Grid container>
                    <Grid item xs={12} >
                        <ReactSimplyCarousel

                            activeSlideIndex={activeSlideIndex}
                            onRequestChange={setActiveSlideIndex}
                            itemsToShow={1}
                            itemsToScroll={1}
                            autoplay={true}
                            autoplayDelay={2000}

                            // visibleSlideProps={{style:{border:'1px solid red'}}}

                            forwardBtnProps={{
                                //here you can also pass className, or any other button element attributes
                                style: {
                                    alignSelf: 'center',
                                    background: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    height: 30,
                                    lineHeight: 1,
                                    textAlign: 'center',
                                    width: 30,
                                    display: isSmallScreen ? 'none' : 'block', // Hide on small screens
                                },
                                children: <span>{`>`}</span>,
                            }}
                            backwardBtnProps={{
                                //here you can also pass className, or any other button element attributes
                                style: {
                                    alignSelf: 'center',
                                    background: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    height: 30,
                                    lineHeight: 1,
                                    textAlign: 'center',
                                    width: 30,
                                    display: isSmallScreen ? 'none' : 'block', // Hide on small screens
                                },
                                children: <span>{`<`}</span>,
                            }}
                            responsiveProps={[
                                {
                                    itemsToShow: 2,
                                    itemsToScroll: 1,
                                    minWidth: 480,

                                },
                                {
                                    itemsToShow: 3,
                                    itemsToScroll: 1,
                                    minWidth: 600,
                                },
                                {
                                    itemsToShow: 4,
                                    itemsToScroll: 1,
                                    minWidth: 1024,
                                },
                            ]}

                            speed={300}
                            easing="linear"
                            centerMode



                        >




                            {
                                imgArr.map((ele, index) => {


                                    return (
                                        <Box sx={{ alignSelf: 'center', position: 'relative',  }}>


                                            <Box sx={{ width: { lg: 380, md: 360, sm: 220, xs: 280 }, height: { lg: 310, md: 300, sm: 200, xs: 170 }, alignSelf: 'center', borderRadius: '15px', p: "30px",  }}>
                                                <Image src={ele.img} style={{ width: '100%', height: '100%', borderRadius:'10px' }} />



                                            </Box>
                                        </Box>
                                    )
                                })
                            }


                        </ReactSimplyCarousel>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Grid item xs={10} sx={{ borderBottom: '1px solid lightgrey' }}>
                        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', p: '15px 0px' ,}}>
                            <Grid item xs={3} >
                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>CATEGORIES</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Box sx={{ border: '1px solid grey', p: '4px 10px', borderRadius: '8px' }}>
                                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green' }}>Veg</Typography>
                                </Box>
                                <Box sx={{ border: '1px solid grey', p: '4px 10px', borderRadius: '8px' }}>
                                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: 'red' }}>Price</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid grey', p: '4px 8px', borderRadius: '8px' }} >
                                    <FilterAltIcon sx={{ color: 'orange', fontSize: '17px' }} />
                                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>Filter</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={10} sx={{mt:'10px'}}>
                        <Grid container>
                            <Grid item xs={3} >
                                {
                                    catArr.map((ele) => {
                                        return (
                                            <Typography sx={{ fontSize: '19px', p: '5px 0px',color:'grey',cursor:'pointer','&:hover':{color:'#ef6c00'}  }}>{ele}</Typography>

                                        )
                                    })
                                }

                            </Grid>
                            <Grid item xs={9} >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#212121' }}>BOWLS</Typography>

                                    </Grid>


                                    <Grid container sx={{justifyContent:'space-between', alignItems:'flex-start'}}>
                                        <Grid item xs={3.7} >
                                            <Grid container component={Paper} elevation={0} sx={{borderRadius:'5px'}}>
                                                <Grid item xs={12} sx={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                                                    <Box sx={{width:'12px', height:'12px', display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid green'}}>
                                                        <CircleIcon  sx={{color:'green', fontSize:'8px'}}/>
                                                    </Box>
                                                    <Typography sx={{fontSize:'13px', color:'grey', ml:'6px', }}>PAN-ASIAN</Typography>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{width:'100%', mt:'8px',height:'200px',cursor:'pointer','&:hover':{transform:'scale(1.01)', transition:'transform 300ms'}}}>
                                                        <Image src={veg1} alt='veg' style={{width:'100%', height:'100%',borderRadius:'10px'}}/>

                                                    </Box>

                                                </Grid>
                                                <Grid item xs={12} sx={{p:'2px'}}>
                                                    <Typography sx={{fontSize:'16px', mt:'5px'}}>Sakoni hot paneer rice bowl</Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{display:'flex', p:'2px',justifyContent:'space-between', alignItems:'center'}}>
                                                    <Box>
                                                        <Typography sx={{fontSize:'19px', }}>₹149 <del style={{fontSize:'14px', color:'grey'}}>₹299</del></Typography>
                                                        <Typography sx={{fontSize:'15px', color:'grey'}}>50% off</Typography>
                                                    </Box>
                                                    <Button sx={{background:'linear-gradient(103deg, rgba(245,154,81,1) 6%, rgba(230,85,32,1) 42%)', color:'white', p:'5px 35px', borderRadius:'20px', fontWeight:'bold'}}>Add</Button>

                                                </Grid>
                                                <Grid item xs={12} sx={{p:'2px', pb:'10px'}}>
                                                    <Box sx={{width:'150px',border:'1px solid #ffc400',borderRadius:'10px',p:'4px', display:'flex', justifyContent:'space-around', alignItems:'center' }}>
                                                        <StarIcon sx={{fontSize:'13px', color:'#ffd740'}}/>
                                                        <Typography sx={{fontSize:'14px', color:'grey'}}> New On The Menu</Typography>
                                                    </Box>

                                                </Grid>
                                            </Grid>

                                        </Grid>


                                        <Grid item xs={3.7} >
                                            <Grid container component={Paper} elevation={0} sx={{borderRadius:'5px'}}>
                                                <Grid item xs={12} sx={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                                                    <Box sx={{width:'12px', height:'12px', display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid green'}}>
                                                        <CircleIcon  sx={{color:'green', fontSize:'8px'}}/>
                                                    </Box>
                                                    <Typography sx={{fontSize:'13px', color:'grey', ml:'6px', }}>PAN-ASIAN</Typography>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{width:'100%', height:'200px',cursor:'pointer','&:hover':{transform:'scale(1.01)', transition:'transform 300ms'}}}>
                                                        <Image src={veg2} alt='veg' style={{width:'100%', height:'100%',borderRadius:'10px'}}/>

                                                    </Box>

                                                </Grid>
                                                <Grid item xs={12} sx={{p:'2px'}}>
                                                    <Typography sx={{fontSize:'16px', mt:'5px'}}>Sakoni hot paneer rice bowl</Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{display:'flex', p:'2px',justifyContent:'space-between', alignItems:'center'}}>
                                                    <Box>
                                                        <Typography sx={{fontSize:'19px', }}>₹149 <del style={{fontSize:'14px', color:'grey'}}>₹299</del></Typography>
                                                        <Typography sx={{fontSize:'15px', color:'grey'}}>50% off</Typography>
                                                    </Box>
                                                    <Button sx={{background:'linear-gradient(103deg, rgba(245,154,81,1) 6%, rgba(230,85,32,1) 42%)', color:'white', p:'5px 35px', borderRadius:'20px', fontWeight:'bold'}}>Add</Button>

                                                </Grid>
                                                <Grid item xs={12} sx={{p:'2px', pb:'10px'}}>
                                                    <Box sx={{width:'150px',border:'1px solid #ffc400',borderRadius:'10px',p:'4px', display:'flex', justifyContent:'space-around', alignItems:'center' }}>
                                                        <StarIcon sx={{fontSize:'13px', color:'#ffd740'}}/>
                                                        <Typography sx={{fontSize:'14px', color:'grey'}}> New On The Menu</Typography>
                                                    </Box>

                                                </Grid>
                                            </Grid>

                                        </Grid>


                                        <Grid item xs={3.7} >
                                            <Grid container component={Paper} elevation={0} sx={{borderRadius:'5px'}}>
                                                <Grid item xs={12} sx={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                                                    <Box sx={{width:'12px', height:'12px', display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid green'}}>
                                                        <CircleIcon  sx={{color:'green', fontSize:'8px'}}/>
                                                    </Box>
                                                    <Typography sx={{fontSize:'13px', color:'grey', ml:'6px', }}>PAN-ASIAN</Typography>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{width:'100%', height:'200px',cursor:'pointer','&:hover':{transform:'scale(1.01)', transition:'transform 300ms'}}}>
                                                        <Image src={veg3} alt='veg' style={{width:'100%', height:'100%',borderRadius:'10px'}}/>

                                                    </Box>

                                                </Grid>
                                                <Grid item xs={12} sx={{p:'2px'}}>
                                                    <Typography sx={{fontSize:'16px', mt:'5px'}}>Sakoni hot paneer rice bowl</Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{display:'flex', p:'2px',justifyContent:'space-between', alignItems:'center'}}>
                                                    <Box>
                                                        <Typography sx={{fontSize:'19px', }}>₹149 <del style={{fontSize:'14px', color:'grey'}}>₹299</del></Typography>
                                                        <Typography sx={{fontSize:'15px', color:'grey'}}>50% off</Typography>
                                                    </Box>
                                                    <Button sx={{background:'linear-gradient(103deg, rgba(245,154,81,1) 6%, rgba(230,85,32,1) 42%)', color:'white', p:'5px 35px', borderRadius:'20px', fontWeight:'bold'}}>Add</Button>

                                                </Grid>
                                                <Grid item xs={12} sx={{p:'2px', pb:'10px'}}>
                                                    <Box sx={{width:'150px',border:'1px solid #ffc400',borderRadius:'10px',p:'4px', display:'flex', justifyContent:'space-around', alignItems:'center' }}>
                                                        <StarIcon sx={{fontSize:'13px', color:'#ffd740'}}/>
                                                        <Typography sx={{fontSize:'14px', color:'grey'}}>New On The Menu</Typography>
                                                    </Box>

                                                </Grid>
                                            </Grid>

                                        </Grid>


                                        
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>


            </Container>
        </>
    )
}

export default SecondMenu