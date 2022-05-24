

import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Loading from '../layouts/LoadingFile'
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkThunk } from '../../store/slices/work-slice';
import {workProfileActions} from '../../store/slices/work-slice'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import profileActions from '../../store/slices/profile-slice'
import { fetchUserProfileThunk } from '../../store/slices/profile-slice';

import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function createData(skill, experience, price) {
    return { skill, experience, price };
}



const ViewClientProfile = () => {

    const navigate = useNavigate()
    const params = useParams()
    const rid = params.rid;
    
    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let {  workData, workError,workLoading,workMessage } = useSelector((state) => ({ ...state.workProfileStore }))
    let { userProfile, profileError, profileMessage, profileLoading } = useSelector((state) => ({ ...state.profileStore }))
    

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
        mbl:'',
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
    });
    const [star, setStar] = useState(0)
    useEffect(() => {
        dispatch(fetchUserProfileThunk(rid))
    }, [])

    // console.log(workData[0].workDetails)
    useEffect(() => {
        // if (workMessage.length !== 0) {
        //     alert(workMessage)

        // }
        // if (workError.length !== 0) {
        //     // console.log(error)
        //     alert(workError)
        //     dispatch(workProfileActions.errorReducer())
        // }
        if (profileMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(profileMessage)

            dispatch(profileActions.messageReducer())
        }
        if (profileError.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(profileError)

            dispatch(profileActions.errorReducer())
            
        }
    }, [ profileMessage, profileError])
    useEffect(() => {
        if (userProfile.length !== 0) {
            setValues({
                name: userProfile[0].name,
                dob: userProfile[0].dob,
                altmbl: userProfile[0].alt_mob_num,
                email: userProfile[0].email,
                gender: userProfile[0].gender,
                married: userProfile[0].isMarried,
                physic_dis: userProfile[0].physical_disable,
                house_no: userProfile[0].address[0].houseNo,
                house_name: userProfile[0].address[0].house_name,
                street: userProfile[0].address[0].landmark,
                city: userProfile[0].address[0].city,
                state: userProfile[0].address[0].state,
                pincode: userProfile[0].address[0].pincode,
                about: userProfile[0].about,

            })

        }
    }, [userProfile])


    //save icon state
    const [saveIcon, setSaveIcon] = useState(false)
    //save icon click event
    const onSaveClick = () => {
        setSaveIcon(!saveIcon)
    }
    const ageDate = () => {
        var today = new Date();
        // console.log(today)
        var birthDate = new Date(values.dob);
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
        <Container align="center" >
            {profileLoading && <Loading isLoad={true} />}
            <Card
                elevation={16}
                sx={{
                    maxWidth: 1200, minHeight: 600,
                    borderWidth: 3,
                    borderRadius: 6,
                    marginTop: 8,
                }}
            >
                <CardContent >
                    <Grid container direction={'row'} justifyContent="center">
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
                        <Grid item xs={12} sm={12} md={12} align="left" >
                            <Button variant="contained" sx={{ backgroundColor: "#163758" }} onClick={() => navigate(-1)}><ArrowBackIosRoundedIcon /> Back</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Typography variant="h3" sx={{ fontWeight: 500, color: "#163758" }}> PROFILE</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Typography variant="h5" sx={{ fontWeight: 500, color: "#163758" }}> {values.email} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Rating sx={{ marginBottom: 2, marginLeft: 3 }} name="size-small" defaultValue={2} size="medium" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container justifyContent="center"  >
                                <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "5%" }}>
                                    <Grid container direction={'row'} >
                                        <Grid item xs={5} sm={5} md={5} marginLeft={"2%"} align="left" colo="#163758">
                                            <Typography gutterBottom variant="h6"  >
                                                Name
                                            </Typography>
                                            <br />
                                            <Typography gutterBottom variant="h6"  >
                                                Mobile No.
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                Alternate No.
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                Address
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={5} sm={5} md={5} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                : {values.name}
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.mbl}
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.altml}
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.address}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} >
                                    <Grid container justifyContent="center" item xs={12} sm={12} md={12}>


                                        <CardMedia
                                            component="img"

                                            sx={{ marginTop: "10%", width: 250, height: 250, borderRadius: "50%" }}
                                            image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                                            alt="Paella dish"
                                        />
                                        <Grid container item xs={12} sm={12} md={12}>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "5%" }}>
                                    <Grid container direction={'row'} >
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"5%"} align="left" colo="#163758">
                                            <Typography gutterBottom variant="h6"  >
                                                Gender
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                Age
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                Married
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                Physical Disability
                                            </Typography>
                                            <br />


                                        </Grid>

                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography color="" gutterBottom variant="h6"  >
                                                : {values.gender.charAt(0).toUpperCase() + values.gender.slice(1)}
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                : {ageDate()} Years
                                            </Typography>

                                            <br />
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.married === false ? "No" : "Yes"}
                                            </Typography>
                                            <br />

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.physic_dis === false ? "No" : "Yes"}
                                            </Typography>

                                            <br />

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent >
            </Card >
        </Container>
    )
}

export default ViewClientProfile