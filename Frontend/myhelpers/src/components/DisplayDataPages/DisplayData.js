import React from 'react'
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CardJS from "../Card"
import { useSelector, useDispatch } from 'react-redux';
import { displayActions, fetchAllThunk, fetchSaveUserThunk, searchThunk, sortThunk } from '../../store/slices/display-slice';
import {workProfileActions} from '../../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import Pagination from '@mui/material/Pagination';

import Typography from "@mui/material/Typography";
import Loading from '../layouts/LoadingFile'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const workSearchBy = [
    // { label: 'All' },
    { label: 'Work Category' },
    { label: 'Work Timing' },
    { label: 'Location' },
    { label: 'Name' },
    { label: 'Gender' },
];

const filterCategory = [
    { label: 'Cook(2 Adult, 1 Child)' },
    { label: 'Sweeping(1 BHK)' },
    { label: 'Mopping(1 BHK)' },
    { label: 'Laundary(2 Adult, 1 Child)' },
    { label: 'Washroom Cleaning(1)' },
    { label: 'Driver' },
    { label: 'Japa Maid' },
    { label: 'Vessel cleaning(3 people)' },
    { label: 'Baby sitter' },
    { label: 'Parent Care Taker(1 person)' },
    { label: 'Store Helper' },
    { label: 'Peon' },
    { label: 'Lift Operator' },
    { label: 'WatchMan(1 buiding)' },
];

const filterTime = [
    { label: 'Live In (24 Hrs)' },
    { label: 'Full Day (12 Hrs)' },
    { label: 'Half Day (6 Hrs)' },
    { label: 'Custom (1-4 Hrs)' },
    { label: 'Night Shift (2-12 Hrs)' },
];
const filterGender = [
    { label: 'Male' },
    { label: 'Female' },
];
const DisplayData = () => {
    const navigate = useNavigate()
    const rid = localStorage.getItem("r_id")
    const role = localStorage.getItem("role")
    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    let { displayData, saveUser, hireUser, displayMessage, displayLoading, displayError } = useSelector((state) => ({ ...state.displayStore }))

    let rates, status, hireStatus
    const [workSearch, setWorkSearch] = useState('')
    const [filterWork, setFilterWork] = useState('')

    const [state, setState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, snackOpen } = state;
    const closeSnackbar = () => {
        setState({ ...state, snackOpen: false });
    };
    const [snackMessage, setSnackMessage] = useState('')
    const [snackColor, setSnackColor] = useState("info")

    useEffect(() => {
        dispatch(fetchAllThunk())
        dispatch(fetchSaveUserThunk(rid))
    }, [])
    useEffect(() => {
        if (displayMessage.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("info")
            setSnackMessage(displayMessage)
            dispatch(displayActions.messageReducer())
        }
        if (displayError.length !== 0) {
            setState({ snackOpen: true });
            setSnackColor("error")
            setSnackMessage(displayError)
            dispatch(displayActions.errorReducer())
        }
    }, [displayMessage, displayError])

    useEffect(() => {
        if (displayData.length !== 0) {
            // console.log("displayData :: ", displayData)
        }

    }, [displayData])
    useEffect(() => {

        if (saveUser.length !== 0) {
            console.log("saveUser ::", saveUser);
        }
    }, [saveUser])
  
    const searchChange = (e) => {
        const arg = {
            workSearch, filterWork
        }
        dispatch(searchThunk(arg))
        dispatch(fetchSaveUserThunk(rid))
    }
    const [sortField, setSortField] = useState('')
    const onSortChange = (sort, field) => {
        console.log(sort, field)
        const arg = {
            sort, field
        }
        dispatch(sortThunk(arg))
        dispatch(fetchSaveUserThunk(rid))
    }
    return (
        <Grid container spacing={1} justifyContent="center" marginTop={5}>
            {displayLoading && <Loading isLoad={true} />}
            <Grid item xs={11} sm={11} >
                <Grid container spacing={2} marginBottom={2}>
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        open={snackOpen}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}
                    >
                        <Alert onClose={closeSnackbar} severity={snackColor} sx={{ width: '100%' }}>
                            {snackMessage}
                        </Alert>
                    </Snackbar>
                    <Grid item xs={12} sm={2}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={workSearchBy}
                            sx={{
                                "& .MuiInputLabel-root": { color: '#163758' },//styles the label
                                "& .MuiOutlinedInput-root": {
                                    "& > fieldset": { borderColor: "#163758" },
                                },
                                color: "#163758"
                            }}
                            onInputChange={(e, values) => {
                                setWorkSearch(values)
                            }}
                            renderInput={(params) =>
                                <TextField
                                {...params} label="Search By"
                                value={workSearch}
                            />}
                        />
                    </Grid>
                    <Grid item xs={11} sm={2}>
                        {
                            workSearch === "" ?
                                ""
                                :
                                workSearch === "Work Category" || workSearch === "Work Timing" || workSearch === "Gender" ?
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{
                                            "& .MuiInputLabel-root": { color: '#163758' },//styles the label
                                            "& .MuiOutlinedInput-root": {
                                                "& > fieldset": { borderColor: "#163758" },
                                            },
                                            color: "#163758"
                                        }}
                                        options={workSearch === "Work Category" ? filterCategory : workSearch === "Work Timing" ? filterTime : workSearch === "Gender" ? filterGender : ['']}
                                        onInputChange={(e, value) => setFilterWork(value)}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                id="er"
                                                label="Filter By"
                                                value={filterWork}
                                            />
                                        }
                                    />
                                    :
                                    <>
                                        <TextField
                                            id="search-bar"
                                            className="text"
                                            label={` ${workSearch === "Location" ? "Enter Pincode" : workSearch === "Name" ? "Enter Name" : "Search Input"}`}
                                            variant="outlined"
                                            placeholder="Search..."
                                            fullWidth
                                            sx={{
                                                "& .MuiInputLabel-root": { color: '#163758' },//styles the label
                                                "& .MuiOutlinedInput-root": {
                                                    "& > fieldset": { borderColor: "#163758" },
                                                },
                                                marginTop: 2,
                                                color: "#163758"
                                            }}
                                            value={filterWork}
                                            onChange={(val) => setFilterWork(val.target.value)}
                                        />
                                    </>
                        }
                    </Grid>
                    <Grid item xs={1} sm={0.5} marginTop={3}>
                        {workSearch !== "" &&
                            <InputAdornment position="end">
                                <SearchIcon cursor={"pointer"} sx={{ colo: "#163758" }} onClick={(e) => searchChange(e)} />
                            </InputAdornment>}
                    </Grid>
                    <Grid item xs={0} sm={5}>
                    </Grid>
                    <Grid item xs={12} sm={2.5} display="flex" alignItems='center' >
                        <Typography variant="h6"> Sort By : Age </Typography>
                        <IconButton aria-label="Example" size="medium" sx={{ color: "#163758" }} onClick={() => onSortChange("up", "dob")} >
                            <ArrowUpwardRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="Example" size="medium" sx={{ color: "#163758" }} onClick={() => onSortChange("down", "dob")} >
                            <ArrowDownwardRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
                {
                    // status = { saveUser.length !== 0 ? console.log(saveUser.user_id) ? true : false : false },
                    displayData.map((values, index) => {
                        rates = values.rating[0] !== undefined ?
                            values.rating[0].map((id) =>
                                id.rate
                            ).reduce((prev, curr) => prev + curr, 0)
                            /
                            values.rating[0].map((id) =>
                                id.user_id
                            ).length

                            : null;

                        status = saveUser.length
                            && !!saveUser.find((val) => values.r_id === val.user_id) 
                        // helperAvatar = userAvatar.length && userAvatar.find((val) => values.r_id === val.r_id) 
                        // console.log(helperAvatar)
                            // hireStatus = hireUser.lenght !== 0 ? hireUser.filter(val => values.r_id === val.user_id).map((val) => val.status) : '';
                        return <Grid item xs={12} sm={4} md={3} key={index} >
                            <CardJS values={values} rates={rates} saveStatus={status} hireStatus={hireStatus} />
                        </Grid>
                    })
                }
            </Grid>
        </Grid >
    )
}

export default DisplayData