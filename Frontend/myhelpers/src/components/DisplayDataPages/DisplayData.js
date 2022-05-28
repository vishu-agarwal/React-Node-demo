import React from 'react'
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react';
import IconButton from "@mui/material/IconButton";
import CardJS from "../Card"
import { useSelector, useDispatch } from 'react-redux';
import { displayActions, fetchAllThunk, fetchSaveUserThunk, searchThunk, sortThunk } from '../../store/slices/display-slice';
import { workProfileActions } from '../../store/slices/work-slice'
import { useNavigate } from 'react-router-dom';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import Pagination from '@mui/material/Pagination';
import debounce from 'lodash.debounce';
import Typography from "@mui/material/Typography";
import Loading from '../Layouts/LoadingFile'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import TablePagination from '@mui/material/TablePagination';
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
    { label: 'Custom Night Shift (After 8 PM)' },
    { label: 'Night Shift (12 Hrs)' },
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

    let { displayData, saveUser, displayMessage, displayLoading, displayError } = useSelector((state) => ({ ...state.displayStore }))

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
            console.log("displayData :: ", displayData)
        }

    }, [displayData])
    useEffect(() => {

       
    }, [saveUser])

    const [sortField, setSortField] = useState('')
    const onSortChange = (sort, field) => {
        const arg = {
            sort, field
        }
        dispatch(sortThunk(arg))
        dispatch(fetchSaveUserThunk(rid))
    }
    const onSearchChange = (event, value) => {
        if (event.target.name === "searchText") {
            setFilterWork(event.target.value.toLowerCase())
            const arg = {
                workSearch,
                filterWork: event.target.value.toLowerCase()
            }
            const debouncedSave = debounce(() => (dispatch(searchThunk(arg))), 2000);
                // dispatch(fetchSaveUserThunk(rid))
           
            debouncedSave();
        }
        else {
            setFilterWork(value)
            const arg = {
                workSearch,
                filterWork: value
            }
            dispatch(searchThunk(arg))
            // dispatch(fetchSaveUserThunk(rid))
        }
    }
    //pagination states

    let cnt = 0;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                                setFilterWork("")
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
                                        options={workSearch === "Work Category" ? filterCategory : workSearch === "Work Timing" ?
                                            filterTime : workSearch === "Gender" ? filterGender : ['']}
                                        onInputChange={onSearchChange}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                id="er"
                                                label="Filter By"
                                                value={filterWork}
                                            />
                                        }
                                    />
                                    :
                                    <TextField
                                        id="search-bar"
                                        name="searchText"
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
                                            color: "#163758"
                                        }}
                                        value={filterWork}
                                        onChange={onSearchChange}
                                    />

                        }
                    </Grid>

                    <Grid item xs={12} sm={3} display="flex" alignItems='center' >
                        <Grid container item display="flex" justifyContent='right' >
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
            </Grid>
            <Grid container direction="row" spacing={2}>
                {
                    displayData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((values, index) => {
                            rates = values.rating[0] !== undefined ?
                                values.rating[0]?.map((id) =>
                                    id.rate
                                ).reduce((prev, curr) => prev + curr, 0)
                                /
                                values.rating[0]?.map((id) =>
                                    id.user_id
                                ).length

                                : null;
                            status = saveUser.length
                                && !!saveUser.find((val) => values.r_id === val.user_id)
                            return <Grid item xs={12} sm={12} md={4} lg={3} key={index} >
                                <CardJS values={values} rates={rates} saveStatus={status} />
                            </Grid>
                        })
                }
            </Grid>

            <Grid item xs={12} sm={12} >
                
            <TablePagination
                size="small"
                rowsPerPageOptions={[8, 16, 24, 32, 40, 100]}
                component="div"
                count={displayData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
            
        </Grid >
    )
}

export default DisplayData