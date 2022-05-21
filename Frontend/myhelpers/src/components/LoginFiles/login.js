//header file
import React from 'react';

//   mui

// import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import abc from '../allImages/client4img.jpg';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from '../../store/slices/login-slice';
import { loginActions } from '../../store/slices/login-slice';
import { otpActions } from '../../store/slices/otp-slice';
import { otpThunk } from '../../store/slices/otp-slice';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../layouts/LoadingFile';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: '',
        role: params.role,
    });
    useEffect(() => {
        console.log("did mount called")
        return () => {
            console.log("component unmount")
        }
    }, [])
    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { snackOpen } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('');
    const [snackColor, setSnackColor] = useState('info');
    const [aa, setAa] = useState('')

    const [otp, setotp] = useState('');

    const { logUser: a1, error, token, loadingLogin } = useSelector((state) => {
        console.log('state :::::::,', JSON.parse(JSON.stringify(state)));
        // if (state.loginStore?.a1?.length > 0)
        // setAa(state.loginStore)
        return { ...state.loginStore }
    });

    console.log('login state===========', a1, error, token, loadingLogin)
    console.log('starte::', aa)


    let { otpUser, otpError, isOtp, otpMessage, loadingOtp } = useSelector(
        (state) => ({ ...state.otpStore })
    );

    // useEffect(() => {
    //     if (values.role !== 'Client' && values.role !== 'Helper') {
    //         navigate("/")
    //     }
    // }, [values])
    useEffect(() => {
        if (otpUser.length !== 0) {
            dispatch(otpActions.isOtpReducer());
        }
    }, [otpUser]);
    useEffect(() => {
        if (error.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage(error);
            dispatch(loginActions.errorReducer());
        }

        if (otpError.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage(otpError);
            dispatch(otpActions.errorReducer());
        }
        if (otpMessage.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor('info');
            setSnackMessage(otpMessage);
            dispatch(otpActions.messageReducer());
        }
    }, [error, otpError, otpMessage]);
    useEffect(() => {
        console.log('set login user ');
        console.log(a1);
        if (a1) {
            if (a1?.r_id?.charAt(0) === 'C') {
                localStorage.setItem('role', 'Client');
                console.log('client');
            } else {
                console.log('Helper');
                localStorage.setItem('role', 'Helper');
            }
            console.log('navigate');
            // dispatch(loginActions.isAuthReducer())
            localStorage.setItem("logToken", token)
            localStorage.setItem("r_id", a1.r_id)
            navigate('/profile');
            // window.location.reload()
        }
    }, [a1]);

    const sendOtpHandler = () => {
        // console.log("values:::",values)
        if (values.email.length !== 0) {
            dispatch(otpThunk(values));
        } else {
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage('Please write valid email');
        }
    };
    // setValues({ ...values, role: params.role })
    const loginSubmitHandler = (event) => {
        event.preventDefault();
        // console.log("otp is :: ",typeof(otpUser),typeof(parseInt(otp)))
        if (values.email.length !== 0) {
            if (otp == parseInt(otpUser)) {
                dispatch(loginThunk(values));
                setValues((prevState) => {
                    return { ...prevState, email: '' };
                });
                setotp('');
            } else {
                setState({ snackOpen: true });
                setSnackColor('error');
                return setSnackMessage('Opps! \n OTP did not match.');
                // return alert("Opps! \n OTP did not match.")
            }
        } else {
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage('Please write valid email');
        }
        //console.log("value : ",{values})
    };
    const [errorText, setErrorText] = useState('');
    const [errorEnable, setErrorEnable] = useState({
        email: false,
    });

    const onChangeEmail = (event) => {
        setValues((prevState) => {
            return { ...prevState, email: event.target.value };
        });
        if (
            /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/.test(
                event.target.value
            )
        ) {
            // console.log("correct!")
            setErrorEnable({ ...errorEnable, email: false });
        } else {
            // console.log("wrong!")
            setErrorEnable({ ...errorEnable, email: true });
            setErrorText('Please enter valid Email address!');
        }
    };
    return (
        <Grid align="center">
            {(loadingOtp || loadingLogin) && <Loading isLoad={true} />}
            <Card
                variant="outlined"
                // elevation={4}
                sx={{
                    maxWidth: 600,
                    minHeight: 350,

                    borderWidth: 3,
                    borderRadius: 6,

                    backgroundImage: `url(${abc})`,
                    backgroundRepeat: 'no-repeat',
                    borderColor: '#163758',
                    backgroundSize: '100%',
                    // marginTop: 15
                }}
            >
                <CardContent>
                    <Grid container direction={'row'} spacing={0}>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={snackOpen}
                            autoHideDuration={2000}
                            onClose={closeSnackbar}
                        // key={vertical + horizontal}
                        >
                            <Alert
                                onClose={closeSnackbar}
                                severity={snackColor}
                                sx={{ width: '100%' }}
                            >
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                        <Grid item xs={6} sm={12} align="left">
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                {/* <Button variant="contained" color="error">Back</Button> */}
                                <ArrowBackIcon
                                    cusror="pointer"
                                    sx={{ color: '#163758' }}
                                    fontSize="large"
                                />
                            </NavLink>
                        </Grid>
                    </Grid>

                    <Grid align="center">
                        <Typography variant="h4" fontWeight="1000" fontSize="30px">
                            {/* <Typography variant="h4" sx={{ color: "#163758" }}> */}
                            Sign In as {values.role}
                            {/* {abc ? nav("/role")    :  console.log(abc)} */}
                        </Typography>
                        <form onSubmit={loginSubmitHandler}>
                            <Grid container>
                                <Grid xs={12} sm={12} item>
                                    <TextField
                                        // sx={{ marginTop: 2 }}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        value={values.email}
                                        onChange={onChangeEmail}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={errorEnable.email}
                                        helperText={errorEnable.email && errorText}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: '#163758' }, //styles the label
                                            '& .MuiOutlinedInput-root': {
                                                '& > fieldset': { borderColor: '#163758' },
                                            },
                                            marginTop: 2,
                                            color: '#163758',
                                        }}
                                    // background= "#007bf717"
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                    {isOtp && (
                                        <TextField
                                            // sx={{ marginTop: 2 }}
                                            required
                                            fullWidth
                                            id="otp"
                                            label="One Time Password (OTP)"
                                            value={otp}
                                            onChange={(val) => {
                                                setotp(val.target.value);
                                            }}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: '#163758' }, //styles the label
                                                '& .MuiOutlinedInput-root': {
                                                    '& > fieldset': { borderColor: '#163758' },
                                                },
                                                marginTop: 2,
                                                color: '#163758',
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Grid>

                            <Grid xs={12} sm={12} item>
                                {!isOtp ? (
                                    <Button
                                        onClick={sendOtpHandler}
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            height: 50,
                                            marginTop: 3,
                                            backgroundColor: '#163758',
                                        }}
                                    >
                                        Send OTP
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            height: 50,
                                            marginTop: 1,
                                            backgroundColor: '#163758',
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                                {isOtp && (
                                    <Button
                                        onClick={sendOtpHandler}
                                        color="primary"
                                        fullWidth
                                        sx={{ marginTop: 1 }}
                                    >
                                        Resend Otp
                                    </Button>
                                )}
                            </Grid>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Login;
