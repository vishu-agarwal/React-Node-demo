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
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CallIcon from '@mui/icons-material/Call';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkThunk } from '../../store/slices/work-slice';
import workProfileActions from '../../store/slices/work-slice'
import { hireUserThunk, fetchSaveUserThunk, saveThunk } from '../../store/slices/display-slice';

import profileActions from '../../store/slices/profile-slice'
import { fetchProfileThunk, starThunk } from '../../store/slices/profile-slice';

const ViewProfileDetail = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const params = useParams()
    const rid = params.rid;

    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    let { saveUser } = useSelector((state) => ({ ...state.displayStore }))
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
        porf_mbl: '',
        workTime: '',
        study: '',
        otherStudy: '',
        language: '',

    });
    const [status, setStatus] = useState(false)
    const [star, setStar] = useState(0.5)
    useEffect(() => {
        dispatch(fetchProfileThunk(rid))
        dispatch(fetchWorkThunk(rid))
        dispatch(fetchSaveUserThunk())
    }, [])

    useEffect(() => {

        if (saveUser.length !== 0) {
            console.log("saveUser ::", saveUser);
            // saveUser.map((val)=> values.r_id === val.user_id)
            // console.log("saveUser ::", saveUser.length !== 0 ? saveUser.map((val)=>console.log("H110"===val.user_id)):null);
        }
    }, [saveUser])
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
            if (workData.length !== 0) {
                let list =
                    workData[0].languages.map((value, index) => {
                        return value.language + ", "
                    })

                setStar(userProfile.rating !== undefined ?
                    userProfile[0].rating.map((id) =>
                        id.rate
                    ).reduce((prev, curr) => prev + curr, 0)
                    /
                    userProfile[0].rating.map((id) =>
                        id.user_id
                    ).length

                    : 0.5)

                setStatus(saveUser.length !== 0 ? saveUser.map((val) => userProfile[0].r_id === val.user_id).includes(true) ? true : false : false)
                // console.log(status)

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
                    porf_mbl: workData[0].profession_mbl,
                    workTime: workData[0].workTime,
                    study: workData[0].education,
                    otherStudy: workData[0].other_education,
                    language: list

                })
                let workDetails = workData[0]?.workDetails?.filter((data) => data)
                setFields(workDetails)
            }
        }
    }, [userProfile, workData])
    // console.log(status)
    const [fields, setFields] = useState(
        [
            {
                category: "",
                exprience: "",
                salary: "",
            }
        ]
    );
    //save icon click event
    const onSaveClick = () => {
        dispatch(saveThunk(rid))
    }
    const onRateClick = (val) => {

        setStar(parseFloat(val.target.value))

        const arg = {
            rid: rid,
            rate: star
        }
        console.log("argument :: ", arg);
        // console.log("stars update..........................")
        dispatch(starThunk(arg))

    }
    //hire button enable disble
    const [enableHire, setEnableHire] = useState(true)
    const onHireUser = () => {
        dispatch(hireUserThunk(rid))
        setEnableHire(false)
    }

    return (
        <>
            <Card sx={{
                paddingLeft: "10%",
                paddingRight: "10%",
                height: "100%"
            }} elevation={0}>
                <CardContent >
                    <Grid container direction={'row'} justifyContent="center">

                        <Grid container >
                            <Button variant="contained" color="error" onClick={() => navigate(-1)}><ArrowBackIosRoundedIcon /> Back</Button>
                            <Button variant="contained" color="error" onClick={() => navigate("/shortlist")}><ArrowBackIosRoundedIcon /> Back</Button>
                        </Grid>
                        <Grid item xs={12} sm={4} paddingRight={"5%"} paddingLeft={"3%"} >
                            <CardMedia
                                component="img"
                                height={300}
                                sx={{ marginTop: 5, width: "100%" }}
                                image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                                alt="Paella dish"
                            />
                            <Button sx={{ marginTop: "4%" }} color="warning" size="small" variant="contained" onClick={onHireUser}>Hire</Button>

                        </Grid>
                        <Grid item xs={12} sm={8} align="left" >
                            <Grid container direction={'row'}  >
                                <Grid item xs={12} sm={11} align="left" >

                                    <Typography variant="h3" color="primary" component="div">
                                        {values.name.toUpperCase()}
                                    </Typography>
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
                                </Grid>
                                <Grid item xs={12} sm={1} >
                                    <Typography align="right">
                                        <Tooltip title="Save">
                                            {status ?
                                                <BookmarkIcon fontSize="large" onClick={onSaveClick} />
                                                :
                                                <BookmarkBorderIcon fontSize="large" onClick={onSaveClick} />
                                            }
                                        </Tooltip>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container direction={'row'} marginTop={"3%"}>
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

                                        <Grid item xs={6} sm={6} align="left">
                                            <Typography color="" gutterBottom variant="button"  >
                                                {values.gender}
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
                                    <Grid container direction={'row'} spacing={2}>
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
                    <Divider textAlign="left" sx={{ marginTop: 2, marginBottom: 1 }}> <Chip label="Work Details" /></Divider>
                    <Grid container direction={'row'} >
                        <Grid item xs={12} sm={4} padding={0} align="left">
                            <Grid item xs={12} sm={12} align="left" >

                                <Grid container direction={'row'} >
                                    <Grid item xs={6} sm={6} align="left" >
                                        <Typography color="green" gutterBottom variant="button"  >
                                            Mobile No
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Preffered Time
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Languages
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Education
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom color="green" variant="button"  >
                                            Other Education
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} sm={6} align="left" >
                                        <Typography color="" gutterBottom variant="button"  >
                                            {values.porf_mbl}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.workTime}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.language}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.study}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography gutterBottom variant="button"  >
                                            {values.otherStudy}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={8} align="left" >
                            <TableContainer >
                                <Table sx={{ maxWidth: "100%", maxHeight: "100%" }} size="small" aria-label="caption table">
                                    <TableHead >
                                        <TableRow sx={{ backgroundColor: "blue" }} >
                                            <TableCell sx={{ color: "white" }} >Skills</TableCell>
                                            <TableCell sx={{ color: "white" }}>Experience</TableCell>
                                            <TableCell sx={{ color: "white" }}>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fields.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: "100%", color: "green" }}>{row.category}</TableCell>
                                                <TableCell sx={{ fontSize: "100%", color: "green" }}>{row.exprience}</TableCell>
                                                <TableCell sx={{ fontSize: "100%", color: "green" }}>{row.salary}</TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    </Grid>

                </CardContent >
            </Card >
        </>
    )
}

export default ViewProfileDetail