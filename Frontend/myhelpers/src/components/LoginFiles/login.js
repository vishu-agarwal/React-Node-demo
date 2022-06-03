import React from 'react';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
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
import debounce from 'lodash.debounce';

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

    const [otp, setotp] = useState('');

    const { logUser, error,  loadingLogin } = useSelector((state) => {
        return { ...state.loginStore }
    });

    let { otpUser, otpError, isOtp, otpMessage, loadingOtp } = useSelector(
        (state) => ({ ...state.otpStore })
    );

    useEffect(() => {
        if (otpUser.length !== 0) {
            dispatch(otpActions.isOtpReducer(true));
            setCounter(59)
            const debouncedSave = debounce(() => {
                dispatch(otpActions.countCompleteReducer())
                setotp("")
                setState({ snackOpen: true });
                setSnackColor('info');
                setSnackMessage("Otp is expired!\nResend it!");
            }, 60000);
            debouncedSave();
        }
    }, [otpUser]);

    useEffect(() => {
        if (error.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage(error);
            dispatch(loginActions.errorReducer());
        }
        if (otpError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage(otpError);
            dispatch(otpActions.errorReducer());
        }
        if (otpMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor('info');
            setSnackMessage(otpMessage);
            dispatch(otpActions.messageReducer());
        }
    }, [error, otpError, otpMessage]);

    useEffect(() => {
        let redirectPath = ''
        if (logUser.length !== 0) {
            if (logUser?.r_id?.charAt(0) === 'C') {
                redirectPath = '/Client/home'
            } else {
                redirectPath = '/Helper/home'
            }
            !logUser.is_profile ? navigate(`/profile`, { replace: true }) : navigate(`${redirectPath}`, { replace: true })
        }
    }, [logUser]);

    const sendOtpHandler = () => {
        if (values.email.length !== 0) {
            dispatch(otpActions.isOtpReducer(false));
            dispatch(otpThunk(values));
        } else {
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage('Please write valid email');
        }
    };

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        if (values.email.length !== 0) {
            // not use 3 equals beacuse if parseInt
            if (otp == parseInt(otpUser)) {
                setCounter(0)
                dispatch(loginThunk(values));
                dispatch(otpActions.isOtpReducer(false));
                dispatch(otpActions.countCompleteReducer());
            } else {
                setState({ snackOpen: true });
                setSnackColor('error');
                return setSnackMessage('Opps! OTP did not match.');
            }
        } else {
            setState({ snackOpen: true });
            setSnackColor('error');
            setSnackMessage('Please write valid email');
        }
    };
    const [errorText, setErrorText] = useState('');
    const [errorEnable, setErrorEnable] = useState({
        email: false,
        otp:false
    });

    const onChangeText = (event) => {
        if (event.target.name === "email") {
            setValues((prevState) => {
                return { ...prevState, email: event.target.value.toLowerCase() };
            });
            if (
                /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/.test(
                    event.target.value
                )
            ) {
                setErrorText("")
                setErrorEnable({ ...errorEnable, email: false });
            } else {
                setErrorEnable({ ...errorEnable, email: true });
                setErrorText('Please enter valid Email address!');
            }
        }
        else if (event.target.name === "otp") {
            setotp(event.target.value);
            if (/^[0-9]{6}$/.test(event.target.value)
            ) {
                setErrorText("")
                setErrorEnable({ ...errorEnable, otp: false });
            } else {
                setErrorEnable({ ...errorEnable, otp: true });
                setErrorText('Only numbers are allowed!');
            }
        }
    };

    // Timer 
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <Grid align="center">
            {(loadingOtp || loadingLogin) && <Loading isLoad={true} />}
            <Card
                elevation={16}
                sx={{
                    minWidth:
                    {
                        xs: 1.0,
                        sm: 600,
                        md: 600
                    }, minHeight: 350,
                    borderWidth: 3,
                    borderRadius: 6,
                    backgroundImage: `url(${abc})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                }}
            >
                <CardContent>
                    <Grid container direction={'row'} spacing={0}>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={snackOpen}
                            autoHideDuration={3000}
                            onClose={closeSnackbar}
                        >
                            <Alert
                                onClose={closeSnackbar}
                                severity={snackColor}
                                sx={{ width: '100%' }}
                            >
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                        <Grid item xs={8} sm={8} align="left">
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <ArrowBackIcon
                                    cusror="pointer"
                                    sx={{ color: '#163758' }}
                                    fontSize="large"
                                />
                            </NavLink>
                        </Grid>
                        {isOtp && <Grid item xs={4} sm={4} align="left">
                            <Typography align="center" color='textSecondary'>
                                Resend OTP in
                                <span style={{ color: "#163758", fontWeight: "bold", fontSize: "20px" }}> 00:{counter}</span>
                            </Typography>
                        </Grid>}
                    </Grid>
                    <Grid align="center">
                        <Typography fontSize="30px">
                            Sign In as {values.role}
                        </Typography>
                        <form onSubmit={loginSubmitHandler}>
                            <Grid container>
                                <Grid xs={12} sm={12} item>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        value={values.email.toLowerCase()}
                                        onChange={onChangeText}
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
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                    {isOtp && (
                                        <TextField
                                            required
                                            fullWidth
                                            id="otp"
                                            name="otp"
                                            label="One Time Password (OTP)"
                                            value={otp}
                                            onChange={onChangeText}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: '#163758' }, //styles the label
                                                '& .MuiOutlinedInput-root': {
                                                    '& > fieldset': { borderColor: '#163758' },
                                                },
                                                marginTop: 2,
                                                color: '#163758',
                                            }}
                                            inputProps={{
                                                maxLength: 6
                                            }}
                                            error={errorEnable.otp}
                                            helperText={errorEnable.otp && errorText}
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
                                {counter === 0 && isOtp && (
                                    <Button
                                        onClick={sendOtpHandler}
                                        fullWidth
                                        sx={{ marginTop: 1, color: "#163758", fontWeight: "bold" }}
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
