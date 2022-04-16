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
import { Backdrop, Card, Container, Grid, InputLabel, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PhotoCameraSharpIcon from '@mui/icons-material/PhotoCameraSharp';
import HelperProfile from '../helpers/HelperProfile';
import { useEffect } from 'react';

const Input = styled('input')({
    display: 'none',
});

const ClientProfile = () => {
    // const classes = useStyles();
    const xyz = localStorage.getItem('role')
    console.log(xyz)
    const validate = () => {
        let temp = {}
        temp.firstname = values.firstname ? "" : "This field is required"
        temp.lastname = values.lastname ? "" : "This field is required"
        temp.email = (/$|.+@.+..+/).test(values.email) ? "" : "Email is invalid"
        temp.mobile = values.mobile.length = 10 ? "" : "Should be 10 digits without 0(Zero)"
    }

    const [values, setValues] = React.useState({
        mobile_no: '',
        password: '',
        showPassword: false,
    });

    const [open, setOpen] = React.useState(false);
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
                    <Typography variant="h4" component='div' fontSize='30px'>Your Profile</Typography>
                    <form>
                        <Grid container spacing={1}>

                            <Grid xs={12} item>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" required />
                                            <IconButton sx={{ color: "black" }} aria-label="upload picture" component="span">
                                                <PhotoCameraSharpIcon sx={{ width: 50, height: 50 }} />
                                            </IconButton>
                                        </label>
                                    }
                                >
                                    {/* /static/images/avatar/2.jpg */}
                                    <Avatar alt="Profile " src="" sx={{ color: 'black', borderColor: "black", width: 130, height: 130 }} >Photo</Avatar>
                                </Badge>
                            </Grid>
                        </Grid>
                        <Typography color='orange' variant='body1' component='p' marginTop={2}>Please fill up this form is necessary to move forward !</Typography>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Personal Details : </Typography>
                        <Grid container spacing={1}>

                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="firstname"
                                    label="First Name"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField

                                    required
                                    variant='outlined'
                                    id="lastname"
                                    label="Last Name"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="dob"
                                    label="Birthday"
                                    fullWidth
                                />
                            </Grid>

                            <Grid xs={12} sm={6} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="alt-mob"
                                    label="Alternate Mobile Number"
                                    fullWidth

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
                                    name="row-radio-buttons-group"
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
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <div align="left"><InputLabel >Any Phiysical Disability</InputLabel></div>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
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
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="housername"
                                    label="House/Appartment Name"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={5} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="landmark"
                                    label="Landmark/Area/Street"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="state"
                                    label="State"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="city"
                                    label="City"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                <TextField
                                    required
                                    variant='outlined'
                                    id="pincode"
                                    label="Pincode"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Typography variant='subtitle1' marginLeft={1.5} align='left' color='InfoText'>Other Details : </Typography>
                        <Grid container spacing={1}>
                            <Grid xs={2} item>
                                <Typography>Aadhar Card :</Typography>
                            </Grid>
                            <Grid xs={4} item>
                                <Input accept="image/*" id="contained-button-file" required type="file" />

                                <Button fullWidth variant="contained" component="span">
                                    Upload
                                </Button>
                            </Grid>
                            <Grid xs={6} item>
                                name of file
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