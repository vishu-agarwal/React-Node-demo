import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Grid, IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Rating from '@mui/material/Rating';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSaveUserThunk, fetchAllThunk, saveThunk } from '../../store/slices/display-slice';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { starThunk } from '../../store/slices/profile-slice';
const HireRequestCard = (props) => {
    // console.log("status::",props.status)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { status, error } = useSelector((state) => ({ ...state.displayStore }))

    const onViewClick = () => {
        navigate(`/viewHelperDetails/${props.values.user_id}`)
    }
    const onAcceptHandler = () => {

    }
    const onDeleteHandler = () => {

    }

    return (
        <>
            <Card sx={{
                maxWidth: "90%", maxHeight: "90%",
                marginTop: 1,

            }} elevation={8}

            >
                <CardContent >
                    <Grid container direction={'row'} spacing={1} >
                        <Grid item xs={10} sm={10}>

                            <Typography color="green" variant="h5" paddingLeft={1} gutterBottom align="left">
                                {String(props.values.name).toUpperCase()}

                            </Typography>

                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            {/* <Tooltip title="Edit">

                                <ModeEditIcon fontSize="medium" color="info" onClick={onEditHandler} />

                            </Tooltip> */}
                            {props.values.status ==="pending!" && <Tooltip title="Accepted">
                                 <CheckIcon fontWeight="fontWeightBold" fontSize="large" color="success" onClick={onAcceptHandler} />
                            </Tooltip>}
                            {/* <CheckOutlinedIcon fontSize="large" sx={{ color:"#faaf00"}} onClick={onEditHandler} /> */}
                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            {props.values.status === "pending!" && <Tooltip title="Delete">

                                <DeleteIcon fontSize="medium" color="error" onClick={onDeleteHandler} />

                            </Tooltip>}
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} >

                        <Grid item xs={12} sm={12} align="left" paddingLeft={1}>
                            <Typography gutterBottom sx={{ fontSize: 15 }} component={'div'} >
                                Status : {


                                    <Typography gutterBottom color={props.values.status ? "#1b5e20" : "#faaf00"} sx={{ fontSize: 16 }} display="inline"> {props.values.status ? "Hired!" : "Pending!"}</Typography>

                                }
                            </Typography>
                            {props.values.message ?
                                <>
                                    <Typography gutterBottom sx={{ fontSize: 15 }}  >Message : </Typography>
                                    <Typography gutterBottom color="error" sx={{ fontSize: 16 }} display="inline"> {props.values.message}</Typography>
                                </>
                                :
                                ""
                            }

                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Work : {
                                    props.values.work.map((value, index) => {
                                        return value + ", "
                                    })}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                {/* //yyyy-mm-dd */}
                                Date :  <CalendarMonthIcon color="info" sx={{ verticalAlign: "middle" }} /> {props.values.fromDate} to {props.values.toDate}

                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Time : <WatchLaterIcon color="info" sx={{ verticalAlign: "middle" }} /> {props.values.fromTime} to {props.values.toTime}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                Description : {props.values.description}
                            </Typography>
                          
                            <Button sx={{ float: "right", padding: 0 }} size="medium" onClick={onViewClick}>View Details </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default HireRequestCard