//footer file
import React from 'react'
import '../../App.css';
import { Card, Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';

const Footer = () => {
  return (
    <footer className="footer" sx={{backgroundColor:"#163758"}}>
      <Grid container sx={{ width: "100%", height: 50 }} justifyContent={"center"} >
        <Grid item xs={11.5} sm={11.5} md={11.5} lg={11.5}>
          <Grid container >
            <Grid item xs={4} sm={4} md={4} lg={4} align="left" paddingTop={2} >
              Designed By Vishakha Agarwal
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4} align="center" paddingTop={2} >
              <FacebookIcon /> <InstagramIcon /> <WhatsAppIcon /> <TwitterIcon /> <YouTubeIcon /> <LanguageIcon />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} align="right" paddingTop={2} >
              © Copyright by My Helpers
            </Grid>
          </Grid >
        </Grid>
      </Grid>

    </footer >
  )
}

export default Footer