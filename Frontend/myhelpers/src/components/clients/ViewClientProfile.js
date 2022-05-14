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
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CallIcon from '@mui/icons-material/Call';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkThunk } from '../../store/slices/work-slice';
import workProfileActions from '../../store/slices/work-slice'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import profileActions from '../../store/slices/profile-slice'
import { fetchUserProfileThunk } from '../../store/slices/profile-slice';
function createData(skill, experience, price) {
    return { skill, experience, price };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 4.3),
    createData('Eclair', 262, 16.0),
];


const ViewClientProfile = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
    let { userProfile } = useSelector((state) => ({ ...state.profileStore }))
    const [values, setValues] = useState({
        name: '',
        dob: '',
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
        dispatch(fetchUserProfileThunk("C101"))
    }, [])

    // console.log(workData[0].workDetails)
    useEffect(() => {
        if (message.length !== 0) {
            alert(message)

        }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(workProfileActions.errorReducer())
        }

    }, [message, error])
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

    return (
        <Card sx={{

            marginTop: "2%",
            paddingLeft: "10%",
            paddingRight: "10%",
            height: "100%"
        }} elevation={0}>
            <CardContent >
                <Grid container direction={'row'} justifyContent="center">
                    <Grid container >
                        <Button variant="contained" color="error" onClick={() => navigate(-1)}><ArrowBackIosRoundedIcon /> Back</Button>
                    </Grid>
                    <Grid item xs={12} sm={4} align="center" paddingRight={"10%"} paddingLeft={"5%"} >
                        <CardMedia
                            component="img"
                            height={300}
                            sx={{ marginTop: 5, width: "100%" }}
                            image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                            alt="Paella dish"
                        />
                        <Button sx={{ marginTop: "4%" }} color="warning" size="small" variant="contained">Apply</Button>

                    </Grid>
                    <Grid item xs={12} sm={8} align="left" >
                        <Grid container direction={'row'}  >
                            <Grid item xs={12} sm={11} align="left" >

                                <Typography variant="h3" color="primary" component="div">
                                    {values.name.toUpperCase()}
                                </Typography>
                                <Rating sx={{ marginBottom: 2, marginLeft: 3 }} name="size-small" defaultValue={2} size="medium" />
                            </Grid>
                            <Grid item xs={12} sm={1} >
                                <Typography align="right">
                                    <Tooltip title="Save">
                                        {saveIcon ?
                                            <BookmarkIcon fontSize="large" onClick={onSaveClick} />
                                            :
                                            <BookmarkBorderIcon fontSize="large" onClick={onSaveClick} />
                                        }
                                    </Tooltip>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction={'row'} marginTop={"5%"}>
                            <Grid item xs={12} sm={6} align="left" >

                                <Grid container direction={'row'} >
                                    <Grid item xs={6} sm={6} align="left" >
                                        <Typography color="green" gutterBottom variant="button"  >
                                            Gender
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Age
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Married
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Physical Disability
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            About
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} sm={6} align="left" >
                                        <Typography color="" gutterBottom variant="button"  >
                                            {values.gender.charAt(0).toUpperCase() + values.gender.slice(1)}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            25 Years
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.married === false ? "No" : "Yes"}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.physic_dis === false ? "No" : "Yes"}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.about}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} sm={6} align="left" >
                                <Grid container direction={'row'} >
                                    <Grid item xs={4} sm={4} align="left" >
                                        <Typography color="green" gutterBottom variant="button"  >
                                            Email
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Alternate No
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Address
                                        </Typography>
                                        <br />
                                    </Grid>

                                    <Grid item xs={8} sm={8} align="left" >
                                        <Typography color="" gutterBottom variant="button"  >
                                            {values.email}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.altmbl}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.house_no} {values.house_name} <br /> {values.street} <br /> {values.city} {values.state} {values.pincode}
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
    )
}

export default ViewClientProfile