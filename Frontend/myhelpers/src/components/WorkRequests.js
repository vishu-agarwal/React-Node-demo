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

// import { workProfileThunk, fetchWorkThunk, updateWorkThunk } from '../../store/slices/work-slice';
import { fetchAllThunk, fetchSaveUserThunk } from '../store/slices/display-slice';
import workProfileActions from '../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardJS from './clients/Card';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';


const WorkRequest = (props) => {
    const rid = localStorage.getItem("r_id")
    // const classes = useStyles();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
    let { displayData, saveUser, message, error } = useSelector((state) => ({ ...state.displayStore }))

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
        dispatch(fetchSaveUserThunk())
    }, [])

    // console.log(workData[0].workDetails)
    useEffect(() => {
        // if (message.length !== 0) {
        //     alert(message)

        // }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(workProfileActions.errorReducer())
        }

    }, [message, error])
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

    let rates, status
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <Grid >
                <Card
                    sx={{

                        maxWidth: 500, maxHeight: 1000,
                        margin: '0 auto',
                        paddingTop: 0,
                        borderRadius: 5,
                    }}>
                    <CardContent >

                        <Grid container direction={'row'} spacing={0}>
                            <Grid item xs={12} sm={10} align="left" >
                                <Typography variant="h3" color="black" component="div">
                                    SORTLIST
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button variant="contained" color="error" onClick={() => navigate(-1)}>Close</Button>
                            </Grid>

                        </Grid>
                        <Grid container marginTop={0} marginBottom={0} style={{ maxHeight: '510px', overflow: 'auto' }}>
                            {
                                // status = { saveUser.length !== 0 ? console.log(saveUser.user_id) ? true : false : false },
                                saveUser.length !== 0 && displayData.length !== 0 ?
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


                                                return <Grid marginBottom={1} item xs={12} sm={12} align="center" key={index}>

                                                    <CardJS values={values} rates={rates} status={true} />
                                                </Grid>
                                            }
                                        })

                                    )
                                    :
                                    <Grid marginBottom={1} item xs={12} sm={12} align="center" >


                                        <Typography variant="h4" color="red" component="div">
                                            Opps! No Single user is sortlisted
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