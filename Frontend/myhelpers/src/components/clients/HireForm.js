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
import hireRequestActions from '../../store/slices/hireRequest-slice'

import { sendHireRequestThunk,updateHireRequestThunk} from '../../store/slices/hireRequest-slice';

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
let { message, hireRequestData, error } = useSelector((state) => ({ ...state.hireRequestStore }))
    const [work, setWork] = useState([]);
    const [values, setValues] = useState({

        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: '',
        description: ''
    });

    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)
    // console.log(fields)

    // useEffect(() => {
    //     dispatch(fetchRequestThunk(rid))
    // }, [])

    useEffect(() => {


        if (message.length !== 0) {
            alert(message)

        }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(hireRequestActions.errorReducer())
        }

    }, [message, error])


    // useEffect(() => {
    //     if (hireRequest.length !== 0) {
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

    // console.log(workData)


    // console.log(fields, "fielsa")
    // // console.log(workField)

    // console.log("redux data :: ", workData)




    const onSendRequest = (e) => {
        console.log("save works")
        e.preventDefault()
        const arg = {
            user_id:props.user_id,
            values,
            work
        }
        console.log("abc", arg)
        //create work Profile
        dispatch(sendHireRequestThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(true)
        //close this form model
        // props.click()

    }

    const onUpdateRequest = (e) => {
        e.preventDefault()
        const arg = {
            values,
            work
        }
        console.log(arg)

        dispatch(updateHireRequestThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(TouchRipple)
        //close this form model
        // props.click()

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
        // console.log("language::", work)
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
                setErrorText("Less than From date!")
            }
        }
        else if (event.target.name === "fromTime") {
            // var nowTime = nowDateTime.split('T')[1].split('.')[0];

            setValues((prevState) => { return { ...prevState, fromTime: event.target.value } })
            // if (isTrue) {
            if (new Date(values.fromDate).getDate() === today.getDate() && values.toDate.length !== 0) {

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
            else if (values.fromDate !== "" && values.toDate !== "") {// for future dates
                if (props.workTime === "Custom (1-4 Hrs)") {
                    console.log(event.target.value)
                    console.log(event.target.value < "06:00" && event.target.value > "20:00")
                    if (event.target.value < "06:00" || event.target.value > "20:00") {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Between 6 AM to 8 PM!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })
                    }
                }
                else if (props.workTime === "Custom Night Shift (After 8 PM)") {
                    if (event.target.value > "05:00" && event.target.value < "20:00") {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Between 8 PM to 6 AM!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })
                    }
                }
                else if (props.workTime === "Full Day (12 Hrs)") {
                    console.log(event.target.value)
                    console.log(event.target.value < "06:00" && event.target.value > "20:00")
                    if (event.target.value < "06:00" || event.target.value > "10:00") {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Between 6 AM to 10 AM!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })
                    }
                }
                else if (props.workTime === "Night Shift (12 Hrs)") {
                    if (event.target.value > "22:00" || event.target.value < "20:00") {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Between 8 PM to 10 PM!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })

                    }
                }
                else if (props.workTime === "Half Day (6 Hrs)") {


                    if (event.target.value < "06:00" || event.target.value > "15:00") {
                        setErrorEnable({ ...errorEnable, fromTime: true })
                        setErrorText("Between 6 AM to 3 PM!")
                    }
                    else {
                        setErrorEnable({ ...errorEnable, fromTime: false })
                    }
                }

            }
            else {
                setErrorEnable({ ...errorEnable, fromTime: true })
                setErrorText("Please first select Dates !")
            }
            // }

        }
        else if (event.target.name === "toTime") {
            setValues((prevState) => { return { ...prevState, toTime: event.target.value } })
            // console.log("is trueeee", isTrue);
            // if (isTrue) {
            const minfrom = moment(values.fromTime, "HH:mm").add(1, "hours").format("HH:mm")
            const maxfrom = moment(values.fromTime, "HH:mm").add(4, "hours").format("HH:mm")
            console.log(event.target.value, minfrom, maxfrom)
            // console.log("tiiime", minfrom,maxfrom)
            // console.log(event.target.value >= minfrom && event.target.value <= maxfrom)
            if (values.fromTime !== "") {
                if (props.workTime === "Custom (1-4 Hrs)") {
                    if (event.target.value >= "07:00" && event.target.value <= "21:00") {
                        console.log(minfrom, maxfrom)
                        console.log(event.target.value >= minfrom && event.target.value <= maxfrom)
                        if (event.target.value >= minfrom && event.target.value <= maxfrom) {
                            setErrorEnable({ ...errorEnable, toTime: false })
                        }
                        else {
                            setErrorEnable({ ...errorEnable, toTime: true })
                            setErrorText("For 1 to 4 Hours only!")
                        }
                    }
                    else {
                        setErrorEnable({ ...errorEnable, toTime: true })
                        setErrorText("Between 7 AM to 9 PM!")
                    }
                }
                else if (props.workTime === "Custom Night Shift (After 8 PM)") {
                    if (event.target.value >= "06:00" && event.target.value <= "21:00") {

                        setErrorEnable({ ...errorEnable, toTime: true })
                        setErrorText("Between 9 PM to 6 AM!")

                    }
                    else {
                        console.log(event.target.value >= minfrom && event.target.value <= maxfrom)
                        if (event.target.value < minfrom && event.target.value > maxfrom) {
                            setErrorEnable({ ...errorEnable, toTime: true })
                            setErrorText("For 1 to 4 Hours only!")
                        }
                        else {
                            setErrorEnable({ ...errorEnable, toTime: false })

                        }
                    }
                }
                else if (props.workTime === "Full Day (12 Hrs)") {


                    if (event.target.value < "18:00" || event.target.value > "22:00") {
                        setErrorEnable({ ...errorEnable, toTime: true })
                        setErrorText("Between 6 PM to 10 PM!")
                    }
                    else {
                        const hours = moment(values.fromTime, "HH:mm").add(12, "hours").format("HH:mm")
                        console.log(hours)
                        if (event.target.value === hours) {
                            setErrorEnable({ ...errorEnable, toTime: false })
                        }
                        else {
                            setErrorEnable({ ...errorEnable, toTime: true })
                            setErrorText("For 12 Hours only!")
                        }

                    }
                }
                else if (props.workTime === "Night Shift (12 Hrs)") {
                    if (event.target.value < "08:00" || event.target.value > "10:00") {
                        setErrorEnable({ ...errorEnable, toTime: true })
                        setErrorText("Between 8 AM to 10 AM!")
                    }
                    else {
                        const hours = moment(values.fromTime, "HH:mm").add(12, "hours").format("HH:mm")
                        console.log(hours)
                        if (event.target.value === hours) {
                            setErrorEnable({ ...errorEnable, toTime: false })
                        }
                        else {
                            setErrorEnable({ ...errorEnable, toTime: true })
                            setErrorText("For 12 Hours only!")
                        }

                    }
                }
                else if (props.workTime === "Half Day (6 Hrs)") {
                    if (event.target.value < "12:00" || event.target.value > "21:00") {
                        setErrorEnable({ ...errorEnable, toTime: true })
                        setErrorText("Between 12 PM to 9 PM!")
                    }
                    else {
                        const hours = moment(values.fromTime, "HH:mm").add(6, "hours").format("HH:mm")
                        console.log(hours)
                        if (event.target.value === hours) {
                            setErrorEnable({ ...errorEnable, toTime: false })
                        }
                        else {
                            setErrorEnable({ ...errorEnable, toTime: true })
                            setErrorText("For 6 Hours only!")
                        }
                    }
                }
            }

            else {
                setErrorEnable({ ...errorEnable, toTime: true })
                setErrorText("First select From time!")
            }
        }
    }
    const [saveEnable, setSaveEnable] = useState(false)
    useEffect(() => {
        console.log("error::", errorEnable)
        const areTrue = Object.values(errorEnable).every(
            value => value !== true

        );

        console.log("allerror::", areTrue);
        const isNullish = Object.values(values).every(value => value !== "");
        console.log("null", isNullish)

        work.length !== 0 ? isNullish ? areTrue ? setSaveEnable(true) : setSaveEnable(false) : setSaveEnable(false) : setSaveEnable(false)

    }, [errorEnable, values, work])
    return (
        <React.Fragment>

            <Grid >
                <Card
                    sx={{
                        minWidth: 500, maxHeight: 8000,
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

                        <form onSubmit={editHide ? onSendRequest : onUpdateRequest}>
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
                                        value={values.decription}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, description: val.target.value } }) }}
                                    />
                                </Grid>
                            </Grid>
                            {saveEnable &&
                                <Grid xs={12} item>
                                <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                    {editHide ? "Send" : !fieldsDisable && "Update and Send"}
                                </Button>
                            </Grid>}
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment >
    );
}

export default HireForm