//header file
import React from 'react'

//   mui

// import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
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
import { loginActions } from '../store/login-slice';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

const Login = () => {

    const params = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // dispatch({ type: 'login' });
    const [values, setValues] = useState({
        mobile_no: '',
        password: '',
        role: params.role,
    });


    let { user, error, loading } = useSelector((state) => ({ ...state.loginStore }))
    // const [msg, setmsg] = useState(false);

    useEffect(() => {
        if (params.role != 'Client' && params.role != 'Helper') {
            navigate("/")
        }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(loginActions.errorReducer())
        }

        if (user.length !== 0) {
            console.log(user)
            if (user[0].r_id.charAt(0) === "C")
            {
                localStorage.setItem("role", "Client")
                console.log("client")
            }
            else {
                console.log("Helper")
                localStorage.setItem("role", "Helper")
            }
            console.log("navigate")
            navigate("/clientProfile")
        }
    }, [user, error])


    const [showpswd, setshowpswd] = useState({
        showPassword: false
    })

    // setValues({ ...values, role: params.role })
    const loginSubmitHandler = (event) => {
        event.preventDefault()

        //console.log("value : ",{values})
        dispatch(loginThunk({ values }))
        setValues((prevState) => { return { ...prevState, mobile_no: "", password: "" } })
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
    const backHandler = () => {
        navigate("/", { replace: true })
    }

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
                            <NavLink to="/" style={{ textDecoration: 'none' }}><Button variant="contained" color="error">Back</Button></NavLink>
                        </Grid>

                    </Grid>
                    <Grid xs={1} sm={1} justifyContent="right" item>

                    </Grid>
                    <Grid align="center" sx={{ margin: '15% 25%' }}>
                        <Typography variant="h4" sx={{ color: "#FF6701" }}>
                            Sign In as {values.role}
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
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, mobile_no: val.target.value } }) }}
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
                                <Button type='submit' variant="contained" color="warning" fullWidth sx={{ height: 50, marginTop: 3 }}>
                                    Login
                                </Button>

                            </Grid>

                        </form>
                    </Grid>
                </CardContent>
            </Card>
        </Grid >

    );
}

export default Login
