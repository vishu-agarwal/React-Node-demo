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
import { useState } from 'react';
import workProfileActions from '../../store/slices/work-slice'
import { workProfileThunk } from '../../store/slices/work-slice';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
    // const classes = useStyles();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))

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
    // console.log(fields)
    const [lang, setlang] = useState([]);

    const langHandleChange = (event) => {
        const {
            target: { value },
        } = event;
        setlang(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const onWorkSubmit = (e) => {
        e.preventDefault()
        const arg = {
            values,
            lang,
            fields
        }
        console.log(arg)

        dispatch(workProfileThunk(arg))
        props.click()
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

                            <Grid item xs={10} >

                            </Grid>
                            <Grid item xs={2} justifyContent="right" >
                                <Button variant="contained" color="error" onClick={props.click}>Back</Button>
                            </Grid>

                        </Grid>

                        <Typography variant="h4" component='div' fontSize='30px'>Professional Profile</Typography>
                        <Typography color='orange' variant='body1' component='p'>Please fill up this form is necessary to move forward !</Typography>
                        <form onSubmit={onWorkSubmit}>
                            {/* <Typography variant='subtitle1' marginLeft={1.5}  align='left' color='InfoText'>Personal Details : </Typography> */}
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Working Details : </Typography>
                            <Grid container spacing={1}>

                                <Grid xs={12} sm={6} item>
                                    <TextField
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
                                            value={values.workTime}
                                            onChange={(val) => { setValues((prevState) => { return { ...prevState, workTime: val.target.value } }) }}
                                        >
                                            <option value=""> </option>

                                            <option value="Live In (24 Hrs)">Live In (24 Hrs)</option>
                                            <option value="Full Day (12 Hrs">Full Day (12 Hrs)</option>
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
                                />
                            </Grid>
                            <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Education Details : </Typography>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-checkbox-label">Language Known</InputLabel>
                                        <Select
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
                                    Save
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