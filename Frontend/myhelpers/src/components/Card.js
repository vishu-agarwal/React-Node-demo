import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { getListItemSecondaryActionClassesUtilityClass, Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayActions, fetchSaveUserThunk, isProfileThunk, saveThunk } from '../store/slices/display-slice';


// import profileimg from "../../profileimg.gif"
import { starThunk } from '../store/slices/profile-slice';
const CardJS = (props) => {
    const rid = localStorage.getItem("r_id")
    // console.log("status::",props.status)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { status, error } = useSelector((state) => ({ ...state.displayStore }))
    const [star, setStar] = useState(0.5)
    //save icon state
    // const [saveIcon, setSaveIcon] = useState(false)

    // props.status ? setSaveIcon(true) : setSaveIcon(false)
    //save icon click event
    let { isProfile } = useSelector((state) => ({ ...state.displayStore }))
    useEffect(() => {
        if (isProfile)
        {
            navigate(`/viewHelperDetails/${props.values.r_id}`)
            dispatch(displayActions.profileReducer())
        }
        
    },[isProfile])
    const onSaveClick = async () => {
        dispatch(saveThunk(props.values.r_id))
        // dispatch(fetchSaveUserThunk())
    }

    const onViewClick = () => {
        dispatch(isProfileThunk(rid))
        // navigate(`/viewHelperDetails/${props.values.r_id}`)
    }

    const onRateClick = (val) => {
        console.log("onRate")
        setStar(parseFloat(val.target.value))

        const arg = {
            rid: props.values.r_id,
            rate: star
        }
        // console.log("argument :: ", arg);
        // console.log("stars update..........................")
        dispatch(starThunk(arg))
        // dispatch(fetchAllThunk())

    }

    useEffect(() => {
        // console.log("setStars-------------------------")
        setStar(props.rates)
    }, [props.rates])

    const ageDate = () => {
        var today = new Date();
        // console.log(today)
        var birthDate = new Date(props.values.dob);
        // console.log(birthDate)
        var age = today.getFullYear() - birthDate.getFullYear();
        // console.log(age)
        var m = today.getMonth() - birthDate.getMonth();
        // console.log(m)
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        // console.log(age)
        return age;
    }

    return (
        <>
            <Card

                variant="outlined"

                sx={{
                    maxWidth: 375, height: 240,
                    marginLeft: 2,
                    marginTop: 2,
                    marginRight: 1,
                    borderRadius: 5,
                    borderColor: "#163758",
                    borderWidth: 2
                }} elevation={8}

            >
                <CardContent sx={{ padding: 1 }}>
                    <Grid container direction={'row'} >
                        <Grid item xs={11} sm={11}>

                            <Typography color="#163758" variant="h6" paddingLeft={1} gutterBottom align="left">
                                {String(props.values.name).toUpperCase()}

                            </Typography>

                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            <Tooltip title="Save">
                                {props.saveStatus ?
                                    <BookmarkIcon fontSize="medium" cursor="pointer" onClick={onSaveClick} />
                                    :
                                    <BookmarkBorderIcon fontSize="medium" cursor="pointer" onClick={onSaveClick} />
                                }
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} >
                        <Grid item xs={4} sm={4} >
                            <CardMedia
                                component="img"
                                height={150}
                                sx={{ width: 110 }}
                                // image={props.values.avatar[0]}
                                // image={profileimg}
                                alt="Profile Image"
                            />

                            {/* <Rating name="half-rating" 
                                // value={parseInt(props.values.rate)}
                                value={star}
                                onChange={(val) =>
                                    // setStar(parseFloat(val.target.value)),
                                    onRateClick(val)
                                }
                                size="medium"
                            // onClick={(val)=>onRateClick(val)}
                            /> */}

                        </Grid>
                        <Grid item xs={8} sm={8} align="left" paddingLeft={0.5} >
                            <Typography variant="h5" component="div"></Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Mobile No : {props.values.profession_mbl}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                {/* //yyyy-mm-dd */}
                                Age : {
                                    ageDate()
                                }
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }} >
                                Work : {
                                    Array.isArray(props.values.workDetails[0]) ?
                                        props.values.workDetails[0].map((value, index) =>
                                            // console.log(value)

                                            value.category.split("(")[0] + ", "
                                        )

                                        :
                                        props.values.workDetails.map((value, index) =>

                                            // console.log(value)
                                            value.category.split("(")[0] + ", "
                                        )
                                    // console.log(props.values)
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
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'}>
                        <Grid item xs={4} sm={4}>
                            <Rating name="half-rating"
                                // value={parseInt(props.values.rate)}
                                value={star}
                                onChange={(val) =>
                                    // setStar(parseFloat(val.target.value)),
                                    onRateClick(val)
                                }
                                size="medium"
                            // onClick={(val)=>onRateClick(val)}
                            />
                        </Grid>
                        <Grid item xs={8} sm={8} align="left" paddingLeft={0.5}>
                            <Button sx={{ float: "right", padding: 0, fontSize: 15 }} onClick={onViewClick}>View Details </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CardJS