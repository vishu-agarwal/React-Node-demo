import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSaveUserThunk, fetchAllThunk, saveThunk } from '../../store/slices/display-slice';

import { starThunk } from '../../store/slices/profile-slice';
const HireRequestCard = (props) => {
    // console.log("status::",props.status)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { status, error } = useSelector((state) => ({ ...state.displayStore }))

    const onViewClick = () => {
        navigate(`/viewHelperDetails/${props.values.user_id}`)
    }

    return (
        <>
            <Card sx={{
                maxWidth: "90%", maxHeight: "90%",
                marginTop: 1,
                
            }} elevation={8}

            >
                <CardContent sx={{ padding: 1 }}>
                    <Grid container direction={'row'} spacing={0} >
                        <Grid item xs={12} sm={12}>

                            <Typography color="green" variant="h4" paddingLeft={1} gutterBottom align="left">
                                {String(props.name).toUpperCase()}

                            </Typography>

                        </Grid>

                    </Grid>
                    <Grid container direction={'row'} >

                        <Grid item xs={12} sm={12} align="left" paddingLeft={1}>
                            <Typography gutterBottom sx={{ fontSize: 17 }}  >
                                Status : {


                                    <Typography gutterBottom color={props.values.status ? "#1b5e20" : "#faaf00"} sx={{ fontSize: 20 }} display="inline"> {props.values.status ? "Hired!" : "Pending!"}</Typography>

                                }
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 17 }} >
                            Work : {
                                props.values.work.map((value, index) => {
                                    return value + ", "
                                })}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 17 }}  >
                            {/* //yyyy-mm-dd */}
                            Date : {props.values.fromDate} to {props.values.toDate}

                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 17 }} >
                            Time : {props.values.fromTime} to {props.values.toTime}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 17 }}  >
                            Description :{props.values.description}
                        </Typography>
                        {/* {
                                props.hireStatus.length !== 0 ?
                                    // console.log("status::",)
                                    <>
                                        <Typography gutterBottom sx={{ fontSize: 15 }} display="inline">Hire Status :</Typography>
                                        <Typography gutterBottom color={props.hireStatus[0] ? "#1b5e20" : "#faaf00"} sx={{ fontSize: 15 }} display="inline"> {props.hireStatus[0] ? "Hired!" : "Pending!"}</Typography>
                                    </>
                                    : ''
                            } */}
                        <Button sx={{ float: "right", padding: 0,  fontSize: 18 }} onClick={onViewClick}>View Details </Button>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
        </>
    );
}

export default HireRequestCard