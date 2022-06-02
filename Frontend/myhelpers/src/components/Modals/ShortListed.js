//header file
import * as React from 'react';

//   mui
import CardContent from '@mui/material/CardContent';

import { Card, Grid, Typography } from '@mui/material';

import Loading from '../layouts/LoadingFile'
import { useState, useEffect } from 'react';

import { displayActions, fetchAllThunk, fetchSaveUserThunk } from '../../store/slices/display-slice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardJS from '../Card';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ShortListed = (props) => {
    const rid = localStorage.getItem("r_id")
    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
    let { displayData, saveUser, hireUser, displayMessage, displayError, displayLoading } = useSelector((state) => ({ ...state.displayStore }))

    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { snackOpen } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")

    useEffect(() => {
        dispatch(fetchAllThunk())
        dispatch(fetchSaveUserThunk(rid))
    }, [])

    useEffect(() => {
        if (displayMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(displayMessage)
            dispatch(displayActions.messageReducer())

        }
        if (displayError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(displayError)
            dispatch(displayActions.errorReducer())
        }

    }, [displayMessage, displayError])

    let rates, hireStatus
    return (
        <Modal
            open={props.open}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}
        >
            <div>
            {displayLoading ? <Loading isLoad={true} /> :
                <Grid padding={0} margin={0} >
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
                                    autoHideDuration={4000}
                                    onClose={closeSnackbar}
                                >
                                    <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                                        {snackMessage}
                                    </Alert>
                                </Snackbar>
                                <Grid item xs={12} sm={12} md={12} backgroundColor="#163758">
                                    <Grid container direction={'row'} padding={2} >
                                        <Grid item xs={12} sm={10} align="left" >
                                            <Typography fontSize={25} color="white" >
                                                Sortlist
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={2} align="right">
                                            {/* <Button variant="contained" color="error" onClick={props.click}>Close</Button> */}
                                            <CloseIcon sx={{ color: "white", fontSize: 30 }} cursor="pointer" onClick={props.click} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container marginTop={0} marginBottom={0} style={{ height: '550px', overflow: 'auto' }}>
                                    {                                        
                                    saveUser.length && displayData.length ?
                                        saveUser.map((val, index) =>
                                            displayData.map((values, index) => {
                                                if (val.user_id === values.r_id) {

                                                    rates = values.rating[0] !== undefined ?
                                                        values.rating[0].map((id) =>
                                                            id.rate
                                                        ).reduce((prev, curr) => prev + curr, 0)
                                                        /
                                                        values.rating[0].map((id) =>
                                                            id.user_id
                                                        ).length
                                                        : null

                                                    hireStatus = hireUser.lenght !== 0 ? hireUser.filter(val => values.r_id === val.user_id).map((val) => val.status) : ''

                                                    return <Grid marginBottom={1} item xs={12} sm={12} align="center" key={index}>
                                                        <CardJS values={values} rates={rates} saveStatus={true} hireStatus={hireStatus} closeModal={props.click} isModal={true} />
                                                    </Grid>
                                                }
                                            })
                                        )
                                        :
                                        <Grid item xs={12} sm={12} align="center" padding={0} sx={{ margin: 0 }}>
                                            <img
                                                src={require("../allImages/nodata.gif")}
                                                alt="Page No Found..."
                                                align="center"
                                            />
                                        </Grid>
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                    </Grid>}
            </div>
        </Modal >
    );
}

export default ShortListed