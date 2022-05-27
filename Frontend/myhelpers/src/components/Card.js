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
import { displayActions, fetchAllThunk, fetchSaveUserThunk ,starThunk, saveThunk } from '../store/slices/display-slice';
import { fetchUserProfileThunk } from "../store/slices/profile-slice";
import Loading from './layouts/LoadingFile'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CardJS = (props) => {
    const rid = localStorage.getItem("r_id")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { displayLoading, displayError, displayMessage } = useSelector((state) => ({ ...state.displayStore }))
    let { userProfile, profileLoading } = useSelector((state) => ({ ...state.profileStore }))

    const [star, setStar] = useState(2)
    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { snackOpen } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")

    useEffect(() => {
        if (displayMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(displayMessage)
            dispatch(displayActions.messageReducer())
        }
        if (displayError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(displayError)
            dispatch(displayActions.errorReducer())
        }
    }, [displayMessage, displayError])

    useEffect(() => {

    }, [userProfile])
    const onSaveClick = async () => {
        const arg = {
            user_id: props.values.r_id,
            rid
        }
        dispatch(saveThunk(arg))
    }

    const onViewClick = () => {
        if (userProfile?.is_profile) {
            navigate(`/viewHelperDetails/${props.values.r_id}`)
        } else {
            setState({ snackOpen: true })
            setSnackColor("error")
            setSnackMessage("Pleasde first create your profile")
        }
    }
    const onRateClick = (event) => {
        if (userProfile?.is_profile) {
            setStar(parseInt(event.target.value))
            const arg = {
                user_id: props.values.r_id,
                rate: parseInt(event.target.value),
                rid
            }
            dispatch(starThunk(arg))
            dispatch(fetchAllThunk())
        } else {
            setState({ snackOpen: true })
            setSnackColor("error")
            setSnackMessage("Pleasde first create your profile")
            dispatch(displayActions.errorReducer())
        }
    }

    useEffect(() => {
        setStar(props.rates)
    }, [props.rates])

    const ageDate = () => {
        var today = new Date();
        var birthDate = new Date(props.values.dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <Container >
            <Card
                // variant="outlined"
                sx={{
                    width: {
                        xs: 1.0, // 100%
                        sm: 1.0,
                        md: 330
                    },
                    // maxWidth: 375,
                    height: {
                        xs: 1.0, // 100%
                        sm: 450,
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
                        <Grid item xs={5} sm={6} md={4.5} alignItems="left">
                            <CardMedia
                                component="img"
                                height={"100%"}
                                sx={{ width: "100%" }}
                                image={`http://localhost:3001/${props.values.avatar}`}
                                alt="Profile Image"
                            />

                        </Grid>
                        <Grid item xs={6} sm={8} md={7} marginLeft={1} align="left" >
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
                                    Array.isArray(props.values.work_details[0]) ?
                                        props.values.work_details[0]?.map((value, index) =>
                                            value.category.split("(")[0] + ", "
                                        )
                                        :
                                        props.values.work_details?.map((value, index) =>
                                            value.category.split("(")[0] + ", "
                                        )
                                }
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 15 }}  >
                                Prefer Time : {props.values.work_time}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} justifyContent="center"  >
                        <Grid item xs={6} sm={12} md={4} >
                            <Rating name="half-rating"
                                sx={{ float: "left" }}
                                readOnly={Boolean(true)}
                                value={star}
                                size="medium"
                         
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