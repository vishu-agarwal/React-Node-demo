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
    // console.log("status::",props.status)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { status, error } = useSelector((state) => ({ ...state.displayStore }))
    const [star, setStar] = useState(0.5)
    //save icon state
    // const [saveIcon, setSaveIcon] = useState(false)

    // props.status ? setSaveIcon(true) : setSaveIcon(false)
    //save icon click event
    const onSaveClick = () => {
        dispatch(saveThunk(props.values.r_id))
    }

    const onViewClick = () => {
        navigate(`/viewHelperDetails/${props.values.r_id}`)
    }

    const onRateClick = (val) => {

        setStar(parseFloat(val.target.value))

        const arg = {
            rid: props.values.r_id,
            rate: star
        }
        console.log("argument :: ", arg);
        // console.log("stars update..........................")
        dispatch(starThunk(arg))

    }

    useEffect(() => {
        // console.log("setStars-------------------------")
        setStar(props.rates)
    }, [props.rates])
    return (
        <>
            <Card sx={{
                maxWidth: "80%", maxHeight: "100%",
                marginTop: 1,
                borderRadius: 5
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
                                {props.saveStatus ?
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
                                height="100%"
                                sx={{ width: "90%" }}
                                image={props.values.avatar[0]}
                                alt="Profile Image"
                            />

                            <Rating name="half-rating" precision={0.5}
                                // value={parseInt(props.values.rate)}
                                value={star}
                                onChange={(val) =>
                                    // setStar(parseFloat(val.target.value)),
                                    onRateClick(val)
                                }
                                size="medium"
                            // onClick={(val)=>onRateClick(val)}
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
                            {
                                props.hireStatus.length !== 0 ?
                                    // console.log("status::",)
                                    <>
                                        <Typography gutterBottom sx={{ fontSize: 15 }} display="inline">Hire Status :</Typography>
                                        <Typography gutterBottom color={props.hireStatus[0] ? "#1b5e20" : "#faaf00"} sx={{ fontSize: 15 }} display="inline"> {props.hireStatus[0] ? "Hired!" : "Pending!"}</Typography>                                   
                                    </>
                                    : ''
                            }
                            <Button sx={{ float: "right", padding: 0, paddingTop: 3, fontSize: 15 }} onClick={onViewClick}>View Details </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CardJS