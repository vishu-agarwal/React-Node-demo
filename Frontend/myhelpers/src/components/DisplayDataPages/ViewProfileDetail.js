import * as React from 'react';
import Container from "@mui/material/Container";
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
import { workProfileActions } from '../../store/slices/work-slice'
import { fetchSaveUserThunk, fetchAllThunk, saveThunk, displayActions } from '../../store/slices/display-slice';
import { fetchSingleHireRequestThunk } from '../../store/slices/hireRequest-slice';
import profileActions from '../../store/slices/profile-slice'
import { fetchUserProfileThunk, starThunk } from '../../store/slices/profile-slice';
import HireForm from './HireForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../layouts/LoadingFile'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewProfileDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const user_id = params.rid;

    let { saveUser, displayData, displayMessage, displayLoading, displayError } = useSelector((state) => ({ ...state.displayStore }))
    let { workMessage, workData, workError, workLoading } = useSelector((state) => ({ ...state.workProfileStore }))
    let { userProfile, profileError, profileMessage, profileLoading } = useSelector((state) => ({ ...state.profileStore }))

    const rid = localStorage.getItem("r_id")
    const role = localStorage.getItem("role")

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
        porf_mbl: '',
        workTime: '',
        study: '',
        otherStudy: '',
        language: '',
        avatar: '',
    });

    const [hireValues, sethireValues] = useState({
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: '',
        description: '',

    });
    const [hireWork, setHireWork] = useState([]);
    //for open module
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false)
    const [star, setStar] = useState(2)

    useEffect(() => {
        dispatch(fetchUserProfileThunk(user_id))
        dispatch(fetchWorkThunk(user_id))
        dispatch(fetchSaveUserThunk(rid))
        dispatch(fetchAllThunk())
    }, [])

    useEffect(() => {

        sethireValues({
            fromDate: '',
            toDate: '',
            fromTime: '',
            toTime: '',
            description: '',
        })
        setHireWork([])

    }, [])
    useEffect(() => {

        if (saveUser.length !== 0) {
            console.log("saveUser ::", saveUser);
        }
    }, [saveUser])

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = open ? 'hidden' : 'auto';
        if (profileMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(profileMessage)
            dispatch(profileActions.messageReducer())
        }
        if (profileError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(profileError)
            dispatch(profileActions.errorReducer())
        }
        if (workMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(workMessage)
            dispatch(workProfileActions.messageReducer())
        }
        if (workError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(workError)
            dispatch(workProfileActions.errorReducer())
        }
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

    }, [profileMessage, profileError, displayError, displayMessage, workError, workMessage, open])

    useEffect(() => {
        if (userProfile.length !== 0) {
            if (workData.length !== 0) {
                let list =
                    workData.languages.map((value, index) => {
                        return value.language + ", "
                    })
                setStatus(
                    saveUser.length
                    && !!saveUser.find((val) => values.r_id === val.user_id))
                setValues({
                    name: userProfile[0]?.name,
                    dob: userProfile[0]?.dob,
                    mbl: userProfile[0]?.mobile_number,
                    altmbl: userProfile[0]?.alternate_mobile_number,
                    email: userProfile[0]?.email,
                    gender: userProfile[0]?.gender,
                    married: userProfile[0]?.married,
                    physic_dis: userProfile[0]?.physical_disable,
                    house_no: userProfile[0]?.address?.house_no,
                    house_name: userProfile[0]?.address?.house_name,
                    street: userProfile[0]?.address?.landmark,
                    city: userProfile[0]?.address?.city,
                    state: userProfile[0]?.address?.state,
                    pincode: userProfile[0]?.address?.pincode,
                    about: userProfile[0]?.about,
                    porf_mbl: workData?.profession_mobile_number,
                    workTime: workData?.work_time,
                    study: workData?.education,
                    otherStudy: workData?.other_education,
                    language: list,
                    avatar: userProfile[0]?.avatar
                })
                let workDetails = workData?.work_details?.filter((data) => data)
                setFields(workDetails)
            }
        }
    }, [userProfile, workData, saveUser])
    useEffect(() => {
        displayData?.map((value) => {
            console.log("match userid:::",value.r_id === user_id)
             value.r_id === user_id &&
                setStar(value.rating[0] !== undefined ?
                    value.rating[0]?.map((id) =>
                        id.rate
                    ).reduce((prev, curr) => prev + curr, 0)
                    /
                    value.rating[0]?.map((id) =>
                        id.rate
                    ).length
                    : 2);
        })

    }, [displayData])

    const [fields, setFields] = useState(
        [
            {
                category: "",
                experience: "",
                salary: "",
            }
        ]
    );
    //save icon click event
    const onSaveClick = () => {
        const arg = {
            user_id,
            rid,
        }
        dispatch(saveThunk(arg))
    }
    const onRateClick = (val) => {
        setStar(parseFloat(val.target.value))
        const arg = {
            rid,
            user_id,
            rate: parseInt(val.target.value)
        }
        dispatch(starThunk(arg))
        dispatch(fetchUserProfileThunk(user_id))
        dispatch(fetchAllThunk())
    }

    //hire button enable disble
    const [enableHire, setEnableHire] = useState(true)

    const onHireUser = () => {
        setOpen(true);
        const arg = {
            user_id: workData?.r_id,
            rid
        }
        dispatch(fetchSingleHireRequestThunk(arg))
    }
    const handleClose = () => {
        setOpen(false);
    };
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
        <Container align="center">
            {(displayLoading || workLoading || profileLoading) && <Loading isLoad={true} />}
            <Card elevation={16}
                sx={{
                    // paddingLeft: "10%",
                    // paddingRight: "10%",
                    maxWidth: 1400, minHeight: 660,
                    borderRadius: 0,
                    marginTop: 3,
                    // backgroundColor: "#007bf717"
                }}
            >
                <CardContent >
                    <Grid container direction={'row'} justifyContent="center">
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
                        <Grid item xs={11} sm={11} md={11} align="left" >
                            <Button variant="contained" sx={{ backgroundColor: "#163758" }} onClick={() => navigate(-1)}><ArrowBackIosRoundedIcon /> Back</Button>
                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >
                            {console.log("status save::", status)}
                            <Tooltip title="Save">
                                {status ?
                                    <BookmarkIcon fontSize="large" cursor="pointer" onClick={onSaveClick} />
                                    :
                                    <BookmarkBorderIcon fontSize="large" cursor="pointer" onClick={onSaveClick} />
                                }
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Typography variant="h4" sx={{ fontWeight: 500, color: "#163758" }}> PROFILE</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Typography variant="h5" sx={{ fontWeight: 500, color: "#163758" }}> {values.email} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Rating sx={{ marginBottom: 2, marginLeft: 3 }} name="size-small" onChange={onRateClick} value={star} size="medium" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container justifyContent="center"  >
                                <Grid item xs={12} sm={11} md={4} sx={{ marginTop: "2%" }}>
                                    <Grid container direction={'row'} justifyContent="left" >
                                        <Grid item xs={6} sm={6} md={6} align="left"  >
                                            <Typography gutterBottom variant="h6"  >
                                                Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                : {values.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Mobile No.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.mbl}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Married
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.married === false ? "No" : "Yes"}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Physical Disability
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.physic_dis === false ? "No" : "Yes"}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Address
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.house_no}, {values.house_name}, {values.street}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                City
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                : {values.city}, {values.pincode}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                State
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                : {values.state}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} >
                                    <Grid container justifyContent="center" item xs={12} sm={12} md={12}>
                                        <CardMedia
                                            component="img"
                                            sx={{ marginTop: "5%", width: 250, height: 250, borderRadius: "50%" }}
                                            image={`http://localhost:3001/${values.avatar}`}
                                            alt="Paella dish"
                                        />
                                        <Grid container item xs={12} sm={12} md={12} justifyContent="center">
                                            <Button sx={{ marginTop: "4%", backgroundColor: "#163758" }} size="medium" variant="contained" onClick={onHireUser}>Hire</Button>
                                            <HireForm open={open} hireValues={hireValues} sethireValues={sethireValues} work={hireWork} setWork={setHireWork} user_id={workData.length !== 0 ? workData.r_id : ""} fields={fields} workTime={values.workTime} click={handleClose} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={11} md={5} sx={{ marginTop: "2%" }}>
                                    <Grid container direction={'row'} >
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Gender
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.gender}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Age
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {ageDate()} Years
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Profession No.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.porf_mbl}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left">
                                            <Typography gutterBottom variant="h6"  >
                                                Alternate No.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.altmbl}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Preffered Time
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                :  {values.workTime}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Languages
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                :  {values.language}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Education
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                :  {values.study}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                Other Education
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography gutterBottom variant="h6"  >
                                                :  {values.otherStudy}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider textAlign="left" sx={{ marginTop: 2, marginBottom: 1 }}> </Divider>
                    <Grid container direction={'row'} justifyContent="center">
                        <Grid item xs={12} sm={12} md={10} align="center" >
                            <TableContainer >
                                <Table sx={{ maxWidth: "100%", maxHeight: "100%" }} size="small" aria-label="caption table">
                                    <TableHead >
                                        <TableRow sx={{ backgroundColor: "#163758" }} >
                                            <TableCell sx={{ color: "white" }} >Skills</TableCell>
                                            <TableCell sx={{ color: "white" }}>Experience</TableCell>
                                            <TableCell sx={{ color: "white" }}>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fields.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: "100%", color: "black" }}>{row.category}</TableCell>
                                                <TableCell sx={{ fontSize: "100%", color: "black" }}>{row.experience}</TableCell>
                                                <TableCell sx={{ fontSize: "100%", color: "black" }}>{row.salary}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </CardContent >
            </Card >
        </Container>
    )
}

export default ViewProfileDetail