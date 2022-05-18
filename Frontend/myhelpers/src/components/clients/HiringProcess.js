import React from 'react'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate, useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
// import { Button } from "../../App.css"
import { useTheme } from '@mui/material/styles';

import CardMedia from '@mui/material/CardMedia';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const ScrollButton = () => {

    const [visible, setVisible] = useState(true)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 0) {
            setVisible(false)
        }
        else if (scrolled <= 0) {
            setVisible(true)
        }
    };

    const scrollToBottom = () => {
        // window.scrollTo({
        //     top: document.documentElement.scrollHeight,
        //     behavior: 'auto'
        //     /* you can also use 'auto' behaviour 
        //        in place of 'smooth' */
        // });
        window.scroll({
            top: document.documentElement.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <ExpandCircleDownIcon
            onClick={scrollToBottom}

            size="large"

            variant="contained"
            sx={{ display: 'block', color: "white", height: "80%", width: "5%", marginTop: "5%" }}
            style={{ display: visible ? 'inline' : 'none', cursor: "pointer" }} />

    );
}

const HiringProcess = (props) => {
    let navigate = useNavigate()
    const theme = useTheme();
    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
                    <div>
                        <img src={require("../helperHome.jpg")} height={"100%"} width={"100%"} />
                    </div>
                    <div style={{ height: "99.5%", width: "100%", background: "#000000", opacity: 0.5, position: "absolute", top: 0 }}>


                        <Typography sx={{ typography: { sm: 'h4', xs: 'body1', md: 'h2' } }} style={{ fontWeight: 900, color: "white" }} marginLeft={"5%"} marginRight={"5%"} marginTop={"5%"} >
                            FIND YOUR SUITABLE WORK EASILY
                        </Typography>

                        <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} style={{ fontWeight: 900, color: "white" }} marginLeft={"30%"} marginRight={"30%"} marginTop={"1%"} >
                            Are you find work ? Now you don't have to roam around for work. You get calls and requests for work directly on your mobile.
                        </Typography>
                        <Grid container justifyContent="center">
                            <Button

                                size="large"
                                // color="#163758"
                                variant="contained"
                                // onClick={ }
                                sx={{ backgroundColor: '#00a7ff', color: "white", display: 'block', marginTop: "2%", width: "20%", height: 50 }}
                            >
                                SEE ENQUIRY
                            </Button>
                        </Grid>
                        <Grid container justifyContent="center" >
                            <ScrollButton />
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} backgroundColor="white">
                    <Grid container justifyContent="center" >
                        <Grid item sm={11} xs={11} md={11}  >
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">

                                            Why should you find & hire Workers from My Helpers ?
                                        </Typography>
                                        {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Mac Miller
                                        </Typography> */}
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <Typography style={{ fontWeight: 600, color: "#163758" }} marginTop={1} variant="h5">
                                        Simple choices affect the world we live in.

                                        We are flooded with multiple choices for things we consume every day - Which Tea/Coffee? Which Cereal? Which Car? What kind of Fruits & Vegetables? Etc.

                                        At times, these simple choices we make every moment affect our environment, planet or a group of individuals or community, directly or indirectly. Or else, they are just simple means of earning financial gains.

                                        It is okay if an enterprise earns revenues for itself. However, we believe it would be great if financial gains could also impact the world we live in. And therefore, make the world better than what it is.

                                        At  My Helpers, we believe, with the help of technology, it is possible to make an ecosystem, which can help millions of blue-collar workforce find local employment opportunities. We believe, with a nominal fee, the ecosystem can also sustain itself in the process. We firmly believe that technology today can impact the lives of millions in multiple ways.

                                        With your help, at My Helpers , we have the capabilities to make this happen.

                                        So, go ahead. Connect with your nearby workers directly, without the middlemen in between. And impact the life of one, or a few, of whom you can.
                                    </Typography>
                                    </Box>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: "100%" }}
                                    image={require("../meet4.jpg")}
                                    alt="Image"
                                />
                            </Card>
                            <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                                <CardContent sx={{ padding: 0 }}>
                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={12} >
                                            <Typography style={{ fontWeight: 600, color: "#163758" }} marginTop={1} variant="h5">
                                                Are you less educated? Or are you not educated? It is always difficult for you to find work. My Helpers helps you find work as per your choice. This service is absolutely free for you.

                                                Now you don't have to roam around for work. For work, you will get a requests from clients on My Helpers site.

                                                You can see client profile. If work is suitable, you can accept it else you can reject.

                                                My Helpers helps you.  For work join My Helpers today. Absolutely free of cost.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} >
                                            <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Cook/Chef</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                          
                        </Grid>
                        <Grid item sm={11} xs={11} md={11}  >
                            <Typography style={{ fontWeight: 600, color: "#163758" }} marginTop={1} variant="h5">
                                <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                                   
                                Why should you find & hire Workers from My Helpers ?
                                </Typography>
                                Simple choices affect the world we live in.

                                We are flooded with multiple choices for things we consume every day - Which Tea/Coffee? Which Cereal? Which Car? What kind of Fruits & Vegetables? Etc.

                                At times, these simple choices we make every moment affect our environment, planet or a group of individuals or community, directly or indirectly. Or else, they are just simple means of earning financial gains.

                                It is okay if an enterprise earns revenues for itself. However, we believe it would be great if financial gains could also impact the world we live in. And therefore, make the world better than what it is.

                                At  My Helpers, we believe, with the help of technology, it is possible to make an ecosystem, which can help millions of blue-collar workforce find local employment opportunities. We believe, with a nominal fee, the ecosystem can also sustain itself in the process. We firmly believe that technology today can impact the lives of millions in multiple ways.

                                With your help, at My Helpers , we have the capabilities to make this happen.

                                So, go ahead. Connect with your nearby workers directly, without the middlemen in between. And impact the life of one, or a few, of whom you can.
                    </Typography>
                        </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} margin={2} >
                <Grid container justifyContent="center" >
                    <Grid item sm={12} xs={12} md={12}>
                        <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                            How It Works ?
                        </Typography>
                    </Grid>
                    <Grid item xs={11} md={10} sm={11} marginTop={"1%"}>
                        <Grid container spacing={1} justifyContent="center" >
                            <Grid item xs={6} sm={4} md={2}>
                                <Grid container>

                                    <Grid item xs={12} sm={12} md={12} >
                                        <img src={require("../request.png")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >See Request</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Grid container>

                                    <Grid item xs={12} sm={12} md={12} >
                                        <img src={require("../accept.png")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Accept</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Grid container>

                                    <Grid item xs={12} sm={12} md={12} >
                                        <img src={require("../relax1.png")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Hire</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
        </div >
    )
}

export default HiringProcess