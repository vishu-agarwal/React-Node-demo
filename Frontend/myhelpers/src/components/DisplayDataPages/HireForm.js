import * as React from 'react';

//   mui
import Modal from '@mui/material/Modal';
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useState, useEffect } from 'react';
import hireRequestActions from '../../store/slices/hireRequest-slice'

import { sendHireRequestThunk, updateHireRequestThunk, fetchSingleHireRequestThunk } from '../../store/slices/hireRequest-slice';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import CheckIcon from '@mui/icons-material/Check';
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


    const navigate = useNavigate()

    const dispatch = useDispatch()
    let { message, singleUser, error } = useSelector((state) => ({ ...state.hireRequestStore }))



    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)
    // console.log(fields)

    // useEffect(() => {
    //     console.log("userid",props.user_id)

    //     dispatch(fetchSingleHireRequestThunk(props.user_id))
    // }, [props.user_id])

    useEffect(() => {


        if (message.length !== 0) {
            alert(message)

        }
        if (error.length !== 0) {
            // console.log(error)
            // alert(error)
            // dispatch(hireRequestActions.errorReducer())
        }

    }, [message, error])


    useEffect(() => {
        console.log("hireData", props.hireValues)
        if (singleUser && singleUser.length !== 0) {
            console.log("hireRequest")
            props.sethireValues({
                fromDate: singleUser.fromDate,
                toDate: singleUser.toDate,
                fromTime: singleUser.fromTime,
                toTime: singleUser.toTime,
                description: singleUser.description,
            })

            props.setWork(
                singleUser.work
            );
            setEditHide(false)
            setDisable(true)
        }
    }, [singleUser])

    const onSendRequest = (e) => {
        console.log("save works")
        e.preventDefault()
        const arg = {
            user_id: props.user_id,
            values: props.hireValues,
            work: props.work
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
            user_id: props.user_id,
            values: props.hireValues,
            work: props.work
        }


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
        props.setWork(
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
            if (props.hireValues.toDate.length !== 0) {
                // if (new Date(event.target.value) <= new Date(props.hireValues.toDate)) {
                setErrorEnable({ ...errorEnable, toDate: true })
                setErrorText("Again select date!")
                // }
            }
            props.sethireValues((prevState) => { return { ...prevState, fromDate: event.target.value } })
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
            props.sethireValues((prevState) => { return { ...prevState, toDate: event.target.value } })
            if (new Date(event.target.value) >= new Date(props.hireValues.fromDate)) {
                setErrorEnable({ ...errorEnable, toDate: false })
            }
            else {
                setErrorEnable({ ...errorEnable, toDate: true })
                setErrorText("Less than From date!")
            }
        }
        else if (event.target.name === "fromTime") {
            // var nowTime = nowDateTime.split('T')[1].split('.')[0];
            if (props.hireValues.toTime.length !== 0) {
                // if (event.target.value <= new Date(props.hireValues.fromDate)) {
                setErrorEnable({ ...errorEnable, toTime: true })
                setErrorText("Again select time!")
                // }
            }
            props.sethireValues((prevState) => { return { ...prevState, fromTime: event.target.value } })
            // if (isTrue) {
            if (new Date(props.hireValues.fromDate).getDate() === today.getDate() && props.hireValues.toDate.length !== 0) {

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
            else if (props.hireValues.fromDate !== "" && props.hireValues.toDate !== "") {// for future dates
                if (props.workTime === "Custom (1-4 Hrs)") {
                    // console.log(event.target.value)
                    // console.log(event.target.value < "06:00" && event.target.value > "20:00")
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
            props.sethireValues((prevState) => { return { ...prevState, toTime: event.target.value } })
            // console.log("is trueeee", isTrue);
            // if (isTrue) {
            const minfrom = moment(props.hireValues.fromTime, "HH:mm").add(1, "hours").format("HH:mm")
            const maxfrom = moment(props.hireValues.fromTime, "HH:mm").add(4, "hours").format("HH:mm")
            console.log(event.target.value, minfrom, maxfrom)
            // console.log("tiiime", minfrom,maxfrom)
            // console.log(event.target.value >= minfrom && event.target.value <= maxfrom)
            if (props.hireValues.fromTime !== "") {
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
                        const hours = moment(props.hireValues.fromTime, "HH:mm").add(12, "hours").format("HH:mm")
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
                        const hours = moment(props.hireValues.fromTime, "HH:mm").add(12, "hours").format("HH:mm")
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
                        const hours = moment(props.hireValues.fromTime, "HH:mm").add(6, "hours").format("HH:mm")
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

        const areTrue = Object.values(errorEnable).every(
            value => value !== true

        );
        const isNullish = Object.values(props.hireValues).every(value => value !== "");


        if (props.workTime === "Live In (24 Hrs)") {

            const nullTime = props.hireValues.toDate !== "" && props.hireValues.fromDate !== "" && props.hireValues.description !== ""
            props.work.length !== 0 ? nullTime ? areTrue ? setSaveEnable(true) : setSaveEnable(false) : setSaveEnable(false) : setSaveEnable(false)
        }

        else { props.work.length !== 0 ? isNullish ? areTrue ? setSaveEnable(true) : setSaveEnable(false) : setSaveEnable(false) : setSaveEnable(false) }

    }, [errorEnable, props.hireValues, props.work])
    return (
        <Modal
            open={props.open}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >

            <Grid >
                <Card
                    sx={{
                        minWidth: 500, minHeight: 600,
                        margin: '0 auto',
                        paddingTop: 0,
                        borderRadius: 5,
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

                                    <Grid item xs={12} sm={1} justifyContent="left" >
                                        {!editHide && singleUser && singleUser.status === "pending!" &&
                                            <IconButton onClick={onEditClick} sx={{ padding: 0 }}>
                                                {fieldsDisable ?
                                                    <ModeEditIcon sx={{ color: "white", fontSize: 35 }} cursor="pointer" />
                                                    :
                                                    < CheckIcon sx={{ color: "white", fontSize: 40 }} cursor="pointer" />}
                                            </IconButton>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={1} align="right">
                                        {/* <Button variant="contained" color="error" onClick={props.click}>Close</Button> */}
                                        <CloseIcon sx={{ color: "white", fontSize: 40 }} cursor="pointer" onClick={props.click} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item xs={11} sm={11} md={11} margin={1} align="center">

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
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),

                                                    }}
                                                    value={props.work}
                                                    onChange={workChange}
                                                    input={<OutlinedInput label="Work" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {props.fields.map((row, index) => (
                                                        <MenuItem key={index} value={row.category}>
                                                            <Checkbox checked={props.work.indexOf(row.category) > -1} />
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
                                                inputProps={{
                                                    readOnly: Boolean(fieldsDisable),

                                                }}
                                                fullWidth
                                                value={props.hireValues.fromDate}
                                                onChange={onChange}
                                                error={errorEnable.fromDate}
                                                helperText={errorEnable.fromDate && errorText}
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
                                                value={props.hireValues.toDate}
                                                onChange={onChange}
                                                error={errorEnable.toDate}
                                                helperText={errorEnable.toDate && errorText}
                                                inputProps={{
                                                    readOnly: Boolean(fieldsDisable),

                                                }}
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
                                                value={props.hireValues.fromTime}
                                                error={errorEnable.fromTime}
                                                helperText={errorEnable.fromTime && errorText}
                                                inputProps={{
                                                    readOnly: Boolean(fieldsDisable),

                                                }}
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
                                                inputProps={{
                                                    readOnly: Boolean(fieldsDisable),

                                                }}
                                                disabled={props.workTime === "Live In (24 Hrs)" ? true : false}
                                                fullWidth
                                                value={props.hireValues.toTime}
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
                                                    maxLength: 100,
                                                    readOnly: Boolean(fieldsDisable),
                                                }}

                                                variant='outlined'
                                                id="description"
                                                label="Add Any Description"
                                                fullWidth
                                                placeholder='Please type some work related information!'
                                                value={props.hireValues.description}
                                                onChange={(val) => { props.sethireValues((prevState) => { return { ...prevState, description: val.target.value } }) }}
                                            />
                                        </Grid>
                                    </Grid>
                                    {(saveEnable || !editHide) && !fieldsDisable &&
                                        <Grid xs={12} item>
                                            <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                                {editHide ? "Send" : !fieldsDisable && "Update and Send"}
                                            </Button>
                                        </Grid>
                                    }
                                </form>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Modal>
    );
}

export default HireForm