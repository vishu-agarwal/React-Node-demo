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
import HiredHelper from '../Modals/HiredHelper';
import WorkRequest from '../Modals/WorkRequests';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// import cardimg from '../cardimg.jpg'
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
        <Box mt="">
            <ExpandCircleDownIcon
                onClick={scrollToBottom}

                variant="contained"
                sx={{ display: 'block', color: "#02a1ff", height: { xs: "40%", sm: "60%", md: "70%" }, width: "50%" }}
                style={{
                    display: visible ? 'inline' : 'none', cursor: "pointer", animation: "movebtn 3s ease-in -out infinite",
                    transition: "all .5s ease -in -out"
                }} />
        </Box >
    );
}

const AboutPage = (props) => {
    let navigate = useNavigate()
    const theme = useTheme();
    const [openRequest, setOpenRequest] = useState(false)

    const [openHired, setOpenHired] = useState(false)
    const onRequestClick = () => {

        setOpenRequest(true)
    }

    const onHireClick = () => {

        setOpenHired(true)
    }
    const handleModelClose = () => {
        setOpenRequest(false);
        setOpenHired(false);

    };

    return (
        <div>
            {openRequest && <WorkRequest click={handleModelClose} />}
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
                    <div>
                        <img src={require("../allImages/aboutimg.png")} width={"100%"} />
                    </div>
                    <div style={{ height: "99.5%", width: "100%", background: "", opacity: 0.5, position: "absolute", top: 0, }} align="center">

                        <Box mt={"28%"} >
                            <Grid container justifyContent="center" >
                                <ScrollButton />
                            </Grid>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} backgroundColor="white">
                    <Grid container justifyContent="center" >
                        <Grid item sm={11} xs={11} md={11}  >

                            <Card elevation={0} >
                                <CardContent sx={{ padding: 0 }}>
                                    <Grid container justifyContent="center" >
                                        <Grid item xs={11} sm={10} md={10} >
                                            <Typography style={{ fontWeight: 600, color: "", textAlign: "justify" }} marginTop={1} variant="h5">
                                                My Helpers is the first social impact startup dedicated to eradicate placement
                                                fees and human trafficking for the purpose of forced labour.
                                                Its impact has been recognised by many organisations, including the International Labour Organisation.

                                                For years, migrant domestic workers have been vulnerable to exploitation due to the unethical practices of
                                                employment agencies such as: charging illegal and exorbitant placement fees.
                                                Furthermore, most workers are not in a position to choose their employer.

                                                By empowering foreign domestic workers through an online platform that allows them to find jobs for free,
                                                My Helpers facilitated more than 50,000 recruitments and estimates that more than 60 million euros of
                                                illegal placement fees were saved.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={11} sm={10} md={10} >
                                            <Typography style={{ fontWeight: 600, color: "", textAlign: "justify" }} marginTop={5} variant="h5">
                                                My Helpers provides an online platform, we aim to improve Indian domestic workers' living and working conditions,
                                                enable millions of migrant domestic workers to have access to the job market for free
                                                and foster the disappearance of unethical recruitment agencies.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={11} sm={10} md={10} >
                                            <Typography style={{ fontWeight: 600, color: "", textAlign: "justify" }} marginTop={5} variant="h5">
                                                As an user, You can browse thousands of domestic helper profiles who meet your specific needs
                                                and adapt to your personal habits and values.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={10} md={10} >
                                            <Typography style={{ fontWeight: 600, color: "", textAlign: "justify" }} marginTop={5} variant="h5">
                                                As a domestic helper, You can answer to hundreds of employer job ads to find the family
                                                that will best match your experience and your wishes, for free.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={2} >
                    <Grid container justifyContent="center" >
                        <Grid item xs={11} md={10} sm={11} marginTop={"1%"}>
                            <Grid container spacing={4} justifyContent="center" >
                                <Grid item xs={6} sm={3} md={3}>
                                    <Card elevation={12} sx={{ height: 200, width: 300 }}>
                                        <CardContent sx={{ padding: 0 }}>
                                            <Typography marginTop={2} style={{ fontWeight: 900 }} variant="h4" color="#163758" >
                                                53,500+

                                            </Typography>
                                            <Typography style={{ fontWeight: 900 }} variant="h5"  >

                                                Workers have joined My Helpers to connect directly with nearby Employers
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3}>
                                    <Card elevation={12} sx={{ height: 200, width: 300 }} >
                                        <CardContent sx={{ padding: 0 }}>
                                            <Typography marginTop={2} style={{ fontWeight: 900 }} variant="h4" color="#163758" >
                                                25,300+

                                            </Typography>
                                            <Typography style={{ fontWeight: 900 }} variant="h5"  >

                                                Workers have received employment offers directly from Users
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3}>
                                    <Card elevation={12} sx={{ height: 200, width: 300 }} >
                                        <CardContent sx={{ padding: 0 }}>
                                            < Typography marginTop={2} style={{ fontWeight: 900 }} variant="h4" color="#163758" >
                                                20,500+

                                            </Typography>
                                            <Typography style={{ fontWeight: 900 }} variant="h5" >

                                                Women Workers have received employment offers directly from nearby Employers
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3}>
                                    <Card elevation={12} sx={{ height: 200, width: 300 }}>
                                        <CardContent sx={{ padding: 0 }}>
                                            <Typography marginTop={2} style={{ fontWeight: 900 }} variant="h4" color="#163758" >
                                                1,26,300+

                                            </Typography>
                                            <Typography style={{ fontWeight: 900 }} variant="h5"  >
                                                Family members of Workers have been supported by the My Helpers initiative
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} >
                    <Typography style={{ fontWeight: 500, color: "#163758" }} marginTop={2} marginBottom={2} variant="h3">
                        Why should you find & hire Workers from My Helpers ?
                    </Typography>
                    <Grid container justifyContent="center" >
                        <Grid item sm={11} xs={11} md={11}  >
                            <Card elevation={4} >
                                <CardContent sx={{ padding: 0, backgroundColor: "white" }}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} sm={12} md={6} >
                                            <CardMedia
                                                component="img"
                                                sx={{ width: "100%", height: "100%" }}
                                                image={require("../allImages/cardimg.jpg")}
                                                alt="Image"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} align="left"  >
                                            <Typography style={{ fontWeight: 600, color: "#163758" }} marginTop={1} variant="h6">
                                                Simple choices affect the world we live in.
                                                We are flooded with multiple choices for things we consume every day - Which Tea/Coffee? Which Cereal? Which Car? What kind of Fruits & Vegetables? Etc.
                                                At times, these simple choices we make every moment affect our environment, planet or a group of individuals or community, directly or indirectly. Or else, they are just simple means of earning financial gains.
                                                It is okay if an enterprise earns revenues for itself. However, we believe it would be great if financial gains could also impact the world we live in. And therefore, make the world better than what it is.
                                                With your help, at My Helpers , we have the capabilities to make this happen.
                                                So, go ahead. Connect with your nearby workers directly, without the middlemen in between. And impact the life of one, or a few, of whom you can.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    )
}

export default AboutPage