import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import HiredHelper from '../Modals/HiredHelper';
import WorkRequest from '../Modals/WorkRequests';

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
        <Box mt="5%">
            <img
                src={`${require("../allImages/down1.gif")}`} onClick={scrollToBottom}
                sx={{ display: 'block', color: "#1000ff", height: "0%", width: "7%" }}
                style={{
                    display: visible ? 'inline' : 'none', cursor: "pointer", animation: "movebtn 3s ease-in -out infinite",
                    transition: "all .5s ease -in -out"
                }}
            />
        </Box >
    );
}

const HiringProcess = (props) => {
    let navigate = useNavigate()
    const theme = useTheme();
    const dispatch = useDispatch()

    let { userProfile } = useSelector((state) => ({ ...state.profileStore }))

    const [openRequest, setOpenRequest] = useState(false)
    const [openHired, setOpenHired] = useState(false)

    useEffect(() => {
        if (userProfile?.length) {
            !userProfile?.is_profile && navigate("/profile")
        }
    }, [userProfile])

    const onRequestClick = () => {
        setOpenRequest(true)
    }
    const onHireClick = () => {
        setOpenHired(true)
    }
    const handleModelClose = () => {
        setOpenRequest(false);
        setOpenHired(false)
    };

    return (
        <div>
            {openRequest && <WorkRequest click={handleModelClose} />}
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
                    <div>
                        <img src={require("../allImages/helperHome.jpg")} width={"100%"} />
                    </div>
                    <div style={{ height: "99.5%", width: "100%", background: "#000000", opacity: 0.5, position: "absolute", top: 0, }} align="center">

                        <Box mt={"5%"} >
                            <Typography sx={{ typography: { sm: 'h4', xs: 'body2', md: 'h2', } }} style={{ fontWeight: 900, color: "white" }} >
                                FIND YOUR SUITABLE WORK EASILY
                            </Typography>
                            <Grid container item xs={12} sm={6} md={4} justifyContent="center">
                                <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} style={{ fontWeight: 900, color: "white" }} marginTop={"1%"} >
                                    Are you find work ? Now you don't have to roam around for work. You get calls and requests for work directly on your mobile.
                                </Typography>
                            </Grid>
                            <Box mt={"2%"} >
                                <Grid container item xs={12} sm={12} md={12} justifyContent="center">
                                    <Button

                                        // size="large"
                                        // color="#163758"
                                        variant="contained"
                                        onClick={onRequestClick}
                                        sx={{ button: 'sm: "medium" xs="small" md: "large" ', backgroundColor: '#ff001d', color: "white", display: 'block', width: "20%", height: 50 }}
                                    >
                                        SEE REQUESTS
                                    </Button>
                                </Grid>

                            </Box>

                            <Grid container justifyContent="center" >
                                <ScrollButton />
                            </Grid>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} backgroundColor="white">
                    <Grid container justifyContent="center" >
                        <Grid item sm={11} xs={11} md={11}  >

                            <Card elevation={0}>
                                <CardContent sx={{ padding: 0 }}>
                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={12} >
                                            <Typography style={{ fontWeight: 600 }} marginTop={1} variant="h5">
                                                Are you less educated? Or are you not educated? It is always difficult for you to find work. My Helpers helps you find work as per your choice. This service is absolutely free for you.

                                                Now you don't have to roam around for work. For work, you will get a requests from clients on My Helpers site.

                                                You can see client profile. If work is suitable, you can accept it else you can reject.

                                                My Helpers helps you.  For work join My Helpers today. Absolutely free of cost.
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
                        <Grid item sm={12} xs={12} md={12}>
                            <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                                How It Works ?
                            </Typography>
                        </Grid>
                        <Grid item xs={11} md={10} sm={11} marginTop={"1%"}>
                            <Grid container spacing={2} justifyContent="center" >
                                <Grid item xs={6} sm={4} md={2}>
                                    <Grid container>

                                        <Grid item xs={12} sm={12} md={12} >
                                            <img src={require("../allImages/request.png")} onClick={onRequestClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                                            {openRequest && <WorkRequest click={handleModelClose} />}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >See Request</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2}>
                                    <Grid container>

                                        <Grid item xs={12} sm={12} md={12} >
                                            <img src={require("../allImages/accept.png")} onClick={onRequestClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                                            {openRequest && <WorkRequest click={handleModelClose} />}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Accept</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} >
                                            <img src={require("../allImages/relax1.png")} onClick={onHireClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                                            {openHired && <HiredHelper click={handleModelClose} />}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Join</Typography>
                                        </Grid>
                                    </Grid>
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
                                    <Grid container direction="row" justifyContent="center">
                                        <Grid item xs={12} sm={12} md={4} align="center">
                                            <CardMedia
                                                component="img"
                                                sx={{ width: "100%", height: "100%", align: "center" }}
                                                image={require("../allImages/cardimg.jpg")}
                                                alt="Image"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8} align="left"  >
                                            <Typography style={{ fontWeight: 600, textAlign: "justify" }} margin={2} variant="h6">
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

export default HiringProcess