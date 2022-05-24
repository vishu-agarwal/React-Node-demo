import * as React from "react";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
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
import { displayActions, fetchSaveUserThunk, saveThunk } from '../store/slices/display-slice';
import { fetchUserProfileThunk } from "../store/slices/profile-slice";
import Loading from './layouts/LoadingFile'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import profileimg from "../../profileimg.gif"

import { starThunk } from '../store/slices/profile-slice';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CardJS = (props) => {
    const rid = localStorage.getItem("r_id")
    // console.log("status::",props.status)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    let { saveUser, displayLoading, displayError, displayMessage } = useSelector((state) => ({ ...state.displayStore }))
    let { userProfile, profileLoading } = useSelector((state) => ({ ...state.profileStore }))
    const [star, setStar] = useState(2)
    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, snackOpen } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")


    useEffect(() => {
        if (displayMessage.length !== 0) {
            // alert(displayMessage)
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(displayMessage)
            dispatch(displayActions.messageReducer())

        }
        if (displayError.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(displayError)

            dispatch(displayActions.errorReducer())
        }


    }, [displayMessage, displayError])
    //save icon state
    // const [saveIcon, setSaveIcon] = useState(false)

    // props.status ? setSaveIcon(true) : setSaveIcon(false)
    //save icon click event
    // let { isProfile } = useSelector((state) => ({ ...state.displayStore }))
    useEffect(() => {
        if (userProfile[0]?.isProfile) {

            navigate(`/viewHelperDetails/${props.values.r_id}`)
        } else {
            setState({ snackOpen: true })
            setSnackColor("error")
            setSnackMessage("Pleasde first create your profile")

            dispatch(displayActions.errorReducer())
            // dispatch(displayActions.profileReducer())
        }
    }, [userProfile])
    const onSaveClick = async () => {
        const arg = {
            user_id: props.values.r_id,
            rid
        }
        dispatch(saveThunk(arg))
        // dispatch(fetchSaveUserThunk())
    }

    const onViewClick = () => {
        dispatch(fetchSaveUserThunk(rid))
        // navigate(`/viewHelperDetails/${props.values.r_id}`)
    }

    const onRateClick = (event) => {
        console.log("onRate", event.target.value)
        setStar(parseInt(event.target.value))

        const arg = {
            user_id: props.values.r_id,
            rate: parseInt(event.target.value),
            rid
        }
        console.log("argument :: ", arg);
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
    console.log("save........", props.saveStatus)
    return (
        <Container >
            <Card
                // variant="outlined"
                sx={{
                    minWidth: {
                        xs: 1.0, // 100%
                        sm: 350,
                        md: 400
                    },
                    // maxWidth: 375,
                    height: {
                        xs: 1.0, // 100%
                        sm: 520,
                        md: 250,
                    },
                    marginLeft: 2,
                    marginTop: 2,
                    marginRight: 1,
                    borderRadius: 3,
                    // borderColor: "#163758",
                    borderWidth: 2
                }} elevation={16}
            >
                <CardContent sx={{ padding: 1 }}>
                    <Grid container direction={'row'} >
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            open={snackOpen}
                            autoHideDuration={6000}
                            onClose={closeSnackbar}
                        // key={vertical + horizontal}
                        >
                            <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                        <Grid item xs={11} sm={11} md={11}>
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
                    <Grid container direction={'row'} justifyContent="center" >
                        <Grid item xs={11} sm={6} md={4} alignItems="left">
                            <CardMedia
                                component="img"
                                height={150}
                                sx={{ width: 110 }}
                                // image={props.values.avatar[0]}
                                image={`http://localhost:3001/${props.values.avatar}`}
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
                        <Grid item xs={11} sm={8} md={7} marginLeft={2} align="left" >
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
                            {/* {
                                props.hireStatus.length !== 0 ?
                                    // console.log("status::",)
                                    <>
                                        <Typography gutterBottom sx={{ fontSize: 15 }} display="inline">Hire Status :</Typography>
                                        <Typography gutterBottom color={props.hireStatus[0] ? "#1b5e20" : "#faaf00"} sx={{ fontSize: 15 }} display="inline"> {props.hireStatus[0] ? "Hired!" : "Pending!"}</Typography>
                                    </>
                                    : ''
                            } */}
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} justifyContent="center" >
                        <Grid item xs={6} sm={12} md={4} >
                            <Rating name="half-rating"
                                sx={{ float: "left" }}
                                // value={parseInt(props.values.rate)}
                                value={star}
                                onChange={onRateClick}
                                size="medium"
                            // onClick={(val)=>onRateClick(val)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={12} md={8} align="" paddingLeft={0.5}>
                            <Button sx={{ float: "right", padding: 0, fontSize: 15 }} onClick={onViewClick}>View Details </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CardJS