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


// import DisplayWorkingFields from './DisplayWorkingFields';
import { useState, useEffect } from 'react';
// import workProfileActions from '../../store/slices/work-slice'
import Modal from '@mui/material/Modal';

import { fetchHelperRequestsThunk } from '../../store/slices/hireRequest-slice';
import { fetchAllThunk, fetchSaveUserThunk } from '../../store/slices/display-slice';
import workProfileActions from '../../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HireRequestCard from './HireRequestCard';
import HireRequestSlice from '../../store/slices/hireRequest-slice';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { Box } from "@mui/system";
// import theme from "../Theme";
import CloseIcon from '@mui/icons-material/Close';

const WorkRequest = (props) => {
    // const rid = localStorage.getItem("r_id")
    const rid = "H103"
    const navigate = useNavigate()

    const dispatch = useDispatch()


    let { hireRequestData, message, error } = useSelector((state) => ({ ...state.hireRequestStore }))

    useEffect(() => {

        dispatch(fetchHelperRequestsThunk(rid))

    }, [])

    useEffect(() => {
        // if (message.length !== 0) {
        //     alert(message)

        // }
        if (error.length !== 0) {

            alert(error)
            dispatch(workProfileActions.errorReducer())
        }

    }, [message, error])

    useEffect(() => {
        if (hireRequestData.length !== 0) {
            console.log("hireRequestdata :: ", hireRequestData)

        }

    }, [hireRequestData])

    return (
        // <Backdrop
        //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //     onClick={props.click}
        //     open={true}
        // >
        <Modal
            open={true}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid padding={0} margin={0} >
                <Card
                    sx={{
                        minWidth: 500, minHeight: 450,
                        padding: 0,

                        borderRadius: 3,
                    }}>
                    <CardContent justifyContent="center" style={{ padding: 0 }}>
                        <Grid container direction={'row'} >
                            <Grid item xs={12} sm={12} md={12} backgroundColor="#163758">
                                <Grid container direction={'row'} padding={2} >
                                    <Grid item xs={12} sm={10} align="left" >
                                        <Typography variant="h4" color="white" >
                                            Enquiry
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={2} align="right">
                                        {/* <Button variant="contained" color="error" onClick={props.click}>Close</Button> */}
                                        <CloseIcon sx={{ color: "white", fontSize: 40 }} cursor="pointer" onClick={props.click} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" style={{ maxHeight: '500px', overflow: 'auto' }}>
                            {
                                hireRequestData.length !== 0 ?
                                    hireRequestData.map((val, index) => {
                                        if (rid.charAt(0) === "H" && val.status === "pending!") {

                                            return <Grid item xs={12} sm={12} align="center" key={index}>

                                                <HireRequestCard values={val} />
                                            </Grid>
                                        }
                                        else if (rid.charAt(0) === "C" && val.status !== "hired!") {

                                            return <Grid item xs={12} sm={12} align="center" key={index}>

                                                <HireRequestCard values={val} />
                                            </Grid>
                                        }
                                    }
                                    )
                                    :
                                    <Grid  item xs={12} sm={12} align="center" padding={0} sx={{margin:0}} >

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
        </Modal>
        // </Backdrop >
    );
}

export default WorkRequest