//header file
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


import DisplayWorkingFields from './DisplayWorkingFields';
import { useState, useEffect } from 'react';
import workProfileActions from '../../store/slices/work-slice'

import { workProfileThunk, fetchWorkThunk, updateWorkThunk } from '../../store/slices/work-slice';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

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
const languageName = [
    'Hindi',
    'English',
    'Gujarati',
    'Marthi',
    'Marwadi',
    'Bengali',
    'Telugu',
    'Tamil',
    'Punjab',
    'Malyalam',
    'Kannad'
];
const WorkProfile = (props) => {
    const rid = localStorage.getItem("r_id")
    // const classes = useStyles();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    let { message, workData, error } = useSelector((state) => ({ ...state.workProfileStore }))
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
        dispatch(fetchWorkThunk(rid))
    }, [])

    useEffect(() => {


        if (message.length !== 0) {
            alert(message)

        }
        // if (error.length !== 0) {
        //     // console.log(error)
        //     alert(error)
        //     dispatch(workProfileActions.errorReducer())
        // }

    }, [message, error])


    useEffect(() => {
        if (workData.length !== 0) {
            setValues({
                porf_mbl: workData[0].profession_mbl,
                workTime: workData[0].workTime,
                study: workData[0].education,
                otherStudy: workData[0].other_education

            })
            let list =
                workData[0].languages.map((value, index) => {
                    return value.language
                })
            setlang(
                list
            );

            let workDetails = workData[0]?.workDetails?.filter((data) => data)
            setFields(workDetails)
            setEditHide(false)
            setDisable(true)
        }
    }, [workData])

    // console.log(workData)


    // console.log(fields, "fielsa")
    // // console.log(workField)

    // console.log("redux data :: ", workData)

    const langHandleChange = (event) => {
        const {
            target: { value },
        } = event;
        setlang(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const onSaveWorkSubmit = (e) => {
        console.log("save works")
        e.preventDefault()
        const arg = {
            values,
            lang,
            fields
        }
        console.log("abc",arg)

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
                                {!editHide && <Button variant="contained" color="info" onClick={onEditClick}>{fieldsDisable ? "Edit":"Done"}</Button>}
                            </Grid>

                            <Grid item xs={8} >

                            </Grid>
                            <Grid item xs={2} justifyContent="right" >
                                <Button variant="contained" color="error" onClick={props.click}>Close</Button>
                            </Grid>

                        </Grid>

                        <Typography variant="h4" component='div' fontSize='30px'>Professional Profile</Typography>
                        <Typography color='orange' variant='body1' component='p'>Please fill up this form is necessary to move forward !</Typography>

                        <form onSubmit={editHide ? onSaveWorkSubmit : onUpdateWorkSubmit}>
                            {/* <Typography variant='subtitle1' marginLeft={1.5}  align='left' color='InfoText'>Personal Details : </Typography> */}
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Working Details : </Typography>

                            <Grid container spacing={1}>

                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        disabled={fieldsDisable}
                                        required
                                        variant='outlined'
                                        id="mobile no"
                                        label="Profession Monile No."
                                        placeholder=''
                                        fullWidth
                                        value={values.porf_mbl}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, porf_mbl: val.target.value } }) }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="grouped-native-select">Working Time</InputLabel>
                                        <Select native id="grouped-native-select" label="Working Time"
                                            disabled={fieldsDisable}
                                            value={values.workTime}
                                            onChange={(val) => { setValues((prevState) => { return { ...prevState, workTime: val.target.value } }) }}
                                        >
                                            <option value=""> </option>

                                            <option value="Live In (24 Hrs)">Live In (24 Hrs)</option>
                                            <option value="Full Day (12 Hrs)">Full Day (12 Hrs)</option>
                                            <option value="Half Day (6 Hrs)">Half Day (6 Hrs)</option>
                                            <option value="Custom (1-4 Hrs)">Custom (1-4 Hrs)</option>
                                            <option value="Night Shift (2-12 Hrs)">Night Shift (2-12 Hrs)</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 2 }} align='left' color='InfoText'>Maximum 5 skills you can add : </Typography>
                            <Grid container spacing={1} style={{ maxHeight: '155px', overflow: 'auto' }}>
                                <DisplayWorkingFields
                                    fields={fields}
                                    setFields={setFields}
                                    fieldsDisable={fieldsDisable}
                                />
                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Education Details : </Typography>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-checkbox-label">Language Known</InputLabel>
                                        <Select
                                            disabled={fieldsDisable}
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={lang}
                                            onChange={langHandleChange}
                                            input={<OutlinedInput label="TaLanguage Knowng" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {languageName.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={lang.indexOf(name) > -1} />
                                                    {/* {console.log(lang.indexOf(name) )} */}
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="grouped-native-select">Studied Upto</InputLabel>
                                        <Select native id="grouped-native-select" label="Studied Upto"
                                            disabled={fieldsDisable}
                                            value={values.study}
                                            onChange={(val) => { setValues((prevState) => { return { ...prevState, study: val.target.value } }) }}
                                        >
                                            <option value=""> </option>
                                            <option value="Not Done">Not Done</option>
                                            <option value="1st - 5th Class">1st - 5th Class </option>
                                            <option value="6th - 9th Class">6th - 9th Class</option>
                                            <option value="10th Class">10th Class</option>
                                            <option value="12th Class">12th Class</option>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        disabled={fieldsDisable}
                                        required
                                        variant='outlined'
                                        id="other"
                                        label="Other Education"
                                        placeholder='N/A or Other Education Name'
                                        fullWidth
                                        value={values.otherStudy}
                                        onChange={(val) => { setValues((prevState) => { return { ...prevState, otherStudy: val.target.value } }) }}
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
        </React.Fragment>
    );
}

export default WorkProfile