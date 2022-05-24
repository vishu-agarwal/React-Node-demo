//header file
import * as React from 'react';

//   mui
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { Backdrop, Card, Grid, InputLabel, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import ListItemText from '@mui/material/ListItemText';

import Loading from '../layouts/LoadingFile'
// import DisplayWorkingFields from './DisplayWorkingFields';
import { useState, useEffect } from 'react';
// import workProfileActions from '../../store/slices/work-slice'

// import { workProfileThunk, fetchWorkThunk, updateWorkThunk } from '../../store/slices/work-slice';
import { displayActions, fetchAllThunk, fetchSaveUserThunk } from '../../store/slices/display-slice';
import {workProfileActions} from '../../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardJS from '../Card';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ShortListed = (props) => {
    const rid = localStorage.getItem("r_id")
    // const classes = useStyles();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
    let { displayData, saveUser, hireUser, displayMessage,displayError,displayLoading } = useSelector((state) => ({ ...state.displayStore }))


    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, snackOpen } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")

    // const [values,message, setValues] = useState({
    //     name: '',
    //     porf_mbl: '',
    //     age: '',
    //     work: '',
    //     experience: '',
    //     time: '',
    // });
    useEffect(() => {
        dispatch(fetchAllThunk())
        dispatch(fetchSaveUserThunk(rid))
    }, [])

    // console.log(workData[0].workDetails)
    useEffect(() => {
        if (displayMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(displayMessage)

            dispatch(displayActions.messageReducer())

        }
        if (displayError.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(displayError)

            dispatch(displayActions.errorReducer())
        }

    }, [displayMessage, displayError])
    useEffect(() => {
        if (displayData.length !== 0) {
            console.log("displayData :: ", displayData)

        }

    }, [displayData])
    useEffect(() => {

        if (saveUser.length !== 0) {
            console.log("saveUser ::", saveUser);
            // saveUser.map((val)=> values.r_id === val.user_id)
            // console.log("saveUser ::", saveUser.length !== 0 ? saveUser.map((val)=>console.log("H110"===val.user_id)):null);
        }
    }, [saveUser])


    // useEffect(() => {


    //     if (message.length !== 0) {
    //         alert(message)

    //     }
    //     // if (error.length !== 0) {
    //     //     // console.log(error)
    //     //     alert(error)
    //     //     dispatch(workProfileActions.errorReducer())
    //     // }

    // }, [message, error])

    let rates, hireStatus
    return (
        <Modal
            open={true}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid padding={0} margin={0} >
                {displayLoading && <Loading isLoad={true} />}
                <Card
                    sx={{
                        width: 500, height: 650,
                        padding: 0,

                        borderRadius: 3,
                    }}>
                    <CardContent style={{ padding: 0 }}>
                        <Grid container direction={'row'} >
                            <Snackbar
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                open={snackOpen}
                                autoHideDuration={6000}
                                onClose={closeSnackbar}
                            // key={vertical + horizontal}
                            >
                                <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                                    {snackMessage}
                                </Alert>
                            </Snackbar>
                            <Grid item xs={12} sm={12} md={12} backgroundColor="#163758">
                                <Grid container direction={'row'} padding={2} >
                                    <Grid item xs={12} sm={10} align="left" >
                                        <Typography variant="h4" color="white" >
                                            Sortlist
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={2} align="right">
                                        {/* <Button variant="contained" color="error" onClick={props.click}>Close</Button> */}
                                        <CloseIcon sx={{ color: "white", fontSize: 40 }} cursor="pointer" onClick={props.click} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container marginTop={0} marginBottom={0} style={{ height: '550px', overflow: 'auto' }}>
                            {
                                // status = { saveUser.length !== 0 ? console.log(saveUser.user_id) ? true : false : false },
                                saveUser.length && displayData.length ?
                                    saveUser.map((val, index) =>
                                        displayData.map((values, index) => {
                                            if (val.user_id === values.r_id) {
                                                {
                                                    rates = values.rating[0] !== undefined ?
                                                        values.rating[0].map((id) =>
                                                            id.rate
                                                        ).reduce((prev, curr) => prev + curr, 0)
                                                        /
                                                        values.rating[0].map((id) =>
                                                            id.user_id
                                                        ).length
                                                        : null
                                                }

                                                hireStatus = hireUser.lenght !== 0 ? hireUser.filter(val => values.r_id === val.user_id).map((val) => val.status) : ''
                                                return <Grid marginBottom={1} item xs={12} sm={12} align="center" key={index}>

                                                    <CardJS values={values} rates={rates} saveStatus={true} hireStatus={hireStatus} />
                                                </Grid>
                                            }
                                        })

                                    )
                                    :


                                    <Grid  item xs={12} sm={12} align="center" padding={0} sx={{ margin: 0 }}>
                                        <img
                                            src={require("../allImages/notfound.gif")}
                                            alt="Page No Found..."

                                            align="center"
                                        />
                                    </Grid>

                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Modal >
    );
}

export default ShortListed