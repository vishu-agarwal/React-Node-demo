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
import WorkProfile from '../helpers/WorkProfile';
import { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
import profileImg from '../profiile1.jpg';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import profileActions from '../../store/slices/profile-slice'
import { createProfileThunk, avatarThunk, aadharThunk, fetchProfileThunk } from '../../store/slices/profile-slice';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

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
    // const fetchData = useCallback(() => {
    //     setValues({
    //         fname: userProfile[0].name.split(" ")[0],
    //         lname: userProfile[0].name.split(" ")[1],
    //         dob: userProfile[0].dob,
    //         altmbl: userProfile[0].alt_mob_num,
    //         email: userProfile[0].email,
    //         gender: userProfile[0].gender,
    //         married: userProfile[0].isMarried,
    //         physic_dis: userProfile[0].physical_disable,
    //         house_no: userProfile[0].address[0].houseNo,
    //         house_name: userProfile[0].address[0].house_name,
    //         street: userProfile[0].address[0].landmark,
    //         city: userProfile[0].address[0].city,
    //         state: userProfile[0].address[0].state,
    //         pincode: userProfile[0].address[0].pincode,
    //         about: userProfile[0].about,
    //     })

    // }, [userProfile])
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

    const str2blob = txt => new Blob([txt]);
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
                dispFile: URL.createObjectURL(str2blob(userProfile[0].avatar)),
                
            })
        }
    }, [userProfile])

   
    console.log(values,file.dispFile)
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
    

    const profileSaveHandler = (e) => {
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
                dispatch(aadharThunk(formdata, config))
                dispatch(createProfileThunk({ values }))
                // setClicked(true)
                // console.log("values:: ", values)
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

    const avatarFileType = ["image/png", "image/jpeg"]
    // const avatarFileSize = 
    const onAvatarChang = (e) => {

        // console.log("onchange")
        let avatarFile = e.target.files[0]
        console.log(URL.createObjectURL(avatarFile))
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

            dispatch(avatarThunk(formdata, config))
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
        console.log("aadharFile:: ", aadharFile)
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
        console.log("setaadhar")
        // window.location.reload()
        setaadhar({
            upldfile: [],
            dispFile: ''
        })
    }
    const hiddenFileInput = React.useRef(null);

    // const handleClick = event => {
    //     hiddenFileInput.current.click();
    // };


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
                        {enable && <Button variant="contained" sx={{ marginTop: 1 }} color="warning" onClick={avatarSubmit}>Upload Photo </Button>}

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
                                    <Input id="contained-button-file" type="file" required name="aadharCard"
                                        ref={hiddenFileInput}
                                        onChange={onAadharChange}
                                        style={{ display: 'none' }}
                                    />
                                    <Button color="warning" fullWidth variant="contained" component="span" >
                                        Choose Aadhar Card File (PDF Only)*
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
                    {role === "Helper" &&
                        <Grid xs={12} sm={6} item>
                            <Button variant="contained" color='primary' onClick={addWorkHandler} fullWidth sx={{ marginTop: 2 }}>
                                Add Work Details
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