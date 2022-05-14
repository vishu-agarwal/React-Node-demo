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


import { fetchHelperRequestsThunk } from '../store/slices/hireRequest-slice';
import { fetchAllThunk, fetchSaveUserThunk } from '../store/slices/display-slice';
import workProfileActions from '../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HireRequestCard from './clients/HireRequestCard';
import HireRequestSlice from '../store/slices/hireRequest-slice';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';


const WorkRequest = (props) => {
    // const rid = localStorage.getItem("r_id")
    const rid="C101"
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
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <Grid >
                <Card
                    sx={{
                        maxWidth: 700, maxHeight: 1000,
                        margin: '0 auto',
                        paddingTop: 0,
                        borderRadius: 5,
                    }}>
                    <CardContent >
                        <Grid container direction={'row'} spacing={0}>
                            <Grid item xs={12} sm={8} align="left" >
                                <Typography variant="h4" color="black" >
                                    Hire Enquiry
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button variant="contained" color="error" onClick={() => navigate(-1)}>Close</Button>
                            </Grid>

                        </Grid>
                        <Grid container style={{ maxHeight: '515px', overflow: 'auto' }}>
                            {
                                hireRequestData.length !== 0 ?
                                    hireRequestData.map((val, index) => {
                                        if (val.user_id.charAt(0)==="C" && val.status === "pending!") {

                                            return <Grid item xs={12} sm={12} align="center" key={index}>

                                                <HireRequestCard values={val} />
                                            </Grid>
                                        }
                                        else if (val.user_id.charAt(0) === "H" && val.status !== "hired!") {

                                            return <Grid item xs={12} sm={12} align="center" key={index}>

                                                <HireRequestCard values={val} />
                                            </Grid>
                                        }
                                    }
                                    )
                                    :
                                    <Grid marginBottom={1} item xs={12} sm={12} align="center" >
                                        <Typography variant="h4" color="red" component="div">
                                            Opps! No Single user is requested
                                        </Typography>
                                    </Grid>
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Backdrop >
    );
}

export default WorkRequest