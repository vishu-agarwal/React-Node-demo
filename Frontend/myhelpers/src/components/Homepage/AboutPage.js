import React from 'react'
import { Card, CardContent,  Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
// import { Button } from "../../App.css"
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
        <Box>
            <img
                src={`${require("../allImages/down.gif")}`} onClick={scrollToBottom}
                sx={{ display: 'block', color: "#1000ff", height: "0%", width: "7%" }}
                style={{
                    display: visible ? 'inline' : 'none', cursor: "pointer", animation: "movebtn 3s ease-in -out infinite",
                    transition: "all .5s ease -in -out"
                }}
            />
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
                <Grid item xs={11} sm={11} md={11} margin={1} marginBottom={0} >
                    <Grid container justifyContent="center" >
                        <Grid item sm={12} xs={12} md={12}>
                            <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                                Why My Helpers ?
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12} md={5} marginTop={4}>
                            <Grid container justifyContent="center" >
                                <Grid item sm={12} xs={12} md={12} >
                                    <Accordion elevation={24}>
                                        <AccordionSummary
                                            elevation={24}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Convenient, Easy & Organized</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography textAlign="justify">
                                                It is an Easier, Simpler & Better way of finding Workers. 5 minutes and
                                                just a click of a few buttons, that’s all it takes to find Workers at My Helpers.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item sm={12} xs={12} md={12} marginTop={1}  >
                                    <Accordion elevation={24}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Find & Hire Workers at a free of cost</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography textAlign="justify">
                                                At My Helpers, you get to connect with multiple Workers at a starting fee of ₹0 only
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item sm={12} xs={12} md={12} marginTop={1} >
                                    <Accordion elevation={24}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Empowers the Workers to connect with you directly</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography textAlign="justify">
                                                My Helpers supports the Workers in finding nearby Work Opportunities and
                                                connecting with you directly. Workers join My Helpers free of cost, and on their free will.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item sm={12} xs={12} md={12} marginTop={1} >
                                    <Accordion elevation={24}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>No middlemen & commissions in between</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography textAlign="justify">
                                                At My Helpers, you get to connect with the Workers directly,
                                                so there are no middlemen & commissions in between
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item sm={12} xs={12} md={12} marginTop={1} >
                                    <Accordion elevation={24}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Get the best-shortlisted Workers from a vast pool</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography textAlign="justify">
                                                A unique rating system allows My Helpers to connect you with the best Workers from around
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item sm={12} xs={12} md={12} marginTop={1} >
                                    <Accordion elevation={24}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Speak to multiple Workers at a time</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography textAlign="justify">
                                                If available, My Helpers connects you with multiple Workers from nearby, and not just one or two
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        </div >
    )
}

export default AboutPage