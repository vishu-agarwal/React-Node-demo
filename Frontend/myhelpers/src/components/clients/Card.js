import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkThunk } from '../../store/slices/work-slice';
import workProfileActions from '../../store/slices/work-slice'

import profileActions from '../../store/slices/profile-slice'
import { createProfileThunk, avatarThunk, aadharThunk, fetchProfileThunk } from '../../store/slices/profile-slice';

const CardJS = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
    let { userProfile } = useSelector((state) => ({ ...state.profileStore }))
    const [values, setValues] = useState({
        name: '',
        porf_mbl: '',
        age: '',
        work: '',
        experience: '',
        time: '',
    });
    const [star, setStar] = useState(0)
    useEffect(() => {
        dispatch(fetchProfileThunk())
    }, [])
    useEffect(() => {
        dispatch(fetchWorkThunk())
    }, [])
    // console.log(workData[0].workDetails)
    useEffect(() => {
        if (message.length !== 0) {
            alert(message)

        }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(workProfileActions.errorReducer())
        }

    }, [message, error])
    useEffect(() => {
        if (workData.length !== 0) {
            let abc
            let list =
                workData[0].workDetails.map((value, index) => {
                    return value.category.split("(")[0] + ", "
                })

            setValues({
                porf_mbl: workData[0].profession_mbl,
                time: workData[0].workTime,
                work: list,
                name: userProfile[0].name,

            })
            console.log(list)

        }
    }, [workData])

    //save icon state
    const [saveIcon, setSaveIcon] = useState(false)
    //save icon click event
    const onSaveClick = () => {
        setSaveIcon(!saveIcon)
    }

    return (
        <>
            <Card sx={{
                maxWidth: "100%", maxHeight: 200,
                marginTop:3,
                borderRadius: 3
            }} elevation={8}>
                <CardContent sx={{ padding: 1 }}>
                    <Grid container direction={'row'} spacing={0} >
                        <Grid item xs={11} sm={11}>

                            <Typography color="green" variant="h6" paddingLeft={3} gutterBottom align="left">
                                {values.name.toUpperCase()}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            <Tooltip title="Save">
                                {saveIcon ?
                                    <BookmarkIcon fontSize="medium" onClick={onSaveClick} />
                                    :
                                    <BookmarkBorderIcon fontSize="medium" onClick={onSaveClick} />
                                }
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} >
                        <Grid item xs={4} sm={5} paddingBottom={2}>
                            <CardMedia
                                component="img"
                                height="90%"
                                sx={{ width: "90%" }}
                                image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                                alt="Paella dish"
                            />

                            <Rating name="size-small" defaultValue={2} size="medium" />
                            {/* {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )} */}


                        </Grid>

                        <Grid item xs={8} sm={7} align="left" >
                            <Typography variant="h5" component="div"></Typography>
                            <Typography gutterBottom sx={{ fontSize: 12 }} >
                                Mobile No :{values.porf_mbl}
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 12 }}  >
                                Age : Age
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 12 }} >
                                {values.work}
                            </Typography>

                            <Typography gutterBottom sx={{ fontSize: 12 }}  >
                                Prefer Time : {values.time}
                            </Typography>
                            <Button sx={{ float: "right", padding: 0, paddingTop: "5%", fontSize: 15 }} >View Details </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CardJS