import * as React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { Card, Grid, InputLabel, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import WorkProfile from './WorkProfile';
import { useEffect, useState } from 'react';
import Loading from '../layouts/LoadingFile'
import Divider from '@mui/material/Divider';
import {
    profileActions,
    createProfileThunk, avatarThunk,
    aadharThunk, fetchUserProfileThunk
} from '../../store/slices/profile-slice';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const profileImg = require("../allImages/profile.gif")

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

    const dispatch = useDispatch()
    let rid = localStorage.getItem("r_id") ? localStorage.getItem("r_id") : logRid
    let role = localStorage.getItem("role") ? localStorage.getItem("role") : logRole

    let { userProfile, profileError, profileMessage, profileLoading } = useSelector((state) => ({ ...state.profileStore }))
    let { r_id: logRid, role: logRole } = useSelector((state) => ({ ...state.loginStore }))

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { open } = state;

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
        dispFile: ""
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

        if (userProfile) {
            setStar(userProfile?.rating ?
                userProfile.rating.map((id) =>
                    id.rate
                ).reduce((prev, curr) => prev + curr, 0)
                /
                userProfile.rating.map((id) =>
                    id.user_id
                ).length

                : 2)

            userProfile?.email &&
                setValues((prevState) => { return { ...prevState, email: userProfile.email } })

            userProfile?.name && setValues((prevState) => {
                return {
                    ...prevState,
                    fname: userProfile?.name.split(" ")[0],
                    lname: userProfile?.name.split(" ")[1],
                    dob: userProfile?.dob,
                    altmbl: userProfile?.alternate_mobile_number,
                    mbl: userProfile?.mobile_number,
                    gender: userProfile?.gender,
                    married: userProfile?.married,
                    physic_dis: userProfile?.physical_disable,
                    house_no: userProfile?.address.house_no,
                    house_name: userProfile?.address.house_name,
                    street: userProfile?.address.landmark,
                    city: userProfile?.address.city,
                    state: userProfile?.address?.state,
                    pincode: userProfile?.address?.pincode,
                    about: userProfile?.about,
                }
            })
            userProfile?.avatar && setfile({
                ...file,
                dispFile: userProfile.avatar
            })
            userProfile?.aadhar_card && setaadhar({ ...aadhar, dispFile: userProfile.aadhar_card })
            userProfile?.name && setEditHide(false)
            userProfile?.name && setDisable(true)
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
        if (clicked && file.dispFile ) {
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
                setClicked(false)
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
            setClicked(true)
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
            if (role === "Helper") {
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
            else {
                setValues((prevState) => {
                    return {
                        ...prevState,
                        dob: event.target.value
                    }
                })
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
                setErrorText("Start with [6-9] and 10 digits mobile no.!")
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
                setErrorText("Start with [6-9] and 10 digits mobile no.!")
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
            {profileLoading ? <Loading isLoad={true} /> :
                <div>
                    <Card
                        elevation={24}
                        sx={{
                            margin: 2,
                            height:{lg:600}
                        }}>
                        <div sx={{ padding: 0 }}>
                            <Grid container justifyContent="left">
                                {openModal && <WorkProfile click={handleClose} open={openModal} />}
                                <Grid item xs={12} sm={4} align="left" margin={2}>
                                    {!editHide &&
                                        <Button variant="contained" sx={{ fontSize: 16 }} color="info" onClick={onEditClick}>{fieldsDisable ? "Edit" : "Done"}</Button>
                                    }
                                </Grid>
                            </Grid>
                            <form onSubmit={editHide ? profileSaveHandler : onUpdateProfileHandler}>
                                <Grid container direction={'row'}>
                                    <Grid item xs={12} sm={12} md={3} justifyContent="center" >
                                        <Grid container>
                                            <Snackbar
                                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                                open={open}
                                                autoHideDuration={4000}
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
                                                            border: '3px solid #163758'
                                                        }}
                                                        src={file.dispFile || profileImg}
                                                        sx={{
                                                            marginTop: 0, width: 200, height: 250
                                                        }} />
                                                </Badge>
                                            </Grid>
                                            <Grid item sm={12} xs={12}>
                                                {enable && <Button variant="contained" sx={{ marginTop: 2, backgroundColor: "#03a9f4" }} onClick={avatarSubmit}>Upload Photo </Button>}
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Typography marginTop={1} gutterBottom sx={{ typography: { sm: 'body2', xs: 'h6', md: 'subtitle2' } }}>
                                                    {values.email.toLowerCase()}</Typography>
                                                {role === "Helper" && <Rating name="half-rating"
                                                    value={star}
                                                    readOnly={Boolean(true)}
                                                    size="medium"
                                                />}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item xs={12} sm={12} md={4.5} justifyContent="center"  >
                                        <Grid container spacing={2} justifyContent="center" >
                                            <Grid xs={12} sm={12} margin={1} marginLeft={5} item align="left">
                                                <Typography variant='h4'>
                                                    Profile Settings
                                                </Typography>
                                                <Typography marginLeft={1.5} sx={{ marginBottom: 1, color: "orange" }}
                                                    align='left' > { !fieldsDisable ?
                                                        "Require to fill all the fields and choose aadhar card" : "Click on edit button for update profile."}</Typography>
                                            </Grid>
                                            <Grid xs={12} sm={5.5} item>
                                                <TextField
                                                    required
                                                    variant='outlined'
                                                    id="firstname"
                                                    label="First Name"
                                                    fullWidth
                                                    value={values.fname}
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        style: { textTransform: "capitalize" }
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
                                                    value={values.lname}
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        style: { textTransform: "capitalize" }
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
                                                        maxLength: 10
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
                                                        maxLength: 10
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
                                                <div align="left"><InputLabel >Gender *</InputLabel></div>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="gender"
                                                    value={values.gender}
                                                    onChange={(val) => {
                                                        !fieldsDisable && setValues((prevState) => { return { ...prevState, gender: val.target.value } })
                                                    }}
                                                >
                                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                                </RadioGroup>
                                            </Grid>
                                            <Grid xs={12} sm={3.5} item>
                                                <div align="left"><InputLabel >Marital Status *</InputLabel></div>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="married"
                                                    value={values.married}
                                                    onChange={(val) => {
                                                        !fieldsDisable && setValues((prevState) => { return { ...prevState, married: val.target.value } })
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="true"
                                                        control={<Radio />}
                                                        label="Yes" />
                                                    <FormControlLabel
                                                        value="false"
                                                        control={<Radio />}
                                                        label="No" />
                                                </RadioGroup>
                                            </Grid>
                                            <Grid xs={12} sm={3.5} item>
                                                <div align="left"><InputLabel >Any Phiysical Disability *</InputLabel></div>
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
                                                                style={{ display: 'none' }}
                                                            />
                                                            <Typography color="primary" variant="button" style={{ cursor: "pointer" }} >
                                                                Choose Aadhar
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
                                                            <Typography variant="body2" align="right" marginTop={0.5} color="secondary">
                                                                1 MB size PDF file only!</Typography>
                                                        }
                                                        {aadhar.dispFile && !fieldsDisable &&
                                                            <IconButton sx={{ padding: 0 }} onClick={onCancel} aria-label="upload picture" component="div">
                                                                <CancelSharpIcon color="error" fontSize="medium" />
                                                            </IconButton>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item xs={12} sm={12} md={4} justifyContent="center"   >
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
                                                    value={values.house_name}
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        style: { textTransform: "capitalize" }
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
                                                    value={values.street}
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        style: { textTransform: "capitalize" }
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
                                                    value={values.city}
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        style: { textTransform: "capitalize" }
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
                                                    value={values.state}
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        style: { textTransform: "capitalize" }
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
                                                    
                                                    multiline
                                                    maxRows={3}
                                                    variant='outlined'
                                                    id="about"
                                                    label="About you"
                                                    fullWidth
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        maxLength: 100,
                                                    }}
                                                    placeholder='Please type some information about you OR what you want!'
                                                    value={values.about}
                                                    onChange={(event) => setValues((prevState) => { return { ...prevState, about: event.target.value } })}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} justifyContent="center" marginTop={13} marginLeft={1} >
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
                        </div>
                    </Card>
                </div>
            }
        </Grid >
    );
}

export default ClientProfile