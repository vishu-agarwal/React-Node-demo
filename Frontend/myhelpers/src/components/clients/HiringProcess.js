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
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
// import { Button } from "../../App.css"
function ScrollTop(props) {
    const { children, window } = props;

    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,

    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-sown-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', top: 50, left: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

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
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'auto'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button
            onClick={scrollToBottom}
            color='warning'
            variant="contained"
            sx={{ my: 2, backgroundColor: '#e91e1e', display: 'block', marginLeft: "25%", marginRight: "20%", marginTop: "4%" }}
            style={{ display: visible ? 'inline' : 'none' }} >Down
        </Button>
    );
}

const HiringProcess = (props) => {
    let navigate = useNavigate()
    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
                    <div>
                        <img src={require("../helperHome.jpg")} height={"100%"} width={"100%"} />
                    </div>
                    <div marginTop={5} style={{ height: "99.5%", width: "50%", background: "#000000", opacity: 0.6, position: "absolute", top: 0, right: "75%", transform: "translateX(-18%)", }}>

                        <ScrollTop {...props}>
                            <Fab sx={{ backgroundColor: "", color: "white" }} size="large" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </ScrollTop>
                        <ScrollButton />
                    </div>
                    <div style={{ height: "99.5%", width: "50%", background: "#000000", opacity: 0.5, position: "absolute", top: 0, left: "75%", transform: "translateX(-18%)", }}>
                        <Typography sx={{ typography: { sm: 'h4', xs: 'body1', md: 'h2' } }} style={{ fontWeight: 900, color: "white" }} marginLeft={"5%"} marginRight={"40%"} marginTop={"10%"} >
                            FIND YOUR SUITABLE WORK EASILY
                        </Typography>

                        <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} style={{ fontWeight: 900, color: "white" }} marginLeft={"5%"} marginRight={"40%"} marginTop={"1%"} >
                            Need skilled help service? Book with us and we will ensure you have safe, secure and responsible manpower.
                        </Typography>
                        <ScrollButton />
                        <Button


                            // color="#163758"
                            variant="contained"
                            onClick={() => navigate("/findHelper")}

                            sx={{ my: 2, backgroundColor: '#e91e1e', display: 'block', marginLeft: "25%", marginRight: "20%", marginTop: "4%" }}
                        >
                            ENQUIRY
                        </Button>
                    </div>
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
                                        <img src={require("../accept.png")} style={{ borderRadius: "50%", cursor: "pointer"}} height={"100%"} width={"100%"} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Accept</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <Grid container>

                                    <Grid item xs={12} sm={12} md={12} >
                                        <img src={require("../relax1.png")} style={{ borderRadius: "50%",cursor:"pointer" }} height={"100%"} width={"100%"} />
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
        </div>
    )
}

export default HiringProcess