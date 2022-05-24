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
import Modal from '@mui/material/Modal';

// import DisplayWorkingFields from './DisplayWorkingFields';
import { useState, useEffect } from 'react';
// import workProfileActions from '../../store/slices/work-slice'

import CloseIcon from '@mui/icons-material/Close';
import { fetchHelperRequestsThunk } from '../../store/slices/hireRequest-slice';
import Loading from '../layouts/LoadingFile'

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HireRequestCard from './HireRequestCard';
import HireRequestSlice from '../../store/slices/hireRequest-slice';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import {hireRequestActions} from '../../store/slices/hireRequest-slice'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HiredHelper = (props) => {
    const rid = localStorage.getItem("r_id")
    // const classes = useStyles();
    const navigate = useNavigate()
    const role = localStorage.getItem("role")
    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))

    let { hireRequestData, requestMessage, requestError, requestLoading } = useSelector((state) => ({ ...state.hireRequestStore }))


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

    useEffect(() => {


        if (requestMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(requestMessage)
            dispatch(hireRequestActions.messageReducer())

        }
        if (requestError.length !== 0) {
            // console.log(error)
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(requestError)
            dispatch(hireRequestActions.errorReducer())
        }

    }, [requestMessage, requestError])
    // const [values,message, setValues] = useState({
    //     name: '',
    //     porf_mbl: '',
    //     age: '',
    //     work: '',
    //     experience: '',
    //     time: '',
    // });
    useEffect(() => {
        dispatch(fetchHelperRequestsThunk(rid))
    }, [])

    useEffect(() => {
        if (hireRequestData.length !== 0) {
            console.log("hireRequestdata :: ", hireRequestData)
        }

    }, [hireRequestData])

    return (
        <Modal
            open={true}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid padding={0} margin={0} >
                {requestLoading && <Loading isLoad={true} />}
                <Card
                    sx={{
                        minWidth: 500, minHeight: 650,
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
                                            Hired
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={2} align="right">
                                        {/* <Button variant="contained" color="error" onClick={props.click}>Close</Button> */}
                                        <CloseIcon sx={{ color: "white", fontSize: 40 }} cursor="pointer" onClick={props.click} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container style={{ maxHeight: '550px', overflow: 'auto' }}>
                            {
                                hireRequestData.length !== 0 ?
                                    hireRequestData.map((val, index) => {
                                        if (val.status === "hired!") {

                                            return <Grid item xs={12} sm={12} align="center" key={index}>

                                                <HireRequestCard values={val} />
                                            </Grid>
                                        }
                                    }
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
export default HiredHelper