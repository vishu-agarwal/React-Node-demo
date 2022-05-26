
//header file
import * as React from 'react';
//   mui
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { Backdrop, Card, Grid, InputLabel, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import WorkProfile from './WorkProfile';
import { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
import Loading from '../layouts/LoadingFile'
import Divider from '@mui/material/Divider';

import { profileActions } from '../../store/slices/profile-slice'
import {
    createProfileThunk, updateProfileThunk, avatarThunk,
    aadharThunk, fetchUserProfileThunk, fetchEmailThunk, fetchAvatarThunk
} from '../../store/slices/profile-slice';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import Rating from '@mui/material/Rating';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

const ClientProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { userProfile, profileError, profileMessage, profileLoading } = useSelector((state) => ({ ...state.profileStore }))
    let { r_id: logRid, role: logRole } = useSelector((state) => ({ ...state.loginStore }))

    let rid = localStorage.getItem("r_id") ? localStorage.getItem("r_id") : logRid
    let role = localStorage.getItem("role") ? localStorage.getItem("role") : logRole

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const closeSnackbar = () => {
        setState({ ...state, open: false });
    };

    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")

    const [star, setStar] = useState(2)
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        email: '',
        dob: '',
        altmbl: '',
        mbl: '',
        gender: '',
        married: '',
        physic_dis: '',
        house_no: '',
        house_name: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        about: '',
    });

    const [clicked, setClicked] = useState(false)
    const [enable, setenable] = useState(false)

    const [file, setfile] = useState({
        upldfile: [],
        dispFile: ''
    })

    const [aadhar, setaadhar] = useState({
        upldfile: [],
        dispFile: ''
    })

    const [openModal, setopenModal] = useState(false);

    useEffect(() => {
        dispatch(fetchUserProfileThunk(rid))
    }, [])

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = openModal ? 'hidden' : 'auto';
        if (profileMessage.length !== 0) {
            setState({ open: true });
            setSnackColor("info")
            setSnackMessage(profileMessage)
            setClicked(true)
            dispatch(profileActions.messageReducer())
        }
        if (profileError.length !== 0) {
            setState({ open: true });
            setSnackColor("error")
            setSnackMessage(profileError)
            dispatch(profileActions.errorReducer())
        }

    }, [openModal, profileError, profileMessage])

    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)

    useEffect(() => {
        if (userProfile.length !== 0) {

            setStar(userProfile[0]?.rating ?
                userProfile[0].rating.map((id) =>
                    id.rate
                ).reduce((prev, curr) => prev + curr, 0)
                /
                userProfile[0].rating.map((id) =>
                    id.user_id
                ).length

                : 2)
            
            userProfile[0]?.email &&
                setValues((prevState) => { return { ...prevState, email: userProfile[0].email } })
            
            userProfile[0]?.name && setValues((prevState) => {
                return {
                    ...prevState,
                    fname: userProfile[0]?.name.split(" ")[0],
                    lname: userProfile[0]?.name.split(" ")[1],
                    dob: userProfile[0]?.dob,
                    altmbl: userProfile[0]?.alternate_mobile_number,
                    mbl: userProfile[0]?.mobile_number,
                    gender: userProfile[0]?.gender,
                    married: userProfile[0]?.married,
                    physic_dis: userProfile[0]?.physical_disable,
                    house_no: userProfile[0]?.address.house_no,
                    house_name: userProfile[0]?.address.house_name,
                    street: userProfile[0]?.address.landmark,
                    city: userProfile[0]?.address.city,
                    state: userProfile[0]?.address?.state,
                    pincode: userProfile[0]?.address?.pincode,
                    about: userProfile[0]?.about,
                }
            })
            userProfile[0]?.avatar && setfile({
                ...file,
                dispFile: userProfile[0].avatar
            })
            userProfile[0]?.aadhar_card && setaadhar({ ...aadhar, dispFile: userProfile[0].aadhar_card })
            userProfile[0]?.name && setEditHide(false)
            userProfile[0]?.name && setDisable(true)
        }
    }, [userProfile])

    const addWorkHandler = () => {
        setopenModal(true);
    }
    const handleClose = () => {
        setopenModal(false);
    };
    const profileSaveHandler = (e) => {
        e.preventDefault()
        if (clicked || file.dispFile) {
            if (aadhar.dispFile) {
                const formdata = new FormData()
                formdata.append('aadharCard', aadhar.upldfile)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                setOnClick(true)
                const argAadhar = {
                    config,
                    formdata,
                    rid
                }
                const argCreateProfile = {
                    values,
                    rid
                }
                dispatch(createProfileThunk(argCreateProfile))
                dispatch(aadharThunk(argAadhar))
                setEditHide(false)
                setDisable(true)
            }
            else {
                setState({ open: true });
                setSnackColor("error")
                setSnackMessage("Please Choose Aadhar Card PDf !")
            }
        }
        else {
            setState({ open: true });
            setSnackColor("error")
            setSnackMessage("Please click on upload photo button before save!")
        }
    }
    const onUpdateProfileHandler = (e) => {
        e.preventDefault()
        const arg = {
            values,
            aadhar: aadhar.dispFile,
            rid
        }
        dispatch(createProfileThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(TouchRipple)
    }
    const onEditClick = () => {
        setDisable(!fieldsDisable)
    }
    const avatarFileType = ["image/png", "image/jpeg"]
    const onAvatarChang = (e) => {
        let avatarFile = e.target.files[0]
        if (avatarFile && avatarFileType.includes(avatarFile.type)) {
            // size in bytes
            if (avatarFile.size <= 512000) {
                setfile({
                    ...file,
                    upldfile: avatarFile,
                    dispFile: URL.createObjectURL(avatarFile)
                })
                setenable(true)
            }
            else {
                setState({ open: true });
                setSnackColor("error")
                setSnackMessage("select file with size below 500 KB!")
            }
        }
        else {
            setState({ open: true });
            setSnackColor("error")
            setSnackMessage("Please select Image file with (png|jpg|jpeg)!")
        }
    }

    const avatarSubmit = () => {
        if (file.dispFile) {
            const formdata = new FormData()
            formdata.append('avatar', file.upldfile)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const argAvatar = {
                config,
                formdata,
                rid
            }
            dispatch(avatarThunk(argAvatar))
            setenable(false)
        }
        else {
            setState({ open: true });
            setSnackColor("error")
            setSnackMessage("Please upload profile picture!")
        }
    }
    const aadharFileType = ['application/pdf']
    const onAadharChange = (val) => {
        let aadharFile = val.target.files[0]
        if (aadharFile && aadharFileType.includes(aadharFile.type)) {
            if (aadharFile.size <= 1048576) {
                setaadhar((prevState) => {
                    return {
                        ...prevState,
                        upldfile: aadharFile,
                        dispFile: aadharFile.name
                    }
                })
            }
            else {
                setState({ open: true });
                setSnackColor("error")
                setSnackMessage("select file with size below 1 MB!")
            }
        }
        else {
            setState({ open: true });
            setSnackColor("error")
            setSnackMessage("Please select only  PDF file! ")
        }
    }
    const onCancel = () => {
        setaadhar({
            upldfile: [],
            dispFile: ''
        })
    }
    const onAadharView = () => {
        window.open(`http://localhost:3001/${aadhar.dispFile}`)
    }
    const [onClick, setOnClick] = useState(false)
    const hiddenFileInput = React.useRef(null);

    const [saveEnable, setSaveEnable] = useState(false)
    const [errorEnable, setErrorEnable] = useState({
        fname: false,
        lname: false,
        dob: false,
        altmbl: false,
        mbl: false,
        house_no: false,
        house_name: false,
        street: false,
        city: false,
        state: false,
        pincode: false,
    })
    const [errorText, setErrorText] = useState("");

    const onChange = (event) => {

        if (event.target.id === "firstname") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    fname: event.target.value
                }
            })
            if (/^[A-Za-z]+$/.test(event.target.value)) {
                setErrorText("")
                setErrorEnable({ ...errorEnable, fname: false })
            }
            else {
                setErrorEnable({ ...errorEnable, fname: true })
                setErrorText("Please enter valid Name!")
            }
        }
        else if (event.target.id === "lastname") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    lname: event.target.value
                }
            })
            if (/^[A-Za-z]+$/.test(event.target.value)) {
                setErrorText("")
                setErrorEnable({ ...errorEnable, lname: false })
            }
            else {
                setErrorEnable({ ...errorEnable, lname: true })
                setErrorText("Please enter valid Name!")
            }
        }
        else if (event.target.id === "dob") {
            var today = new Date();
            var birthDate = new Date(event.target.value);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age >= 18) {
                setErrorEnable({ ...errorEnable, dob: false })
                setValues((prevState) => {
                    return {
                        ...prevState,
                        dob: birthDate.toISOString().split('T')[0]
                    }
                })
            }
            else {
                setErrorEnable({ ...errorEnable, dob: true })
                setErrorText("Age should me 18 or more than!")
            }
        }
        else if (event.target.id === "alt-mob") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    altmbl: event.target.value
                }
            })
            if (/^[6-9][0-9]{9}$/.test(event.target.value)) {
                if (event.target.value !== values.mbl) {
                    setErrorEnable({ ...errorEnable, altmbl: false })
                } else {
                    setErrorEnable({ ...errorEnable, altmbl: true })
                    setErrorText("Different from mobile no.!")
                }
            }
            else {
                setErrorEnable({ ...errorEnable, altmbl: true })
                setErrorText("Please enter valid Mobile No.!")
            }
        }
        else if (event.target.id === "mob") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    mbl: event.target.value
                }
            })
            if (/^[6-9][0-9]{9}$/.test(event.target.value)) {
                if (event.target.value !== values.altmbl) {
                    setErrorEnable({ ...errorEnable, mbl: false })
                } else {
                    setErrorEnable({ ...errorEnable, mbl: true })
                    setErrorText("Different from alaternate no.!")
                }
            }
            else {
                setErrorEnable({ ...errorEnable, mbl: true })
                setErrorText("Please enter valid Mobile No.!")
            }
        }
        else if (event.target.id === "house-No") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    house_no: event.target.value
                }
            })
            if (/^[-A-Z0-9]*$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, house_no: false })
            }
            else {
                setErrorEnable({ ...errorEnable, house_no: true })
                setErrorText("Please enter valid House No.!")
            }
        }
        else if (event.target.id === "housename") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    house_name: event.target.value
                }
            })
            if (/^[A-Z a-z]+$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, house_name: false })
            }
            else {
                setErrorEnable({ ...errorEnable, house_name: true })
                setErrorText("Please enter valid House Name!")
            }
        }
        else if (event.target.id === "street") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    street: event.target.value
                }
            })
            if (/^[a-z A-Z0-9]*$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, street: false })
            }
            else {
                setErrorEnable({ ...errorEnable, street: true })
                setErrorText("Please enter valid Street Name!")
            }
        }
        else if (event.target.id === "city") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    city: event.target.value
                }
            })
            if (/^[A-Za-z]+$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, city: false })
            }
            else {
                setErrorEnable({ ...errorEnable, city: true })
                setErrorText("Please enter valid City Name!")
            }
        }
        else if (event.target.id === "state") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    state: event.target.value
                }
            })
            if (/^[A-Za-z]+$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, state: false })
            }
            else {
                setErrorEnable({ ...errorEnable, state: true })
                setErrorText("Please enter valid State Name!")
            }
        }
        else if (event.target.id === "pincode") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    pincode: event.target.value
                }
            })
            if (/^[0-9]{6}$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, pincode: false })
            }
            else {
                setErrorEnable({ ...errorEnable, pincode: true })
                setErrorText("Please enter valid Pincode!")
            }
        }
        else {
            setErrorText("")
        }
    };
    useEffect(() => {
        const areTrue = Object.values(errorEnable).every(
            value => value !== true
        );
        const isNullish = Object.values(values).every(value => value !== "");
        aadhar.dispFile !== "" ? isNullish ? areTrue ? setSaveEnable(true) : setSaveEnable(false) : setSaveEnable(false) : setSaveEnable(false)
    }, [errorEnable, values, aadhar.dispFile])
    return (
        <Grid >
            {profileLoading && <Loading isLoad={true} />  }
            <Card
                elevation={16}
                sx={{
                    maxWidth: 1400, maxHeight: 5000,
                    margin: '0 auto',
                    marginTop: 9,
                    borderWidth: 2,
                    // borderColor:"#163758"
                }}>
                <CardContent>
                    <Grid container justifyContent="left">
                        <Grid item xs={12} sm={4} align="left" >
                            {!editHide &&
                                <Button variant="contained" color="info" onClick={onEditClick}>{fieldsDisable ? "Edit" : "Done"}</Button>
                            }
                        </Grid>
                    </Grid>
                    {openModal && <WorkProfile click={handleClose} open={openModal} />}
                    <form onSubmit={editHide ? profileSaveHandler : onUpdateProfileHandler}>
                        <Grid container direction={'row'}>
                            <Grid item xs={12} sm={12} md={3} justifyContent="center" >
                                <Grid container>
                                    {/* <Grid item xs={12} sm={3} justifyContent="left" >
                                        {editHide && <Button variant="contained" color="info" onClick={onEditClick}>{fieldsDisable ? "Edit" : "Done"}</Button>}
                                    </Grid> */}
                                    <Snackbar
                                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                        open={open}
                                        autoHideDuration={6000}
                                        onClose={closeSnackbar}
                                    >
                                        <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                                            {snackMessage}
                                        </Alert>
                                    </Snackbar>

                                    <Grid item sm={12} xs={12} marginTop={10}>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            badgeContent={
                                                <label htmlFor="icon-button-file">
                                                    <Input accept="image/*" id="icon-button-file" type="file" name="avatar" onChange={onAvatarChang} disabled={fieldsDisable} />
                                                    <IconButton aria-label="upload picture" component="span" >

                                                        <EditRoundedIcon sx={{ color: "#163758" }} fontSize="large" />

                                                    </IconButton>
                                                </label>
                                            }
                                        >
                                            <Avatar alt="Profile*"
                                                style={{
                                                    // backgroundImage: `url(${profileImg})`,
                                                    // backgroundRepeat: "no-repeat",
                                                    // backgroundSize: "100%"
                                                    border: '3px solid #163758',
                                                    backgroundColor: ""
                                                }}
                                                src={file.dispFile}
                                                sx={{
                                                    marginTop: 0, width: 200, height: 250
                                                }} />
                                        </Badge>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                        {enable && <Button variant="contained" sx={{ marginTop: 2, backgroundColor: "#03a9f4" }} onClick={avatarSubmit}>Upload Photo </Button>}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography marginTop={1} gutterBottom sx={{ typography: { sm: 'body2', xs: 'h6', md: 'subtitle2' } }}>{values.email.toLowerCase()}</Typography>
                                        {/* <Typography variant="h5"  >{userProfile.length !== 0 ? userProfile[0].email : ''}</Typography> */}
                                        {role === "Helper" && <Rating name="half-rating"
                                            value={star}
                                            readOnly={Boolean(true)}
                                            size="medium"
                                        />}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs={12} sm={6} md={4.5} justifyContent="center"  >
                                <Grid container spacing={2} justifyContent="center" >
                                    <Grid xs={12} sm={12} margin={2} marginLeft={5} item align="left">
                                        <Typography variant='h4'>
                                            Profile Settings
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="firstname"
                                            label="First Name"
                                            fullWidth
                                            value={values.fname.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.fname}
                                            helperText={errorEnable.fname && errorText} />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="lastname"
                                            label="Last Name"
                                            fullWidth
                                            value={values.lname.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),

                                            }}
                                            onChange={onChange}
                                            error={errorEnable.lname}
                                            helperText={errorEnable.lname && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="mob"
                                            label="Mobile Number"
                                            fullWidth
                                            value={values.mbl}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),

                                            }}
                                            onChange={onChange}
                                            error={errorEnable.mbl}
                                            helperText={errorEnable.mbl && errorText}
                                        />

                                    </Grid>

                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="alt-mob"
                                            label="Alternate Number"
                                            fullWidth
                                            value={values.altmbl}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),

                                            }}
                                            onChange={onChange}
                                            error={errorEnable.altmbl}
                                            helperText={errorEnable.altmbl && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={11} item>
                                        <TextField
                                            id="dob"
                                            size="medium"
                                            label="Date Of Birthday"
                                            type="date"
                                            required
                                            fullWidth

                                            value={values.dob}
                                            onChange={onChange}
                                            error={errorEnable.dob}
                                            helperText={errorEnable.dob && errorText}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),

                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={3.5} item >
                                        <div align="left"><InputLabel >Gender</InputLabel></div>
                                        <RadioGroup
                                            row

                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="gender"
                                            value={values.gender}
                                            onChange={(val) => { !fieldsDisable && setValues((prevState) => { return { ...prevState, gender: val.target.value } }) }}
                                        >
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid xs={12} sm={3.5} item>
                                        <div align="left"><InputLabel >Marital Status</InputLabel></div>
                                        <RadioGroup
                                            row

                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="married"
                                            value={values.married}
                                            onChange={(val) => { !fieldsDisable && setValues((prevState) => { return { ...prevState, married: val.target.value } }) }}
                                        >
                                            <FormControlLabel
                                                value="true"

                                                control={<Radio />}
                                                label="Yes"
                                            />
                                            <FormControlLabel
                                                value="false"

                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid xs={12} sm={3.5} item>
                                        <div align="left"><InputLabel >Any Phiysical Disability</InputLabel></div>
                                        <RadioGroup
                                            row

                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="disability"
                                            value={values.physic_dis}
                                            onChange={(val) => { !fieldsDisable && setValues((prevState) => { return { ...prevState, physic_dis: val.target.value } }) }}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid xs={12} sm={11} item >
                                        <Grid container justifyContent="center">
                                            <Grid xs={12} sm={4} item align="left">
                                                <label htmlFor="contained-button-file">
                                                    <Input id="contained-button-file" type="file" name="aadharCard"
                                                        disabled={fieldsDisable}
                                                        ref={hiddenFileInput}
                                                        onChange={onAadharChange}
                                                        // disabled={fieldsDisable}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <Typography color="primary" variant="button" style={{ fontWeight: 800, cursor: "pointer" }} >
                                                        Upload Aadhar
                                                    </Typography>
                                                </label>
                                            </Grid>
                                            <Grid xs={12} sm={8} item align="left" >
                                                {aadhar.dispFile ?
                                                    <>
                                                        {!editHide &&
                                                            < IconButton sx={{ padding: 0 }} onClick={onAadharView} aria-label="upload picture" component="div">
                                                                <VisibilityRoundedIcon color="info" size="large" />
                                                            </IconButton>
                                                        }
                                                        <Typography marginLeft={1} variant="caption">{aadhar.dispFile}</Typography>
                                                    </>
                                                    :
                                                    <Typography variant="body2" align="right" marginTop={0.5} color="secondary" >1 MB size PDF file only!</Typography>
                                                }
                                                {aadhar.dispFile && !fieldsDisable &&
                                                    <IconButton sx={{ padding: 0 }} onClick={onCancel} aria-label="upload picture" component="div">
                                                        <CancelSharpIcon color="error" fontSize="medium" />
                                                    </IconButton>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={11} sm={11} item align="left" color="#b71c1c">
                                        {/* <Typography variant="body2" display="block">1 MB size PDF file only!</Typography> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs={12} sm={6} md={4} justifyContent="center"   >
                                <Grid container spacing={2} justifyContent="center" >
                                    <Grid xs={12} sm={12} margin={1} marginLeft={5} item align="left">
                                        <Typography variant='h6'>
                                            Address Details
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="house-No"
                                            label="House/Flat-No."
                                            placeholder='A-101'
                                            fullWidth
                                            value={values.house_no.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.house_no}
                                            helperText={errorEnable.house_no && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="housename"
                                            label="House/Appartment Name"
                                            fullWidth
                                            value={values.house_name.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.house_name}
                                            helperText={errorEnable.house_name && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="street"
                                            label="Landmark/Area/Street"
                                            fullWidth
                                            value={values.street.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.street}
                                            helperText={errorEnable.street && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="city"
                                            label="City"
                                            fullWidth
                                            value={values.city.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.city}
                                            helperText={errorEnable.city && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="state"
                                            label="State"
                                            fullWidth
                                            value={values.state.toUpperCase()}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.state}
                                            helperText={errorEnable.state && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5.5} item>
                                        <TextField
                                            required
                                            variant='outlined'
                                            id="pincode"
                                            label="Pincode"
                                            fullWidth
                                            value={values.pincode}
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                            }}
                                            onChange={onChange}
                                            error={errorEnable.pincode}
                                            helperText={errorEnable.pincode && errorText}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={11} item>
                                        <TextField
                                            required
                                            multiline
                                            maxRows={3}
                                            variant='outlined'
                                            id="about"
                                            label="About you"
                                            fullWidth
                                            inputProps={{
                                                readOnly: Boolean(fieldsDisable),
                                                maxLength: 100
                                            }}
                                            placeholder='Please type some information about you OR what you want!'
                                            value={values.about}
                                            onChange={(event) => setValues((prevState) => { return { ...prevState, about: event.target.value } })}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} justifyContent="center" marginTop={15} marginLeft={1} >
                                    {role === "Helper" && !fieldsDisable &&
                                        <Grid item xs={12} sm={6} align="left">
                                            <Button variant="contained" color='primary' onClick={addWorkHandler} fullWidth size="large" >
                                                {editHide ? "Add Work" : !fieldsDisable && "Update Work "}
                                            </Button>

                                        </Grid>
                                    }
                                    {saveEnable && !fieldsDisable &&
                                        <Grid xs={12} sm={6} item align="right">
                                            <Button type='submit' variant="contained" color='primary' size="large" fullWidth >
                                                {editHide ? "Save" : !fieldsDisable && "Update"}
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid >
    );
}

export default ClientProfile