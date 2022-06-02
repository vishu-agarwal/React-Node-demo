import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import { Card, Grid, Typography } from '@mui/material';
import Loading from '../layouts/LoadingFile'
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { fetchHelperRequestsThunk } from '../../store/slices/hireRequest-slice';
import { useSelector, useDispatch } from 'react-redux';
import HireRequestCard from './HireRequestCard';
import { hireRequestActions } from '../../store/slices/hireRequest-slice'
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WorkRequest = (props) => {
    const rid = localStorage.getItem("r_id")
    const dispatch = useDispatch()
    let { requestMessage, hireRequestData, requestError, requestLoading } = useSelector((state) => ({ ...state.hireRequestStore }))
    const filterHelper = hireRequestData?.filter((val) => rid.charAt(0) === "H" && val.status === "pending!")
    const filterClient = hireRequestData?.filter((val) => rid.charAt(0) === "C" && val.status !== "hired!")

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
        dispatch(fetchHelperRequestsThunk(rid))
    }, [])
    useEffect(() => {
        if (requestMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(requestMessage)
            dispatch(hireRequestActions.messageReducer())
        }
        if (requestError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(requestError)
            dispatch(hireRequestActions.errorReducer())
        }
    }, [requestMessage, requestError])

    return (
        <Modal
            open={props.open}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <div>
                {requestLoading ? <Loading isLoad={true} /> :
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
                                                    Enquiry
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={2} align="right">
                                                <CloseIcon sx={{ color: "white", fontSize: 30 }} cursor="pointer" onClick={props.click} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center" style={{ maxHeight: '550px', overflow: 'auto' }}>
                                    {
                                        (!requestLoading && rid.charAt(0) === 'C') ? (filterClient.length !== 0 ?
                                            filterClient.map((val, index) => {
                                                return <Grid item xs={12} sm={12} marginBottom={1} align="center" key={index}>
                                                    <HireRequestCard values={val} closeModal={props.click} />
                                                </Grid>
                                            })
                                            :
                                            <Grid item xs={12} sm={12} align="center" padding={0} sx={{ margin: 0 }} >
                                                <img
                                                    src={require("../allImages/nodata.gif")}
                                                    alt="Page No Found..."
                                                    align="center"
                                                />
                                            </Grid>)
                                            : (
                                                (!requestLoading && filterHelper.length !== 0) ?
                                                    filterHelper.map((val, index) => {

                                                        return <Grid item xs={12} sm={12} align="center" key={index}>
                                                            <HireRequestCard values={val} closeModal={props.click} />
                                                        </Grid>
                                                    })
                                                    :
                                                    <Grid item xs={12} sm={12} align="center" padding={0} sx={{ margin: 0 }} >
                                                        <img
                                                            src={require("../allImages/nodata.gif")}
                                                            alt="Page No Found..."
                                                            align="center"
                                                        />
                                                    </Grid>
                                            )
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                }
            </div>
        </Modal>
    );
}

export default WorkRequest