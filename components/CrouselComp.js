'use client'
import { Box, Grid } from '@mui/material';
import React from 'react';
// import food1 from '../assets/food1.png';
// import food2 from '../assets/food2.jpg';
// import food3 from '../assets/food3.webp';
import hero1 from '../assets/hero1.jpg';
import hero6 from '../assets/hero6.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.jpg';
import hero5 from '../assets/hero5.webp'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const CrouselComp = () => {
  const images = [{
    silde: hero1,
    caption: "Slide 1"
  },

  {
    silde: hero3,
    caption: "Slide 3"
  },
  {
    silde: hero4,
    caption: "Slide 3"
  }, 
  {
    silde: hero5,
    caption: "Slide 3"
  },
  {
    silde: hero6,
    caption: "Slide 3"
  },


  ]

  const proprietes = {
    duration: 2000,
    transitionDuration: 200,
    infinite: true,
    arrows: true,
  }
  return (
    <Grid container sx={{overflow:'hidden'}}>
      <Grid item xs={12}>
        <Box >
          <Slide {...proprietes}>
            {
              images.map((ele, index) => (
                <Box key={index}>
                  <Box sx={{ backgroundImage: `url(${ele.silde.src})`, display: "flex", alignItems: "center", justifyContent: "center", height: { lg: "550px", md: "550px", sm: "400px", xs: "185px" }, backgroundSize: "100% 100%" }}>

                  </Box>
                </Box>
              ))
            }

          </Slide>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CrouselComp