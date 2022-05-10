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
import moment from "moment";
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
import FormHelperText from '@mui/material/FormHelperText';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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


const HireForm = (props) => {
    const rid = localStorage.getItem("r_id")

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [work, setWork] = useState([]);
    const [values, setValues] = useState({

        fromDate: '',
        toDate: '09:00',
        fromTime: '',
        toTime: '',
        about: ''
    });

    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)
    // console.log(fields)

    const onSaveWorkSubmit = (e) => {


    }

    const onUpdateWorkSubmit = (e) => {


    }
    const onEditClick = () => {
        setDisable(!fieldsDisable)

    }

    const [errorEnable, setErrorEnable] = useState({

        work: false,
        fromDate: false,
        toDate: false,
        fromTime: false,
        toTime: false,


    })


    const [errorText, setErrorText] = useState("");
    const workChange = (event) => {
        const {
            target: { value },
        } = event;
        setWork(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // console.log("language::", event.target.value)
        if (event.target.value.length === 0) {
            // console.log("wrong::", event.target.value)
            setErrorEnable({ ...errorEnable, work: true })
            setErrorText("Please choose it!")
        }
        else {
            // console.log("correct::", event.target.value)
            setErrorEnable({ ...errorEnable, work: false })

        }
    };
    const onChange = (event) => {
        console.log(event.target.name, event.target.id)
        const isTrue = props.workTime === "Custom (1-4 Hrs)" || props.workTime === "Custom Night Shift (After 8 PM)"
        const today = new Date()


        if (event.target.name === "fromDate") {
            // console.log(event.target.value)
            // console.log(new Date(event.target.value) < new Date())
            setValues((prevState) => { return { ...prevState, fromDate: event.target.value } })

            if (isTrue) {
                const prevDay = new Date(today.setDate(today.getDate() - 1))
                if (new Date(event.target.value) < prevDay) {

                    setErrorEnable({ ...errorEnable, fromDate: true })
                    setErrorText("Should be today or future date!")
                }
                else {
                    setErrorEnable({ ...errorEnable, fromDate: false })
                }

            }
            else {

                if (new Date(event.target.value) < today) {

                    setErrorEnable({ ...errorEnable, fromDate: true })
                    setErrorText("Date should be future date!")
                }
                else {
                    setErrorEnable({ ...errorEnable, fromDate: false })
                }
            }
        }
        else if (event.target.name === "toDate") {
            setValues((prevState) => { return { ...prevState, toDate: event.target.value } })
            if (new Date(event.target.value) >= new Date(values.fromDate)) {
                setErrorEnable({ ...errorEnable, toDate: false })

            }
            else {
                setErrorEnable({ ...errorEnable, toDate: true })
                setErrorText("Less than from date!")
            }
        }
        else if (event.target.name === "fromTime") {
            console.log(event.target.value)

            // var nowTime = nowDateTime.split('T')[1].split('.')[0];
            // 

            if (isTrue) {

                console.log(new Date(values.fromDate).getDate() === today.getDate())
                if (new Date(values.fromDate).getDate() === today.getDate()) {

                    const nextTime = new Date(today.setTime(today.getTime() + 3 * 60 * 60 * 1000))
                    const nowTime = nextTime.getHours() + ":" + nextTime.getMinutes() + ":" + nextTime.getSeconds()

                    if (event.target.value < nowTime) {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Time should be 3 hours later!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })
                    }
                }
                else if (values.fromDate !== "" && values.toDate !== "") {
                    setValues((prevState) => { return { ...prevState, fromTime: event.target.value } })
                    if (event.target.value < "06:00" || event.target.value > "20:00") {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Between 6 AM to 8 PM!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })
                    }
                }
                else
                {
                    setErrorEnable({ ...errorEnable, fromTime: true })
                    setErrorText("Please 1st select dates !")
                    }
            }

        }
        else if (event.target.name === "toTime") {
            setValues((prevState) => { return { ...prevState, toTime: event.target.value } })
            // console.log("is trueeee", isTrue);
            if (isTrue) {
                const minfrom = moment(values.fromTime, "HH:mm").add(1, "hours").format("HH:mm")
                const maxfrom = moment(values.fromTime, "HH:mm").add(4, "hours").format("HH:mm")

                // console.log("tiiime", minfrom,maxfrom)
                console.log(event.target.value >= minfrom && event.target.value <= maxfrom)
                if (event.target.value >= minfrom && event.target.value <= maxfrom) {
                    setErrorEnable({ ...errorEnable, toTime: false })
                }
                else
                {
                    setErrorEnable({ ...errorEnable, toTime: true })
                    setErrorText("For 1 to 4 Hours only!")
                    }
            }
        }
    }
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
                                    <FormControl fullWidth required error={errorEnable.work}>
                                        <InputLabel id="demo-multiple-checkbox-label">Work</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            // required
                                            value={work}
                                            onChange={workChange}
                                            input={<OutlinedInput label="Work" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {props.fields.map((row, index) => (
                                                <MenuItem key={index} value={row.category}>
                                                    <Checkbox checked={work.indexOf(row.category) > -1} />
                                                    <ListItemText primary={row.category} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{errorEnable.work && errorText}</FormHelperText>
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Work Time : </Typography>
                            <Grid container spacing={1} >
                                <Grid xs={12} sm={12} item>
                                    <TextField
                                        id="time"
                                        required
                                        name="time"
                                        // style={{marginTop:"2%" }}
                                        fullWidth
                                        value={props.workTime}
                                        inputProps={{
                                            readOnly: Boolean(true),
                                            // disabled: Boolean(true),
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Select Date : </Typography>
                            <Grid container spacing={1} >
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        id="fromDate"
                                        label="From Date"
                                        type="date"
                                        required
                                        name="fromDate"
                                        // style={{ width: "90%" }}
                                        fullWidth
                                        value={values.fromDate}
                                        onChange={onChange}
                                        error={errorEnable.fromDate}
                                        helperText={errorEnable.fromDate && errorText}
                                        InputProps={{ inputProps: { min: new Date() } }}

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        id="toDate"
                                        label="To Date"
                                        type="date"
                                        required
                                        name="toDate"
                                        // style={{ width: "90%" }}
                                        fullWidth
                                        value={values.toDate}
                                        onChange={onChange}
                                        error={errorEnable.toDate}
                                        helperText={errorEnable.toDate && errorText}
                                        InputProps={{ inputProps: { min: new Date() } }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Your Suitable Timming : </Typography>

                            <Grid container spacing={1}>
                                {/* {props.workTime === "Full Day (12 Hrs)" || props.workTime === "Live In (24 Hrs)" || props.workTime === "Night Shift (12 Hrs)" */}

                                < Grid xs={12} sm={6} item>

                                    <TextField
                                        id="fromTime"
                                        label="From Time"
                                        type="time"
                                        required
                                        name="fromTime"
                                        disabled={props.workTime === "Live In (24 Hrs)" ? true : false}
                                        fullWidth
                                        value={values.fromTime}
                                        error={errorEnable.fromTime}
                                        helperText={errorEnable.fromTime && errorText}
                                        onChange={onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        id="toTime"
                                        label="To Time"
                                        type="time"
                                        required
                                        name="toTime"
                                        disabled={props.workTime === "Live In (24 Hrs)" ? true : false}
                                        fullWidth
                                        value={values.toTime}
                                        onChange={onChange}
                                        error={errorEnable.toTime}
                                        helperText={errorEnable.toTime && errorText}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                      
                                    />
                                </Grid>


                            </Grid>

                            <Grid container spacing={1} marginTop={1}>

                                <Grid xs={12} sm={12} item>
                                    <TextField
                                        required
                                        multiline
                                        maxRows={3}
                                        inputProps={{
                                            maxLength: 100
                                        }}
                                        variant='outlined'
                                        id="description"
                                        label="Add Any Description"
                                        fullWidth
                                        placeholder='Please type some work related information!'
                                        value={values.about}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, about: val.target.value } }) }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={12} item>
                                <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                    {editHide ? "Send" : !fieldsDisable && "Update and Send"}
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