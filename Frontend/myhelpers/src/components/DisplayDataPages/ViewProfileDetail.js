import * as React from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkThunk } from '../../store/slices/work-slice';
import { workProfileActions } from '../../store/slices/work-slice'
import { fetchSaveUserThunk, starThunk, saveThunk, fetchViewUserDataThunk, displayActions } from '../../store/slices/display-slice';
import { hireRequestActions } from '../../store/slices/hireRequest-slice';
import { profileActions } from '../../store/slices/profile-slice'
import HireForm from './HireForm';
import Loading from '../layouts/LoadingFile'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const profileImg = require("../allImages/profile.gif")
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

    let { workMessage, workData, workError, workLoading } = useSelector((state) => ({ ...state.workProfileStore }))
    let { userProfile, profileError, profileMessage, profileLoading } = useSelector((state) => ({ ...state.profileStore }))
    let { viewUserProfile, saveUser, displayError, displayMessage, displayLoading } = useSelector((state) => ({ ...state.displayStore }))

    const rid = localStorage.getItem("r_id")

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
        avatar: `${require("../allImages/profile.gif")}`,
    });

    //for open module
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false)
    const [star, setStar] = useState(0)
    const [dataLoad, setDataLoad] = useState(true)
    useEffect(() => {
        dispatch(hireRequestActions.emptySingleUser())
        dispatch(fetchViewUserDataThunk(user_id))
        dispatch(fetchWorkThunk(user_id))
        dispatch(fetchSaveUserThunk(rid))
    }, [user_id])

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
       
        if (Object.keys(viewUserProfile).length !== 0) {
            if (workData.length !== 0) {
                let list =
                    workData?.languages.map((value, index) => {
                        return value.language + ", "
                    })

                const status1 = saveUser.length
                    && !!saveUser.find((val) => val.user_id === viewUserProfile.r_id)

                setStatus(status1)
                setValues({
                    name: userProfile?.name,
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
                    porf_mbl: workData?.profession_mobile_number,
                    workTime: workData?.work_time,
                    study: workData?.education,
                    otherStudy: workData?.other_education,
                    language: list,
                    avatar: "http://localhost:3001/" + viewUserProfile?.avatar
                })
                let workDetails = workData?.work_details?.filter((data) => data)
                setFields(workDetails)

                let abx
                let rates = viewUserProfile?.rating?.length ?
                    abx = viewUserProfile.rating.find((id) => { return rid === id.user_id && id.rate }
                    )
                    : 0
                rates = abx === undefined ? 0 : rates.rate
                setStar(rates);
            }
        }
    }, [viewUserProfile, workData, saveUser])

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
    }

    const onHireUser = () => {
        setOpen(true);
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
    useEffect(() => {

        if (!displayLoading) {
            setDataLoad(false)
        }
    }, [displayLoading])

    return (
        Object.keys(viewUserProfile).length !== 0 && !dataLoad ?
            <Grid >
                {(displayLoading || workLoading || profileLoading) ? <Loading isLoad={true} /> :
                    <Card elevation={16}
                        sx={{
                            margin: 2,
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
                                    <Tooltip title="Save">
                                        {status ?
                                            <BookmarkIcon fontSize="large" cursor="pointer" onClick={onSaveClick} />
                                            :
                                            <BookmarkBorderIcon fontSize="large" cursor="pointer" onClick={onSaveClick} />
                                        }
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="h4" sx={{  color: "#163758" }}> PROFILE</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="h5" sx={{  color: "#163758" }}> {values.email} </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Rating sx={{ marginBottom: 2, marginLeft: 3 }} name="size-small" onChange={onRateClick} value={star} size="medium" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid container justifyContent="center"  >
                                        <Grid item xs={12} sm={11} md={4} sx={{ marginTop: "2%" }}>
                                            <Grid container direction={'row'} justifyContent="left" >
                                                <Grid item xs={6} sm={6} md={6} align="left"  >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Name
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Mobile No.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.mbl}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Married
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.married === false ? "No" : "Yes"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Physical Disability
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.physic_dis === false ? "No" : "Yes"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Address
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom sx={{ textTransform: "capitalize" }} fontSize={20}  >
                                                        : {values.house_no}, {values.house_name}, {values.street}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        City
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.city}, {values.pincode}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        State
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        : {values.state}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} >
                                            <Grid container justifyContent="center" item xs={12} sm={12} md={12}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ marginTop: "5%", width: 250, height: 250, borderRadius: "50%", border: "3px solid #163758"  }}
                                                    image={`${values.avatar}`}
                                                    alt="Paella dish"
                                                />
                                                <Grid container item xs={12} sm={12} md={12} justifyContent="center">
                                                    <Button sx={{ marginTop: "4%",width:"130px" }} size="large" variant="contained" onClick={onHireUser}>Hire</Button>
                                                    <HireForm open={open} user_id={workData.length !== 0 ? workData.r_id : ""} fields={fields} workTime={values.workTime} click={handleClose} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={11} md={4} sx={{ marginTop: "2%" }}>
                                            <Grid container direction={'row'} justifyContent="right" >
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Gender
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.gender}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Age
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {ageDate()} Years
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Profession No.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.porf_mbl}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left">
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Alternate No.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        : {values.altmbl}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Preffered Time
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        :  {values.workTime}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Languages
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        :  {values.language}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Education
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography sx={{ textTransform: "capitalize" }} gutterBottom fontSize={20}  >
                                                        :  {values.study}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} marginLeft={"3%"} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
                                                        Other Education
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={7} align="left" >
                                                    <Typography gutterBottom fontSize={20}  >
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
                    </Card >}
            </Grid>
            :
            <Grid container>
                {(displayLoading || workLoading || profileLoading) ? <Loading isLoad={true} /> :
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

export default ViewProfileDetail