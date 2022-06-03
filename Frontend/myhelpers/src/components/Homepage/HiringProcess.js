import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
        window.scroll({
            top: document.documentElement.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <img src={`${require("../allImages/down1.gif")}`} onClick={scrollToBottom} style={{ width: "10%" }} />
    );
}

const imageList = [
    { images: require("../allImages/request.png"), request: "work", text: "See Request" },
    { images: require("../allImages/accept.png"), request: "work", text: "Accept" },
    { images: require("../allImages/relax1.png"), request: "hire", text: "Join" },
];

const HiringProcess = (props) => {
    let navigate = useNavigate()

    let { userProfile } = useSelector((state) => ({ ...state.profileStore }))

    const [openModal, setOpenModel] = useState(false)
    const [openRequest, setOpenRequest] = useState(false)
    const [openHired, setOpenHired] = useState(false)

    useEffect(() => {
        if (userProfile?.length) {
            !userProfile?.is_profile && navigate("/profile")
        }
    }, [userProfile])

    const onRequestClick = () => {
        setOpenModel(true)
        setOpenRequest(true)
    }
    const onHireClick = () => {
        setOpenModel(true)
        setOpenHired(true)
    }
    const handleModelClose = () => {
        setOpenModel(false)
        setOpenRequest(false);
        setOpenHired(false)
    };

    return (
        <div>
            <Grid container justifyContent="center" marginBottom={5}>
                <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
                    <div>
                        <img src={require("../allImages/helperHome.jpg")} width={"100%"} />
                    </div>
                    <div style={{ height: "99.5%", width: "100%", background: "#000000", opacity: 0.5, position: "absolute", top: 0, }} align="center">
                        <Typography sx={{ typography: { sm: 'h6', xs: 'body2', md: 'h4', lg: 'h3' }, marginTop: { sm: "1%", xs: "0%", md: "2%" } }}
                            style={{ color: "white" }} >
                            FIND YOUR SUITABLE WORK EASILY
                        </Typography>
                        <Grid container item xs={12} sm={6} md={4} justifyContent="center">
                            <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} style={{ color: "white" }}
                                marginTop="1%" >
                                Are you find work ? Now you don't have to roam around for work. You get calls and requests for work directly on your mobile.
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} justifyContent="center">
                            <Button
                                variant="contained"
                                onClick={()=>navigate("/profile")}
                                sx={{
                                    marginTop: { md: "2%" },
                                    button: { sm: "medium", xs: "small", md: "large" }, backgroundColor: '#ff001d', color: "white",
                                    fontSize: "1rem",
                                    display: 'block', width: { sm: '30%', xs: "30%", md: "20%", lg: "20%" }, height: 50
                                }}
                            >
                                Create Profile
                            </Button>
                        </Grid>
                        <Grid container item xs={12} sm={6} md={4} justifyContent="center" sx={{ border: "3px solid white" }} marginTop="1.5%">
                            <Typography align="center" sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }}
                                style={{ color: "white", margin: "2%" }}>
                                -&gt; 1st step login has completed. <br />
                                -&gt; Next step is create your profile for getting work requests from users. <br />
                                -&gt; If already created then ignore it.
                            </Typography>
                        </Grid>
                        <Grid container item justifyContent="center" >
                            <ScrollButton />
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} backgroundColor="white">
                    <Grid container justifyContent="center" >
                        <Grid item sm={11} xs={11} md={11}  >
                            <Card elevation={0}>
                                <CardContent sx={{ padding: 0 }}>
                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={12} >
                                            <Typography marginTop={1} fontSize="22px">
                                                Are you less educated? Or are you not educated? It is always difficult for you to find work. My Helpers helps
                                                you find work as per your choice. This service is absolutely free for you.
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
                            <Typography style={{ color: "#163758" }} marginTop={0} variant="h4">
                                How It Works ?
                            </Typography>
                        </Grid>
                        <Grid item xs={11} md={10} sm={11} marginTop={"1%"}>
                            <Grid container spacing={3} justifyContent="center" >
                                {
                                    imageList.map((val) => {
                                        return <Grid item xs={6} sm={4} md={2} key={`${val.images}`}>
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={12} >
                                                    <img src={val.images} onClick={val.request === "work" ? onRequestClick : onHireClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"80%"} />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography paddingTop={2} variant="h5" color="#163758" >{val.text}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    }
                                    )
                                }
                            </Grid>
                            {openHired && <HiredHelper click={handleModelClose} open={openModal} />}
                            {openRequest && <WorkRequest click={handleModelClose} open={openModal} />}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} >
                    <Typography style={{ color: "#163758" }} marginTop={2} marginBottom={2} variant="h4">
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
                                            <Typography style={{ textAlign: "justify" }} margin={2} fontSize="1.2rem">
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