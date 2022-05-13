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
import PhotoCameraSharpIcon from '@mui/icons-material/PhotoCameraSharp';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import WorkProfile from '../helpers/WorkProfile';
import { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
import profileImg from '../profiile1.jpg';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import profileActions from '../../store/slices/profile-slice'
import { createProfileThunk, avatarThunk, aadharThunk, fetchProfileThunk } from '../../store/slices/profile-slice';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

const Input = styled('input')({
    display: 'none',
});


const theme = createTheme({

    palette: {
        primary: {
            main: red[900],
        },
    },

});

const ClientProfile = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // const classes = useStyles();
    let role = "Helper"
    // console.log(xyz)


    // // We'll update "values" as the form updates
    // const [values, setValues] = useState(initialFormValues);
    // // "errors" is used to check the form for errors
    // const [errors, setErrors] = useState({});
    // const validate = (fieldValues = values) => {
    //     // this function will check if the form values are valid
    // }
    // const {
    //     handleInputValue = (fieldValues = values) => {
    //         // this function will be triggered by the text field's onBlur and onChange events
    //     },
    //     handleFormSubmit = async (e) => {
    //         // this function will be triggered by the submit event
    //     },
    //     formIsValid = () => {
    //         // this function will check if the form values and return a boolean value
    //     }
    // } = useFormControls();
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        dob: '',
        altmbl: '',
        email: '',
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

    //helper profile Modal state
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProfileThunk())
    }, [])

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = open ? 'hidden' : 'auto';

        if (message.length !== 0) {
            alert(message)
            setClicked(true)
        }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(profileActions.errorReducer())
        }

    }, [open, message, error])

    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)
    // console.log(fields)



    // const str2blob = txt => new Blob([txt]);
    useEffect(() => {
        if (userProfile.length !== 0) {
            setValues({
                fname: userProfile[0].name.split(" ")[0],
                lname: userProfile[0].name.split(" ")[1],
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
            setfile({
                ...file,
                // dispFile: URL.createObjectURL(str2blob(userProfile[0].avatar)),
                dispFile: userProfile[0].avatar

            })

            setEditHide(false)
            setDisable(true)
        }
    }, [userProfile])


    // console.log(values,file.dispFile)
    const addWorkHandler = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const profileSaveHandler = (e) => {
        // console.log("save call")
        e.preventDefault()
        if (clicked) {
            if (aadhar.dispFile) {
                const formdata = new FormData()

                formdata.append('aadharCard', aadhar.upldfile)
                // console.log(formdata)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                // console.log("config :: ", config)
                setOnClick(true)
                dispatch(aadharThunk(formdata, config))
                dispatch(createProfileThunk({ values }))
                // setClicked(true)
                // console.log("values:: ", values)
                setEditHide(false)
                setDisable(true)
            }
            else {
                alert("please Choose Aadhar Card PDf !")
            }
            // console.log(values)


        }
        else {
            alert("Please click on upload photo button before save!")
        }
    }
    const onUpdateProfileHandler = (e) => {
        e.preventDefault()
        // const arg = {
        //     values,
        //     lang,
        //     fields
        // }
        // console.log(arg)

        // dispatch(updateWorkThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(TouchRipple)
        //close this form model
        // props.click()

    }
    const onEditClick = () => {
        setDisable(!fieldsDisable)

    }
    const avatarFileType = ["image/png", "image/jpeg"]
    // const avatarFileSize = 
    const onAvatarChang = (e) => {

        // console.log("onchange")
        let avatarFile = e.target.files[0]
        // console.log(avatarFile)
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
                alert("select file with size below 500 KB!")
            }
        }
        else {
            alert("Please select Image file with (png|jpg|jpeg)!")
        }
    }

    const avatarSubmit = () => {

        // e.preventDefault()
        // console.log("form submit")
        if (file.dispFile) {
            const formdata = new FormData()

            formdata.append('avatar', file.upldfile)
            // console.log(formdata)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            // console.log("config :: ", config)

            dispatch(avatarThunk(formdata, config, file.upldfile))
            setenable(false)
            // setClicked(true)
            // console.log("values:: ", values)
        }
        else {
            alert("please upload profile picture !")
        }
    }
    const aadharFileType = ['application/pdf']
    const onAadharChange = (val) => {
        let aadharFile = val.target.files[0]
        // console.log("aadharFile:: ", aadharFile)
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
                alert("select file with size below 1 MB!")
            }
        }
        else {
            alert("Please select only  PDF file! ")
        }
    }
    const onCancel = () => {
        // console.log("setaadhar")
        // window.location.reload()
        setaadhar({
            upldfile: [],
            dispFile: ''
        })
    }
    const [onClick, setOnClick] = useState(false)
    const hiddenFileInput = React.useRef(null);

    // const handleClick = event => {
    //     hiddenFileInput.current.click();
    // };

    const [saveEnable, setSaveEnable] = useState(false)
    const [errorEnable, setErrorEnable] = useState({
        fname: false,
        lname: false,
        dob: false,
        altmbl: false,
        email: false,
        house_no: false,
        house_name: false,
        street: false,
        city: false,
        state: false,
        pincode: false,
    })

    // const emailValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const [errorText, setErrorText] = useState("");

    const onChange = (event) => {
        // const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        // if (phoneRegex.test(event.target.value)) {
        //     console.log(event.target.value)
        // setValues((prevState) => { return { ...prevState, altmbl: event.target.value } }) 

        // alpha numeric  expression /^[a-zA-Z0-9]*$/
        ///^[A-Za-z]+$/ only letters
        // only numbers
        // only alphabels and limited characters /^[a-zA-Z ]{2,30}$/;
        //mobile no validation /^[6-9][0-9]{9}$/
        // /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im 
        // console.log("field id :: ", event.target.id)

        if (event.target.id === "firstname") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    fname: event.target.value
                }
            })
            if (/^[A-Za-z]+$/.test(event.target.value)) {
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, fname: false })

            }
            else {
                // console.log("wrong!")
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
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, lname: false })

            }
            else {
                // console.log("wrong!")
                setErrorEnable({ ...errorEnable, lname: true })
                setErrorText("Please enter valid Name!")
            }
        }
        else if (event.target.id === "dob") {

            var today = new Date();
            console.log(today)
            var birthDate = new Date(event.target.value);
            // console.log(birthDate.toISOString())
            var age = today.getFullYear() - birthDate.getFullYear();
            // console.log(age)
            var m = today.getMonth() - birthDate.getMonth();
            // console.log(m)
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            // console.log(age)
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
                // console.log("wrong!")
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
                console.log("correct!")
                setErrorEnable({ ...errorEnable, altmbl: false })

            }
            else {
                console.log("wrong!")
                setErrorEnable({ ...errorEnable, altmbl: true })
                setErrorText("Please enter valid Mobile No.!")
            }
        }
        else if (event.target.id === "email") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    email: event.target.value
                }
            })
            if (/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/.test(event.target.value)) {
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, email: false })

            }
            else {
                // console.log("wrong!")
                setErrorEnable({ ...errorEnable, email: true })
                setErrorText("Please enter valid Email address!")
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
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, house_no: false })

            }
            else {
                // console.log("wrong!")
                setErrorEnable({ ...errorEnable, house_no: true })
                setErrorText("Please enter valid House No.!")
            }
        }
        else if (event.target.id === "housername") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    house_name: event.target.value
                }
            })
            if (/^[A-Z a-z]+$/.test(event.target.value)) {
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, house_name: false })

            }
            else {
                // console.log("wrong!")
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
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, street: false })

            }
            else {
                // console.log("wrong!")
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
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, city: false })

            }
            else {
                // console.log("wrong!")
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
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, state: false })

            }
            else {
                // console.log("wrong!")
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
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, pincode: false })

            }
            else {
                // console.log("wrong!")
                setErrorEnable({ ...errorEnable, pincode: true })
                setErrorText("Please enter valid Pincode!")
            }
        }

        else {
            setErrorText("")
        }
    };
    useEffect(() => {
        console.log("error::", errorEnable)
        const areTrue = Object.values(errorEnable).every(
            value => value !== true

        );

        console.log("allerror::", areTrue);
        const isNullish = Object.values(values).every(value => value !== "");
        console.log("null", isNullish)

        aadhar.dispFile !== "" ? isNullish ? areTrue ? setSaveEnable(true) : setSaveEnable(false) : setSaveEnable(false) : setSaveEnable(false)

    }, [errorEnable, values, aadhar.dispFile])
    return (
        <Grid>
            <Card
                elevation={8}
                sx={{
                    maxWidth: 800, maxHeight: 8000,
                    margin: '0 auto',
                    paddingTop: 1,
                    marginTop: 1,
                    marginBottom: 1,
                }}>
                <CardContent>
                    <Grid container direction={'row'} spacing={0}>
                        <Grid item xs={2} sm={2} justifyContent="left" >
                            {!editHide && <Button variant="contained" color="info" onClick={onEditClick}>{fieldsDisable ? "Edit" : "Done"}</Button>}
                        </Grid>
                    </Grid>
                    <Typography variant="h4"  >Profile</Typography>
                    <Typography variant="h5"  >Registered no</Typography>
                    <form onSubmit={editHide ? profileSaveHandler : onUpdateProfileHandler}>
                        <Grid container spacing={1}>
                            <Grid xs={12} item >
                                <Badge

                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    badgeContent={
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" name="avatar" onChange={onAvatarChang} />
                                            <IconButton color="primary" aria-label="upload picture" component="span" >
                                                {/* <ThemeProvider theme={theme}> */}
                                                <EditRoundedIcon color="error" fontSize="large" disabled={fieldsDisable} />
                                                {/* </ThemeProvider> */}
                                            </IconButton>
                                        </label>
                                    }
                                >
                                    {/* /static/images/avatar/2.jpg */}
                                    <Avatar alt="Profile*" style={{

                                        // border: '2.0px solid blue',
                                        backgroundImage: `url(${profileImg})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100%"
                                    }}
                                        src={file.dispFile} sx={{ width: 130, height: 130 }} />
                                </Badge>
                            </Grid>
                        </Grid>
                        {enable && <Button variant="contained" sx={{ marginTop: 1 }} color="warning" disabled={fieldsDisable} onClick={avatarSubmit}>Upload Photo </Button>}

                        <Typography color='green' variant='body1' component='p' marginTop={1}>Please fill up this form is necessary to move forward !</Typography>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Personal Details : </Typography>

                        <Grid container spacing={1}>

                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="firstname"
                                    label="First Name"
                                    fullWidth
                                    value={values.fname.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.fname}
                                    helperText={errorEnable.fname && errorText} />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="lastname"
                                    label="Last Name"
                                    fullWidth
                                    value={values.lname.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.lname}
                                    helperText={errorEnable.lname && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    id="dob"
                                    label="Date Of Birthday"
                                    type="date"
                                    required
                                    fullWidth
                                    value={values.dob}
                                    onChange={onChange}
                                    error={errorEnable.dob}
                                    helperText={errorEnable.dob && errorText}
                                    disabled={fieldsDisable}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>

                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="alt-mob"
                                    label="Alternate Mobile Number"
                                    fullWidth
                                    value={values.altmbl}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.altmbl}
                                    helperText={errorEnable.altmbl && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={12} item>
                                <TextField
                                    type='email'
                                    required
                                    variant='outlined'
                                    id="email"
                                    label="Email Address"
                                    fullWidth
                                    value={values.email}
                                    // onChange={(val) => { setValues((prevState) => { return { ...prevState, email: val.target.value } }) }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={onChange}
                                    error={errorEnable.email}
                                    helperText={errorEnable.email && errorText}
                                    disabled={fieldsDisable}
                                />
                            </Grid>
                            <Grid xs={12} sm={5} item >
                                <div align="left"><InputLabel >Gender</InputLabel></div>
                                <RadioGroup
                                    row
                                    disabled={fieldsDisable}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={values.gender}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, gender: val.target.value } }) }}
                                >
                                    <FormControlLabel disabled={fieldsDisable} value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel disabled={fieldsDisable} value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel disabled={fieldsDisable} value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <div align="left"><InputLabel >Marital Status</InputLabel></div>
                                <RadioGroup
                                    row
                                    disabled={fieldsDisable}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="married"
                                    value={values.married}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, married: val.target.value } }) }}
                                >
                                    <FormControlLabel
                                        value="true"
                                        disabled={fieldsDisable}
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="false"
                                        disabled={fieldsDisable}
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <div align="left"><InputLabel >Any Phiysical Disability</InputLabel></div>
                                <RadioGroup
                                    row
                                    disabled={fieldsDisable}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="disability"
                                    value={values.physic_dis}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, physic_dis: val.target.value } }) }}
                                >
                                    <FormControlLabel value="true" disabled={fieldsDisable} control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" disabled={fieldsDisable} control={<Radio />} label="No" />
                                </RadioGroup>
                            </Grid>

                        </Grid>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Address Details : </Typography>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={3} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="house-No"
                                    label="House/Flat-No."
                                    placeholder='A-101'
                                    fullWidth
                                    value={values.house_no.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.house_no}
                                    helperText={errorEnable.house_no && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="housername"
                                    label="House/Appartment Name"
                                    fullWidth
                                    value={values.house_name.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.house_name}
                                    helperText={errorEnable.house_name && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={5} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="street"
                                    label="Landmark/Area/Street"
                                    fullWidth
                                    value={values.street.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.street}
                                    helperText={errorEnable.street && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="city"
                                    label="City"
                                    fullWidth
                                    value={values.city.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.city}
                                    helperText={errorEnable.city && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="state"
                                    label="State"
                                    fullWidth
                                    value={values.state.toUpperCase()}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.state}
                                    helperText={errorEnable.state && errorText}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="pincode"
                                    label="Pincode"
                                    fullWidth
                                    value={values.pincode}
                                    disabled={fieldsDisable}
                                    onChange={onChange}
                                    error={errorEnable.pincode}
                                    helperText={errorEnable.pincode && errorText}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Other Details : </Typography>
                        <Grid container spacing={2}>
                            {/* <Grid xs={2} item>
                                <Typography>Aadhar Card* :</Typography>
                            </Grid> */}
                            <Grid xs={6} item>
                                <label htmlFor="contained-button-file">
                                    <Input id="contained-button-file" type="file" name="aadharCard"
                                        // disabled={fieldsDisable}
                                        ref={hiddenFileInput}
                                        onChange={onAadharChange}
                                        style={{ display: 'none' }}
                                    />
                                    <Button color="warning" fullWidth variant="contained" disabled={fieldsDisable} component="span" >
                                        Choose Aadhar Card File (PDF 1MB Only)*
                                    </Button>
                                </label>
                                {/* <Input accept="image/*" id="contained-button-file" type="file" /> */}

                            </Grid>
                            <Grid xs={6} item>


                                {aadhar.dispFile}
                                {aadhar.dispFile &&
                                    <IconButton onClick={onCancel} aria-label="upload picture" component="span">
                                        {/* <ThemeProvider theme={theme}> */}
                                        <CancelSharpIcon color="error" fontSize="medium" />
                                        {/* </ThemeProvider> */}
                                    </IconButton>
                                }
                            </Grid>

                            <Grid xs={12} item>
                                <TextField
                                    required
                                    multiline
                                    disabled={fieldsDisable}
                                    maxRows={3}
                                    variant='outlined'
                                    id="about"
                                    label="About you"
                                    fullWidth
                                    inputProps={{
                                        maxLength: 100
                                    }}
                                    placeholder='Please type some information about you OR what you want!'
                                    value={values.about}
                                    onChange={(event) => setValues((prevState) => { return { ...prevState, about: event.target.value } })}
                                />
                            </Grid>
                        </Grid>

                        {/* {xyz === "Client" ? */}

                        {/* : */}


                        {(saveEnable || !editHide) && !fieldsDisable &&
                            <Grid xs={12} sm={12} item>
                            <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                {editHide ? "Save" : !fieldsDisable && "Update"}
                            </Button>
                        </Grid>}
                        {/* }    */}

                    </form>
                    {role === "Helper" && !fieldsDisable &&
                        <Grid xs={12} sm={6} item>
                            <Button variant="contained" color='primary' onClick={addWorkHandler} fullWidth sx={{ marginTop: 2 }}>
                                {editHide ? "Add Work Details" : !fieldsDisable && "Update Work Details"}
                            </Button>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}

                            >
                                {/* <HelperProfile click={handleClose} /> */}
                                <WorkProfile click={handleClose} />

                            </Backdrop>
                        </Grid>}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ClientProfile