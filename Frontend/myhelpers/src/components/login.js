//header file
import React from 'react'

//   mui

// import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Card,  Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import abc from "./loginImg.jpg";
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from '../store/login-slice'
import { useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

const Login = () => {

    const params = useParams()
    // const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state.loginStore}))
    console.log(user)
    if(user.length !== 0){
    if (user[0].r_id.charAt(0) === "C")
    {
        localStorage.setItem("role", "Client");
        navigate("/clientProfile",{replace:true})
    }
    else
    {
        localStorage.setItem("role", "Helper");
        navigate("/HelperProfile", { replace: true })
    }
    
    }
    
    const dispatch = useDispatch()
    // dispatch({ type: 'login' });
    const [values, setValues] = useState({
        mobile_no: '',
        password: '',
        role: params.role,
    });
    const [showpswd, setshowpswd] = useState({
        showPassword: false
    })

    // setValues({ ...values, role: params.role })
    const loginSubmitHandler = (event) => {
        event.preventDefault()
        console.log("value : ",{values})
        dispatch(loginThunk({values}))
    }
    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    const handleClickShowPassword = () => {
        setshowpswd({ showPassword: !showpswd.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // let abc 
    // const nav = useNavigate()


    return (
        <Grid >
            <Card
                sx={{
                    maxWidth: 650, maxHeight: 440,
                    margin: '0 auto',

                    marginTop: 15,
                    backgroundImage: `url(${abc})`,
                    backgroundRepeat: "no-repeat",

                    backgroundSize: "100%",
                    borderRadius: 10,
                }}
                elevation={4}>

                <CardContent >
                    <Grid container direction={'row'} spacing={0}>

                        <Grid item xs={10} >

                        </Grid>
                        <Grid item xs={2} justifyContent="right" >
                            <NavLink tag={Link} to="/role" style={{ textDecoration: 'none' }}><Button variant="contained" color="error">Back</Button></NavLink>
                        </Grid>

                    </Grid>
                    <Grid xs={1} sm={1} justifyContent="right" >

                    </Grid>
                    <Grid align="center" sx={{ margin: '15% 25%' }}>
                        <Typography variant="h4" sx={{ color: "#FF6701" }}>
                            Sign In as {
                                values.role === "Client" || values.role === "Helper" ?
                                    values.role : alert("route url is incorrect")
                            }
                            {/* {abc ? nav("/role")    :  console.log(abc)} */}
                        </Typography>

                        <form onSubmit={loginSubmitHandler}>

                            <Grid container >

                                <Grid xs={12} sm={12} item>
                                    <TextField

                                        sx={{ marginTop: 2 }}
                                        required
                                        fullWidth

                                        id="mobile_no"
                                        label="Mobile Number"
                                        value={values.mobile_no}
                                        onChange={(val) => { setValues({ ...values, mobile_no: val.target.value }) }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                    <TextField
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                        required
                                        variant='outlined'
                                        label="Password"
                                        id="outlined-adornment-password"
                                        type={showpswd.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={(val) => { setValues({ ...values, password: val.target.value }) }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showpswd.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={12} sm={12} item>
                                <Button type='submit' variant="contained" color="warning" fullWidht sx={{ height: 50, marginTop: 3 }}>
                                    Login
                                </Button>

                            </Grid>

                        </form>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>

    );
}

export default Login
