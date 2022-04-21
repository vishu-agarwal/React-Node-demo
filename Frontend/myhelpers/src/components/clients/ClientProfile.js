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
import HelperProfile from '../helpers/HelperProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import profileImg from '../profiile1.jpg';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createProfileThunk } from '../../store/slices/profile-slice';
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
    // let { otpUser, otpError, isOtp } = useSelector((state) => ({ ...state.otpStore }))
    // const classes = useStyles();
    const xyz = localStorage.getItem('role')
    // console.log(xyz)

    const [values, setValues] = useState({
        fname: '',
        lname: '',
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

    //helper profile Modal state
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = open ? 'hidden' : 'auto';
    }, [open])

    const addWorkHandler = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    // const validate = () => {
    //     let temp = {}
    //     temp.firstname = values.firstname ? "" : "This field is required"
    //     temp.lastname = values.lastname ? "" : "This field is required"
    //     temp.email = (/$|.+@.+..+/).test(values.email) ? "" : "Email is invalid"
    //     temp.mobile = values.mobile.length = 10 ? "" : "Should be 10 digits without 0(Zero)"
    // }

    // const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    const [file, setfile] = useState({
        upldfile: [],
        dispFile: ''
    })

    const [aadhar, setaadhar] = useState({
        upldfile: [],
        dispFile: ''
    })

    const profileSaveHandler = (e) => {
        e.preventDefault()
        console.log(values)
        dispatch(createProfileThunk({values}))
    }
    const avatarFileType = ["image/png", "image/jpeg"]
    // const avatarFileSize = 
    const onAvatarChang = (e) => {
        // console.log("onchange")
        console.log(e.target.files[0])
        let avatarFile = e.target.files[0]
        if (avatarFile && avatarFileType.includes(avatarFile.type)) {
            // size in bytes
            if (avatarFile.size <= 512000) {
                setfile({
                    ...file,
                    upldfile: avatarFile,
                    dispFile: URL.createObjectURL(avatarFile)
                })
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
        console.log("form submit")
        if (file.dispFile) {
            const formdata = new FormData()

            formdata.append('avatar', file.upldfile)
            // console.log(formdata)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            console.log("config :: ", config)
            axios.post(`/myhelper/upldAvatar/C105`, formdata, config).then((res) => {
                console.log("response :: ", res)
                if (res) {
                    alert("uploaded !")
                }
            })
                .catch((error) => {
                    // console.log(error.response.data)
                    alert(error.response.data)
                })
            // console.log("values:: ", values)
        }
        else {
            alert("please upload profile picture !")
        }
    }
    const aadharFileType = ['application/pdf']
    const onAadharChange = (val) => {
        let aadharFile = val.target.files[0]
        console.log(aadharFile)
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


    return (
        <Grid>
            <Card
                elevation={8}
                sx={{
                    maxWidth: 800, maxHeight: 5000,
                    margin: '0 auto',
                    paddingTop: 1,
                    marginTop: 15
                }}>
                <CardContent>
                    <Typography variant="h4"  >Profile</Typography>
                    <Typography variant="h5"  >Registered no</Typography>
                    <form onSubmit={profileSaveHandler}>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    badgeContent={
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" name="avatar" required onChange={onAvatarChang} />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                {/* <ThemeProvider theme={theme}> */}
                                                <EditRoundedIcon color="error" fontSize="large" />
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
                        <Button variant="contained" sx={{ marginTop: 1 }} color="error" onClick={avatarSubmit}>Upload Photo </Button>

                        <Typography color='orange' variant='body1' component='p' marginTop={1}>Please fill up this form is necessary to move forward !</Typography>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Personal Details : </Typography>

                        <Grid container spacing={1}>

                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="firstname"
                                    label="First Name"
                                    fullWidth
                                    value={values.fname}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, fname: val.target.value } }) }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField

                                    required
                                    variant='outlined'
                                    id="lastname"
                                    label="Last Name"
                                    fullWidth
                                    value={values.lname}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, lname: val.target.value } }) }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    id="date"
                                    label="Date Of Birthday"
                                    type="date"
                                    required
                                    fullWidth
                                    value={values.dob}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, dob: val.target.value } }) }}
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
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, altmbl: val.target.value } }) }}
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
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, email: val.target.value } }) }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={5} item >
                                <div align="left"><InputLabel >Gender</InputLabel></div>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={values.gender}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, gender: val.target.value } }) }}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <div align="left"><InputLabel >Marital Status</InputLabel></div>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="married"
                                    value={values.married}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, married: val.target.value } }) }}
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <div align="left"><InputLabel >Any Phiysical Disability</InputLabel></div>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="disability"
                                    value={values.physic_dis}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, physic_dis: val.target.value } }) }}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </Grid>

                        </Grid>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Address Details : </Typography>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={3} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="house-No. "
                                    label="House/Flat-No."
                                    placeholder='A-101'
                                    fullWidth
                                    value={values.house_no}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, house_no: val.target.value } }) }}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="housername"
                                    label="House/Appartment Name"
                                    fullWidth
                                    value={values.house_name}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, house_name: val.target.value } }) }}
                                />
                            </Grid>
                            <Grid xs={12} sm={5} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="street"
                                    label="Landmark/Area/Street"
                                    fullWidth
                                    value={values.street}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, street: val.target.value } }) }}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="city"
                                    label="City"
                                    fullWidth
                                    value={values.city}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, city: val.target.value } }) }}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="state"
                                    label="State"
                                    fullWidth
                                    value={values.state}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, state: val.target.value } }) }}
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
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, pincode: val.target.value } }) }}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Other Details : </Typography>
                        <Grid container spacing={1}>
                            {/* <Grid xs={2} item>
                                <Typography>Aadhar Card* :</Typography>
                            </Grid> */}
                            <Grid xs={6} item>
                                <label htmlFor="contained-button-file">
                                    <Input id="contained-button-file" type="file" name="aadharCard"
                                        onChange={onAadharChange}
                                    />
                                    <Button color="warning" fullWidth variant="contained" component="span">
                                        Choose Aadhar Card File (PDF Only)*
                                    </Button>
                                </label>
                                {/* <Input accept="image/*" id="contained-button-file" type="file" /> */}

                            </Grid>
                            <Grid xs={6} item>


                                {aadhar.dispFile}

                            </Grid>

                            <Grid xs={12} item>
                                <TextField
                                    required
                                    multiline
                                    rows={3}
                                    variant='outlined'
                                    id="about"
                                    label="About you"
                                    fullWidth
                                    placeholder='Please type some information about you !'
                                    value={values.about}
                                    onChange={(val) => { setValues((prevState) => { return { ...prevState, about: val.target.value } }) }}
                                />
                            </Grid>
                        </Grid>

                        {/* {xyz === "Client" ? */}

                        {/* : */}

                        <Grid xs={12} sm={12} item>
                            <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                Save
                            </Button>
                        </Grid>
                        {/* }    */}

                    </form>
                    <Grid xs={12} sm={6} item>
                        <Button variant="contained" color='primary' onClick={addWorkHandler} fullWidth sx={{ marginTop: 2 }}>
                            Add Work Detail
                        </Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}

                        >
                            <HelperProfile click={handleClose} />
                        </Backdrop>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ClientProfile