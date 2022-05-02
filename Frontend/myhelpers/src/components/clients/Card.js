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
import { saveThunk } from '../../store/slices/display-slice';

import { starThunk } from '../../store/slices/profile-slice';
const CardJS = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { status, error } = useSelector((state) => ({ ...state.displayStore }))
    const [star, setStar] = useState(0.5)

    //save icon state
    const [saveIcon, setSaveIcon] = useState(false)
    //save icon click event
    const onSaveClick = () => {
        dispatch(saveThunk(props.values.r_id))
        props.status ? setSaveIcon(true) : setSaveIcon(false)
    }

    const onViewClick = () => {
        navigate(`/viewHelperDetails/${props.values.r_id}`)
    }

    const onRateClick = () => {

        const arg = {
            rid: props.values.r_id,
            rate: star
        }
        // console.log(arg);
        console.log("stars update..........................")
        dispatch(starThunk(arg))
    }

    useEffect(() => {
        console.log("setStars-------------------------")
   setStar(props.rates) 
},[])
    return (
        <>
            <Card sx={{
                maxWidth: "80%", maxHeight: "100%",
                marginTop: 3,
                borderRadius: 3
            }} elevation={8}

            >
                <CardContent sx={{ padding: 1 }}>
                    <Grid container direction={'row'} spacing={0} >
                        <Grid item xs={11} sm={11}>

                            <Typography color="green" variant="h6" paddingLeft={1} gutterBottom align="left">
                                {String(props.values.name).toUpperCase()}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            <Tooltip title="Save">
                                {saveIcon ?
                                    <BookmarkIcon fontSize="medium" onClick={onSaveClick} />
                                    :
                                    <BookmarkBorderIcon fontSize="medium" onClick={onSaveClick} />
                                }
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} >
                        <Grid item xs={4} sm={5} paddingBottom={2}>
                            <CardMedia
                                component="img"
                                height="90%"
                                sx={{ width: "90%" }}
                                image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                                alt="Paella dish"
                            />

                            <Rating name="half-rating" precision={0.5} 
                                // value={parseInt(props.values.rate)}
                                value={star}
                                onChange={(val) =>
                                    setStar(parseFloat(val.target.value))
                                                                        
                                    }
                                size="medium"
                                onClick={onRateClick}
                            />
                            {/* {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )} */
                                // console.log(star)        
                            }
                        </Grid>
                        <Grid item xs={8} sm={7} align="left" paddingLeft={1}>
                            <Typography variant="h5" component="div"></Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Mobile No : {props.values.profession_mbl}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                Age : Age
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Work : {
                                    props.values.workDetails.map((value, index) => {
                                        return value.category.split("(")[0] + ", "
                                    })
                                }
                            </Typography>

                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                Prefer Time : {props.values.workTime}
                            </Typography>
                            <Button sx={{ float: "right", padding: 0, paddingTop: "5%", fontSize: 15 }} onClick={onViewClick}>View Details </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CardJS