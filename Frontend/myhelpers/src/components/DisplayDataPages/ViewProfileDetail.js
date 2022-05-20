import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
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
import workProfileActions from '../../store/slices/work-slice'
import { hireUserThunk, fetchSaveUserThunk, saveThunk, displayActions } from '../../store/slices/display-slice';
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
    const rid = params.rid;
    
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let { saveUser } = useSelector((state) => ({ ...state.displayStore }))
    let { saveUser, displayMessage, displayLoading, displayError } = useSelector((state) => ({ ...state.displayStore }))
    let { workMessage, workData, workError, workLoading } = useSelector((state) => ({ ...state.workProfileStore }))
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
        // dispatch(fetchUserProfileThunk(rid))
        // dispatch(fetchWorkThunk(rid))
        // dispatch(fetchSaveUserThunk(rid))

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
            // saveUser.map((val)=> values.r_id === val.user_id)
            // console.log("saveUser ::", saveUser.length !== 0 ? saveUser.map((val)=>console.log("H110"===val.user_id)):null);
        }
    }, [saveUser])
    // console.log(workData[0].workDetails)
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
            // console.log(error)
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

    }, [profileMessage, profileError, displayError, displayMessage,workError, workMessage, open])

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

                    : 2)

                setStatus(saveUser.length !== 0 ? saveUser.map((val) => userProfile[0].r_id === val.user_id).includes(true) ? true : false : false)

                console.log(userProfile[0].avatar)
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
                    language: list,
                    avatar: userProfile[0].avatar

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
    // const onHireUser = () => {
    //     dispatch(hireUserThunk(rid))
    //     setEnableHire(false)
    // }
    const onHireUser = () => {
        setOpen(true);
        dispatch(fetchSingleHireRequestThunk(workData[0].r_id))
    }
    const handleClose = () => {
        setOpen(false);
    };
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
        <Container align="center">
            {displayLoading||workLoading||profileLoading && <Loading isLoad={true} />}
            <Card elevation={16}
                sx={{
                // paddingLeft: "10%",
                // paddingRight: "10%",
                    maxWidth: 1200, minHeight: 600,

                    borderWidth: 3,
                    borderRadius: 6,
                    marginTop: 4,
                // backgroundColor: "#007bf717"
            }} >
                <CardContent >
                    <Grid container direction={'row'} justifyContent="center">
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
                                <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "2%" }}>
                                    <Grid container direction={'row'} >
                                        <Grid item xs={12} sm={6} md={6} marginLeft={"0%"} align="left" colo="#163758">
                                            <Typography gutterBottom variant="h6"  >
                                                Name
                                            </Typography>
                                            
                                            <Typography gutterBottom variant="h6"  >
                                                Mobile No.
                                            </Typography>
                                            

                                            <Typography gutterBottom variant="h6"  >
                                                Alternate No.
                                            </Typography>
                                            
                                         
                                            

                                            <Typography gutterBottom variant="h6"  >
                                                Married
                                            </Typography>
                                            

                                            <Typography gutterBottom variant="h6"  >
                                                Physical Disability
                                            </Typography>
                                            
                                            <Typography gutterBottom variant="h6"  >
                                                Address
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={5} sm={6} md={6} align="left" >
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                : {values.name}
                                            </Typography>
                                            

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.mbl}
                                            </Typography>
                                            

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.altml}
                                            </Typography>
                                            
                                       

                                            
                                            <Typography gutterBottom variant="h6"  >
                                                : {values.married === false ? "No" : "Yes"}
                                            </Typography>
                                            

                                            <Typography gutterBottom variant="h6"  >
                                                : {values.physic_dis === false ? "No" : "Yes"}
                                            </Typography>

                                            
                                            <Typography gutterBottom variant="body1"  >
                                                : {values.address}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} >
                                    <Grid container justifyContent="center" item xs={12} sm={12} md={12}>


                                        <CardMedia
                                            component="img"

                                            sx={{ marginTop: "5%", width: 250, height: 250, borderRadius: "50%" }}
                                            image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                                            alt="Paella dish"
                                        />
                                        <Grid container item xs={12} sm={12} md={12} justifyContent="center">
                                            <Button sx={{ marginTop: "4%", backgroundColor: "#163758" }} size="medium" variant="contained" onClick={onHireUser}>Hire</Button>
                                           
                                                {/* <HelperProfile click={handleClose} /> */}
                                                <HireForm open={open} hireValues={hireValues} sethireValues={sethireValues} work={hireWork} setWork={setHireWork} user_id={workData.length !== 0 ? workData[0].r_id : ""} fields={fields} workTime={values.workTime} click={handleClose} />

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={5} sx={{ marginTop: "2%" }}>
                                    <Grid container direction={'row'} >
                                        <Grid item xs={6} sm={6} md={6} marginLeft={"3%"} align="left" colo="#163758">
                                            <Typography gutterBottom variant="h6"  >
                                                Gender
                                            </Typography>


                                            <Typography gutterBottom variant="h6"  >
                                                Age
                                            </Typography>
                                            <Typography gutterBottom variant="h6"  >
                                                Preffered Time
                                            </Typography>

                                            <Typography gutterBottom variant="h6"  >
                                               Languages
                                            </Typography>


                                            <Typography gutterBottom variant="h6"  >
                                                Education
                                            </Typography>

                                            <Typography gutterBottom variant="h6"  >
                                                Other Education
                                            </Typography>


                                            


                                        </Grid>

                                        <Grid item xs={4} sm={4} md={4} align="left" >
                                            <Typography color="" gutterBottom variant="h6"  >
                                                : {values.gender.charAt(0).toUpperCase() + values.gender.slice(1)}
                                            </Typography>


                                            <Typography gutterBottom variant="h6"  >
                                                : {ageDate()} Years
                                            </Typography>
                                            <Typography sx={{ textTransform: "capitalize" }} gutterBottom variant="h6"  >
                                                : {values.porf_mbl}
                                            </Typography>


                                            <Typography gutterBottom variant="h6"  >
                                                :  {values.workTime}
                                            </Typography>


                                            <Typography gutterBottom variant="h6"  >
                                                : {values.study}
                                            </Typography>

                                            <Typography color="" gutterBottom variant="h6"  >
                                                : {values.otherStudy}
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
                                <Table sx={{ maxWidth: "100%", maxHeight: "100%" }}  size="small" aria-label="caption table">
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
        </Container>
    )
}

export default ViewProfileDetail