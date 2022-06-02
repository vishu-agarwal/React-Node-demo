

import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layouts/LoadingFile'
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { profileActions } from '../../store/slices/profile-slice';
import { fetchViewUserDataThunk } from '../../store/slices/display-slice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// function createData(skill, experience, price) {
//     return { skill, experience, price };
// }

const ViewClientProfile = () => {

    const navigate = useNavigate()
    const params = useParams()
    const user_id = params.rid;
    const rid = localStorage.getItem("r_id")
    const role = localStorage.getItem("role")
    const dispatch = useDispatch()

    let { viewUserProfile, displayError, displayMessage, displayLoading } = useSelector((state) => ({ ...state.displayStore }))

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

    const [values, setValues] = useState({
        name: '',
        dob: '',
        mbl: '',
        altmbl: '',
        email: '',
        gender: '',
        married: false,
        physic_dis: false,
        house_no: '',
        house_name: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        about: '',
        avatar: '',
    });
    const [dataLoad, setDataLoad] = useState(true)
    useEffect(() => {
        dispatch(fetchViewUserDataThunk(user_id))
    }, [user_id])

    useEffect(() => {

        if (!displayLoading) {
            setDataLoad(false)
        }
    }, [displayLoading])
    useEffect(() => {
        if (displayMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(displayMessage)
            dispatch(profileActions.messageReducer())
        }
        if (displayError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(displayError)
            dispatch(profileActions.errorReducer())
        }
    }, [displayMessage, displayError])

    useEffect(() => {
        if (Object.keys(viewUserProfile).length !== 0) {
            setValues({
                name: viewUserProfile?.name,
                dob: viewUserProfile?.dob,
                mbl: viewUserProfile?.mobile_number,
                altmbl: viewUserProfile?.alternate_mobile_number,
                email: viewUserProfile?.email,
                gender: viewUserProfile?.gender,
                married: viewUserProfile?.married,
                physic_dis: viewUserProfile?.physical_disable,
                house_no: viewUserProfile?.address?.house_no,
                house_name: viewUserProfile?.address?.house_name,
                street: viewUserProfile?.address?.landmark,
                city: viewUserProfile?.address?.city,
                state: viewUserProfile?.address?.state,
                pincode: viewUserProfile?.address?.pincode,
                about: viewUserProfile?.about,
                avatar: "http://localhost:3001/" + viewUserProfile?.avatar
            })
        }
    }, [viewUserProfile])

    const ageDate = () => {
        var today = new Date();
        var birthDate = new Date(values.dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        Object.keys(viewUserProfile).length !== 0 && !dataLoad ?

            <Grid >
                {displayLoading ? <Loading isLoad={true} /> :
                    <Card elevation={16}
                        sx={{
                            margin: 2,
                            minHeight: 550
                        }}
                    >
                        <CardContent >
                            <Grid container direction={'row'} justifyContent="center">
                                <Snackbar
                                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                    open={snackOpen}
                                    autoHideDuration={4000}
                                    onClose={closeSnackbar}
                                >
                                    <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                                        {snackMessage}
                                    </Alert>
                                </Snackbar>
                                <Grid item xs={12} sm={12} md={12} align="left" >
                                    <Button variant="contained" sx={{ backgroundColor: "#163758" }} onClick={() => navigate(-1)}><ArrowBackIosRoundedIcon /> Back</Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="h3" sx={{ color: "#163758" }}> PROFILE</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="h5" sx={{ color: "#163758" }}> {values.email} </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid container justifyContent="center"  >
                                        <Grid item xs={12} sm={11} md={4} sx={{ marginTop: "3%" }}>
                                            <Grid container direction={'row'} justifyContent="left" >
                                                <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Name
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={5} md={5} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Gender
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5} sm={5} md={5} align="left" >
                                                    <Typography color="" gutterBottom fontSize={20}  >
                                                        : {values.gender}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Age
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5} sm={5} md={5} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {ageDate()} Years
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Mobile No.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5} sm={5} md={5} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.mbl}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Married
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5} sm={5} md={5} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.married === false ? "No" : "Yes"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Physical Disability
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5} sm={5} md={5} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.physic_dis === false ? "No" : "Yes"}
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "0%" }} >
                                            <Grid container justifyContent="center" item xs={12} sm={12} md={12}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ marginTop: "10%", width: 250, height: 250, borderRadius: "50%", border: "3px solid #163758" }}
                                                    image={`${values.avatar}`}
                                                    alt="Profile Image"
                                                />
                                                <Grid container item xs={12} sm={12} md={12}>
                                                </Grid>
                                            </Grid >
                                        </Grid >
                                        <Grid item xs={12} sm={11} md={4} sx={{ marginTop: "3%" }}>
                                            <Grid container direction={'row'} >
                                                <Grid item xs={4} sm={4} md={4} marginLeft={"3%"} align="left">
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Alternate No.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.altmbl}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} align="left" marginLeft={"3%"} >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Address
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.house_no}, {values.house_name}, {values.street}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} align="left" marginLeft={"3%"} >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        City
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.city}, {values.pincode}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} marginLeft={"3%"} align="left">
                                                    <Typography gutterBottom fontSize={20}  >
                                                        State
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.state}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} marginLeft={"3%"} align="left">
                                                    <Typography gutterBottom fontSize={20}  >
                                                        About
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.about}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid >
                                </Grid >
                            </Grid >
                        </CardContent >
                    </Card >}
            </Grid>
            :
            <Grid container>
                {displayLoading ? <Loading isLoad={true} /> :
                    <Grid item xs={12} sm={12} align="center" padding={0} sx={{ margin: 0 }}>
                        <img
                            src={require("../allImages/nodata.gif")}
                            alt="Page No Found..."
                            align="center"
                        />
                    </Grid>}
            </Grid>
    )
}

export default ViewClientProfile