import * as React from 'react';








//   mui
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import ListItemText from '@mui/material/ListItemText';



import { useState, useEffect } from 'react';
import workProfileActions from '../../store/slices/work-slice'

import { workProfileThunk, fetchWorkThunk, updateWorkThunk } from '../../store/slices/work-slice';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const Input = styled('input')({
    display: 'none',
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


const HireForm = (props) => {
    const rid = localStorage.getItem("r_id")
    // const classes = useStyles();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    // let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
    const [lang, setlang] = useState([]);
    const [values, setValues] = useState({

        porf_mbl: '',
        workTime: '',
        study: '',
        otherStudy: '',
    });
    const [fields, setFields] = useState(
        [
            {
                category: "",
                exprience: "",
                salary: "",
            }
        ]
    );
    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)
    // console.log(fields)

    useEffect(() => {
        // dispatch(fetchWorkThunk(rid))
    }, [])

    // useEffect(() => {


    //     // if (message.length !== 0) {
    //     //     alert(message)

    //     // }
    //     // if (error.length !== 0) {
    //     //     // console.log(error)
    //     //     alert(error)
    //     //     dispatch(workProfileActions.errorReducer())
    //     // }

    // }, [message, error])


    // useEffect(() => {
    //     if (workData.length !== 0) {
    //         setValues({
    //             porf_mbl: workData[0].profession_mbl,
    //             workTime: workData[0].workTime,
    //             study: workData[0].education,
    //             otherStudy: workData[0].other_education

    //         })
    //         let list =
    //             workData[0].languages.map((value, index) => {
    //                 return value.language
    //             })
    //         setlang(
    //             list
    //         );

    //         let workDetails = workData[0]?.workDetails?.filter((data) => data)
    //         setFields(workDetails)
    //         setEditHide(false)
    //         setDisable(true)
    //     }
    // }, [workData])


    const onSaveWorkSubmit = (e) => {
        console.log("save works")
        e.preventDefault()
        const arg = {
            values,
            lang,
            fields
        }
        console.log("abc", arg)

        dispatch(workProfileThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(true)
        //close this form model
        // props.click()

    }

    const onUpdateWorkSubmit = (e) => {
        e.preventDefault()
        const arg = {
            values,
            lang,
            fields
        }
        console.log(arg)

        dispatch(updateWorkThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(TouchRipple)
        //close this form model
        // props.click()

    }
    const onEditClick = () => {
        setDisable(!fieldsDisable)

    }



    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    return (
        <React.Fragment>

            <Grid >
                <Card
                    sx={{
                        maxWidth: 750, maxHeight: 8000,
                        margin: '0 auto',
                        paddingTop: 0,
                        borderRadius: 5,
                    }}>
                    <CardContent >

                        <Grid container direction={'row'} spacing={0}>
                            <Grid item xs={2} justifyContent="left" >
                                {!editHide && <Button variant="contained" color="info" onClick={onEditClick}>{fieldsDisable ? "Edit" : "Done"}</Button>}
                            </Grid>

                            <Grid item xs={8} >

                            </Grid>
                            <Grid item xs={2} justifyContent="right" >
                                <Button variant="contained" color="error" onClick={props.click}>Close</Button>
                            </Grid>

                        </Grid>

                        <Typography variant="h4" component='div' fontSize='30px'>Hire Enquiry</Typography>
                        <Typography color='orange' variant='body1' component='p'>Please fill up this form is necessary to move forward !</Typography>

                        <form onSubmit={editHide ? onSaveWorkSubmit : onUpdateWorkSubmit}>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Work : </Typography>
                            <Grid container spacing={1} >
                                <Grid xs={12} sm={12} item>
                                    <FormControl fullWidth required>
                                        <InputLabel id="demo-multiple-checkbox-label">Work</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            // required
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Work" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Select Date: </Typography>
                            <Grid container spacing={1} >
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        id="date"
                                        label="From"
                                        type="date"
                                        required
                                        // style={{ width: "90%" }}
                                        fullWidth
                                        value={values.dob}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, dob: val.target.value } }) }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        id="date"
                                        label="To"
                                        type="date"
                                        required
                                        // style={{ width: "90%" }}
                                        fullWidth
                                        value={values.dob}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, dob: val.target.value } }) }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Your Suitable Timming : </Typography>

                            <Grid container spacing={1}>

                                <Grid xs={12} sm={6} item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            label="From Time"
                                            fullWidth
                                            // value={value}
                                            onChange={(newValue) => {
                                                // setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            fullWidth
                                            label="To Time"
                                            // value={value}
                                            onChange={(newValue) => {
                                                // setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                            </Grid>

                            <Grid container spacing={1} marginTop={1}>

                                <Grid xs={12} sm={12} item>
                                    <TextField
                                        required
                                        multiline
                                        rows={3}
                                        variant='outlined'
                                        id="description"
                                        label="Add Any Description"
                                        fullWidth
                                        placeholder='Please type some information about you !'
                                        value={values.about}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, about: val.target.value } }) }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item>
                                <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                    {editHide ? "Save" : !fieldsDisable && "Update"}
                                </Button>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment >
    );
}

export default HireForm