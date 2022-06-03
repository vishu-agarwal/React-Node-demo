import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Card, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import DisplayWorkingFields from './DisplayWorkingFields';
import { useState, useEffect } from 'react';
import { workProfileActions } from '../../store/slices/work-slice'
import { workProfileThunk, fetchWorkThunk, updateWorkThunk } from '../../store/slices/work-slice';
import Loading from '../layouts/LoadingFile'
import { useSelector, useDispatch } from 'react-redux';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
    'Marathi',
    'Marwadi',
    'Bengali',
    'Telugu',
    'Tamil',
    'Punjabi',
    'Malyalam',
    'Kannad'
];
const WorkProfile = (props) => {

    const rid = localStorage.getItem("r_id")
    const dispatch = useDispatch()

    let { workMessage, workData, workError, workLoading } = useSelector((state) => ({ ...state.workProfileStore }))

    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { open } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")

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
                experience: "",
                salary: "",
            }
        ]
    );
    //edit button show or hide
    const [editHide, setEditHide] = useState(true)
    //fields enable or diable on hide button
    const [fieldsDisable, setDisable] = useState(false)

    useEffect(() => {
        dispatch(fetchWorkThunk(rid))
    }, [])

    useEffect(() => {
        if (workMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(workMessage)
            dispatch(workProfileActions.messageReducer())
        }
        if (workError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(workError)
            dispatch(workProfileActions.errorReducer())
        }
    }, [workMessage, workError])

    useEffect(() => {
        if (workData.length !== 0) {
            setValues({
                porf_mbl: workData?.profession_mobile_number,
                workTime: workData?.work_time,
                study: workData?.education,
                otherStudy: workData?.other_education
            })
            let list = workData?.languages?.map((value) => {
                return value.language
            }).flat()

            setlang(
                list
            );
            let workDetails = workData?.work_details?.filter((data) => data)
            setFields(workDetails)
            setEditHide(false)
            setDisable(true)
        }
    }, [workData])

    const onSaveWorkSubmit = (e) => {
        e.preventDefault()
        const arg = {
            values,
            lang,
            fields,
            rid
        }
        //create work Profile
        dispatch(workProfileThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(true)
        props.click()
    }

    const onUpdateWorkSubmit = (e) => {
        e.preventDefault()
        const arg = {
            values,
            lang,
            fields,
            rid
        }
        dispatch(updateWorkThunk(arg))
        //Edit button display
        setEditHide(false)
        setDisable(TouchRipple)
    }
    const onEditClick = () => {
        setDisable(!fieldsDisable)
    }

    //validations
    const [saveEnable, setSaveEnable] = useState(false)
    const [errorEnable, setErrorEnable] = useState({
        porf_mbl: false,
        workTime: false,
        study: false,
        otherStudy: false,
        language: false,
        category: false,
        experience: false,
        salary: false,
    })

    const [errorText, setErrorText] = useState("");
    const langHandleChange = (event) => {
        const {
            target: { value },
        } = event;
        setlang(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        if (event.target.value.length === 0) {
            setErrorEnable({ ...errorEnable, language: true })
            setErrorText("Please choose it!")
        }
        else {
            setErrorText("")
            setErrorEnable({ ...errorEnable, language: false })
        }
    };
    const onChange = (event) => {
        if (event.target.name === "otherStudy") {
            setValues((prevState) => { return { ...prevState, otherStudy: event.target.value } })
            if (/^[A-Za-z/*]+$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, otherStudy: false })
            }
            else {
                setErrorEnable({ ...errorEnable, otherStudy: true })
                setErrorText("Please fill it!")
            }
        }
        else if (event.target.name === "studyselect") {
            setValues((prevState) => { return { ...prevState, study: event.target.value } })
            if (event.target.value !== "") {
                setErrorEnable({ ...errorEnable, study: false })
            }
            else {
                setErrorEnable({ ...errorEnable, study: true })
                setErrorText("Please choose it!")
            }
        }
        else if (event.target.name === "time") {
            setValues((prevState) => { return { ...prevState, workTime: event.target.value } })
            if (event.target.value !== "") {
                setErrorEnable({ ...errorEnable, workTime: false })
            }
            else {
                setErrorEnable({ ...errorEnable, workTime: true })
                setErrorText("Please choose it!")
            }
        }
        else if (event.target.name === "mobileno") {
            setValues((prevState) => {
                return {
                    ...prevState,
                    porf_mbl: event.target.value
                }
            })
            if (/^[6-9][0-9]{9}$/.test(event.target.value)) {
                setErrorEnable({ ...errorEnable, porf_mbl: false })
            }
            else {
                setErrorEnable({ ...errorEnable, porf_mbl: true })
                setErrorText("Start with [6-9] and 10 digits mobile no.!")
            }
        }
        else {
            setErrorText("")
        }
    };
    useEffect(() => {
        const areTrue = Object.values(errorEnable).every(
            value => value !== true
        );
        const isNullish = Object.values(values).every(value => value !== "");
        isNullish ? areTrue ? setSaveEnable(true) : setSaveEnable(false) : setSaveEnable(false)
    }, [errorEnable, values])
    return (
        <Modal
            open={props.open}
            onClose={props.click}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid >
                {workLoading ? <Loading isLoad={true} /> :
                    <Card
                        sx={{
                            maxWidth: 760, maxHeight: 8000,
                            margin: '0 auto',
                            paddingTop: 0,
                            borderRadius: 5,
                        }}>
                        <CardContent style={{ padding: 0 }}>
                            <Grid container direction={'row'} >
                                <Snackbar
                                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                    open={open}
                                    autoHideDuration={4000}
                                    onClose={closeSnackbar}
                                >
                                    <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                                        {snackMessage}
                                    </Alert>
                                </Snackbar>
                                <Grid item xs={12} sm={12} md={12} backgroundColor="#163758">
                                    <Grid container direction={'row'} padding={1.5} >
                                        <Grid item xs={12} sm={10} align="left" >
                                            <Typography fontSize={25} color="white" >
                                                Work Profile Form
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={1} align="right" >
                                            {!editHide &&
                                                <IconButton onClick={onEditClick} sx={{ padding: 0 }}>
                                                    {fieldsDisable ?
                                                        <ModeEditIcon sx={{ color: "white", fontSize: 30 }} cursor="pointer" />
                                                        :
                                                        < CheckIcon sx={{ color: "white", fontSize: 30 }} cursor="pointer" />}
                                                </IconButton>
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={1} align="right">
                                            <CloseIcon sx={{ color: "white", fontSize: 30 }} cursor="pointer" onClick={props.click} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={12} md={12} margin={1} marginLeft={3} marginRight={3} align="center">
                                    <form onSubmit={editHide ? onSaveWorkSubmit : onUpdateWorkSubmit}>
                                        <Typography marginLeft={1.5} sx={{ marginBottom: 1, color: "orange" }}
                                            align='center' > {(saveEnable || !editHide) && !fieldsDisable ?
                                                "Require to fill all the fields." : "Click on edit button for update profile."}</Typography>
                                        <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }}
                                            align='left' color='InfoText'>Working Details : </Typography>
                                        <Grid container spacing={1}>
                                            <Grid xs={12} sm={6} item>
                                                <TextField
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                        maxLength: 10
                                                    }}
                                                    required
                                                    variant='outlined'
                                                    name="mobileno"
                                                    label="Profession Mobile No "
                                                    placeholder=''
                                                    fullWidth
                                                    value={values.porf_mbl}
                                                    onChange={onChange}
                                                    error={errorEnable.porf_mbl}
                                                    helperText={errorEnable.porf_mbl && errorText}
                                                />
                                            </Grid>
                                            <Grid xs={12} sm={6} item>
                                                <FormControl fullWidth error={errorEnable.workTime} >
                                                    <InputLabel htmlFor="grouped-native-select">Working Time *</InputLabel>
                                                    <Select name="time" label="Working Time *"

                                                        inputProps={{
                                                            readOnly: Boolean(fieldsDisable),
                                                        }}
                                                        value={values.workTime}
                                                        onChange={onChange}
                                                    >
                                                        <MenuItem value="">---select---</MenuItem>
                                                        <MenuItem value="Live In (24 Hrs)">Live In (24 Hrs)</MenuItem>
                                                        <MenuItem value="Full Day (12 Hrs)">Full Day (12 Hrs)</MenuItem>
                                                        <MenuItem value="Half Day (6 Hrs)">Half Day (6 Hrs)</MenuItem>
                                                        <MenuItem value="Custom (1-4 Hrs)">Custom (1-4 Hrs)</MenuItem>
                                                        <MenuItem value="Custom Night Shift (After 8 PM)">Custom Night Shift (After 8 PM)</MenuItem>
                                                        <MenuItem value="Night Shift (12 Hrs)">Night Shift (12 Hrs)</MenuItem>
                                                    </Select>
                                                    <FormHelperText>{errorEnable.workTime && errorText}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 2 }} align='left' color='InfoText'>Maximum 5 skills you can add : </Typography>
                                        <Grid container spacing={1} style={{ maxHeight: '155px', overflowY: 'auto', minWidth: '750px' }}>
                                            <DisplayWorkingFields
                                                fields={fields}
                                                setFields={setFields}
                                                fieldsDisable={fieldsDisable}
                                                errorEnable={errorEnable}
                                                setErrorEnable={setErrorEnable}
                                            />
                                        </Grid>
                                        <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Education Details : </Typography>
                                        <Grid container spacing={1}>
                                            <Grid xs={12} sm={12} item>
                                                <FormControl fullWidth error={errorEnable.language}>
                                                    <InputLabel id="demo-multiple-checkbox-label">Language Known *</InputLabel>
                                                    <Select
                                                        inputProps={{
                                                            readOnly: Boolean(fieldsDisable),
                                                        }}
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="langselect"
                                                        multiple
                                                        value={lang}
                                                        onChange={langHandleChange}
                                                        input={<OutlinedInput label="Language Known *" />}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {languageName.map((name) => (
                                                            <MenuItem key={name} value={name}>
                                                                <Checkbox checked={lang?.indexOf(name) > -1} />
                                                                <ListItemText primary={name} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText>{errorEnable.language && errorText}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={12} sm={6} item>
                                                <FormControl fullWidth error={errorEnable.study}>
                                                    <InputLabel htmlFor="grouped-native-select">Studied Upto *</InputLabel>
                                                    <Select
                                                        name="studyselect" label="Studied Upto *"
                                                        inputProps={{
                                                            readOnly: Boolean(fieldsDisable),
                                                        }}
                                                        value={values.study}
                                                        onChange={onChange}
                                                    >
                                                        <MenuItem value="">---select---</MenuItem>
                                                        <MenuItem value="Not Done">Not Done</MenuItem>
                                                        <MenuItem value="1st - 5th Class">1st - 5th Class </MenuItem>
                                                        <MenuItem value="6th - 9th Class">6th - 9th Class</MenuItem>
                                                        <MenuItem value="10th Class">10th Class</MenuItem>
                                                        <MenuItem value="12th Class">12th Class</MenuItem>

                                                    </Select>
                                                    <FormHelperText>{errorEnable.study && errorText}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={12} sm={6} item>
                                                <TextField
                                                    inputProps={{
                                                        readOnly: Boolean(fieldsDisable),
                                                    }}
                                                    required
                                                    variant='outlined'
                                                    name="otherStudy"
                                                    label="Other Education"
                                                    placeholder='N/A or Other Education Name'
                                                    fullWidth
                                                    value={values.otherStudy}
                                                    onChange={onChange}
                                                    error={errorEnable.otherStudy}
                                                    helperText={errorEnable.otherStudy && errorText}
                                                />
                                            </Grid>
                                        </Grid>
                                        {(saveEnable || !editHide) && !fieldsDisable &&
                                            <Grid xs={12} sm={12} item>
                                                <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
                                                    {editHide ? "Save" : !fieldsDisable && "Update"}
                                                </Button>
                                            </Grid>
                                        }
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card >
                }
            </Grid >
        </Modal >
    );
}

export default WorkProfile