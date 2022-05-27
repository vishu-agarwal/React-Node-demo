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
import { acceptRequestThunk, rejectRequestThunk, deleteRequestThunk } from "../../store/slices/hireRequest-slice"
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import hireRequestActions from '../../store/slices/hireRequest-slice'
import Loading from '../layouts/LoadingFile'

const HireRequestCard = (props) => {
    
    const navigate = useNavigate()
    const rid = localStorage.getItem("r_id")
    const dispatch = useDispatch()

    const onViewClick = () => {
        props.values.user_id.charAt(0) === "H" ?
            navigate(`/viewHelperDetails/${props.values.user_id}`)
            :
            navigate(`/viewClientDetails/${props.values.user_id}`)
        props.closeModal()
    }
    const onAcceptHandler = () => {
        const arg = {
            user_id: props.values.user_id,
            rid
        }
        dispatch(acceptRequestThunk(arg))
    }
    const onDeleteHandler = () => {
        const arg = {
            user_id: props.values.user_id,
            rid
        }
        props.values.user_id.charAt(0) === "C" ? dispatch((rejectRequestThunk(arg))) : dispatch((deleteRequestThunk(arg)))
    }

    return (
        <>
            <Card sx={{
                maxWidth: "90%", maxHeight: "90%",
                marginTop: 1,

            }} elevation={16}
            >
                <CardContent >
                    <Grid container direction={'row'} spacing={1} >
                        <Grid item xs={10} sm={10}>

                            <Typography color="#ff6f00" variant="h5" paddingLeft={1} gutterBottom align="left">
                                {String(props.values.name).toUpperCase()}

                            </Typography>

                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            {props.values.user_id.charAt(0) === "C" && props.values.status === "pending!" && <Tooltip title="Accepted">
                                < IconButton onClick={onAcceptHandler} aria-label="upload picture" component="span">
                                    <CheckIcon fontWeight="fontWeightBold" fontSize="large" color="success" />
                                </IconButton>
                            </Tooltip>}
                            
                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >
                            {props.values.status !== "hired!" && <Tooltip title="Delete">
                                < IconButton onClick={onDeleteHandler} aria-label="upload picture" component="span">
                                    <DeleteIcon fontSize="medium" color="error" />
                                </IconButton>

                            </Tooltip>}
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} >
                        <Grid item xs={12} sm={12} align="left" paddingLeft={1}>
                            <Typography gutterBottom sx={{ fontSize: 15, textTransform: "capitalize" }} component={'div'} >
                                Status : {
                                    <Typography gutterBottom color={props.values.status === "hired!" ? "#00a152" : props.values.status === "pending!" ? "#faaf00" : "red"} sx={{ fontSize: 16,textTransform:"capitalize" }} display="inline"> {props.values.status}</Typography>
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
                            <Typography gutterBottom sx={{ fontSize: 15, textTransform: "capitalize" }} >
                                Work : {
                                    props.values.work.map((value, index) => {
                                        return value + ", "
                                    })}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                {/* //yyyy-mm-dd */}
                                Date :  <CalendarMonthIcon color="info" sx={{ verticalAlign: "middle" }} /> {props.values.from_date} to {props.values.to_date}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Time : <WatchLaterIcon color="info" sx={{ verticalAlign: "middle" }} /> {props.values.from_time} to {props.values.to_time}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                Description : {props.values.description}
                            </Typography>
                            <Button sx={{ float: "right", padding: 0 }} size="medium" onClick={onViewClick}>View Details</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default HireRequestCard