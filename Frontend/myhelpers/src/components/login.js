//header file
import React from 'react'

//   mui

// import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import abc from "./loginImg.jpg";
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from '../store/slices/login-slice'
import { loginActions } from '../store/slices/login-slice'
import { otpActions } from '../store/slices/otp-slice';
import { otpThunk } from '../store/slices/otp-slice';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Login = () => {

    const params = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // dispatch({ type: 'login' });
    const [values, setValues] = useState({
        mobile_no: '',
        role: params.role,
    });

    const [otp, setotp] = useState('')

    let { user, error, token } = useSelector((state) => ({ ...state.loginStore }))

    let { otpUser, otpError, isOtp } = useSelector((state) => ({ ...state.otpStore }))

    useEffect(() => {
        if (values.role !== 'Client' && values.role !== 'Helper') {
            navigate("/")
        }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(loginActions.errorReducer())
        }
        if (otpError.length !== 0) {
            // console.log(error)
            alert(otpError)
            dispatch(otpActions.errorReducer())
        }
        if (otpUser.length !== 0) {
            dispatch(otpActions.isOtpReducer())
        }
        if (user.length !== 0) {
            console.log(user)
            if (user[0].r_id.charAt(0) === "C") {
                localStorage.setItem("role", "Client")
                // console.log("client")
            }
            else {
                // console.log("Helper")
                localStorage.setItem("role", "Helper")
            }
            // console.log("navigate")
            dispatch(loginActions.isAuthReducer())
            localStorage.setItem("logToken", token)
            localStorage.setItem("r_id",user[0].r_id)
            navigate("/clientProfile")
        }
    }, [user, error, values, dispatch, navigate, otpUser, otpError])

    const sendOtpHandler = (e) => {
        dispatch(otpThunk({ values }))
    }
    // setValues({ ...values, role: params.role })
    const loginSubmitHandler = (event) => {
        event.preventDefault()
        // console.log("otp is :: ",typeof(otpUser),typeof(parseInt(otp)))
        if (otp == parseInt(otpUser)) {
            dispatch(loginThunk({ values }))
            setValues((prevState) => { return { ...prevState, mobile_no: "" } })
            setotp("")
        }
        else {
            return alert("Opps! \n OTP did not match.")
        }
        //console.log("value : ",{values})
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
                                    {isOtp &&
                                        <TextField
                                            sx={{ marginTop: 2 }}
                                            required
                                            fullWidth
                                            id="otp"
                                            label="One Time Password (OTP)"
                                            value={otp}
                                            onChange={(val) => { setotp(val.target.value) }}
                                        />
                                    }
                                </Grid>
                            </Grid>


                            <Grid xs={12} sm={12} item>
                                {!isOtp ?
                                    <Button onClick={sendOtpHandler} variant="contained" color="primary" fullWidth sx={{ height: 50, marginTop: 3 }}>
                                        Send OTP
                                    </Button>
                                    :
                                    <Button type='submit' variant="contained" color="warning" fullWidth sx={{ height: 50, marginTop: 1 }}>
                                        Login
                                    </Button>
                                }
                                {isOtp &&
                                    <Button onClick={sendOtpHandler} color="primary" fullWidth sx={{ marginTop: 0 }}>
                                        Resend Otp
                                    </Button>
                                }
                            </Grid>

                        </form>
                    </Grid>
                </CardContent>
            </Card>
        </Grid >

    );
}

export default Login
