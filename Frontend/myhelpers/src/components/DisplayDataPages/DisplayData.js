import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CardJS from "../Card"
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllThunk, fetchSaveUserThunk, searchThunk, sortThunk } from '../../store/slices/display-slice';
import workProfileActions from '../../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
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

    const dispatch = useDispatch()
    // let { message, userProfile, error } = useSelector((state) => ({ ...state.profileStore }))
    let { displayData, saveUser, hireUser, message, error } = useSelector((state) => ({ ...state.displayStore }))

    let rates, status, hireStatus
    const [workSearch, setWorkSearch] = useState('')
    const [filterWork, setFilterWork] = useState('')

    useEffect(() => {
        dispatch(fetchAllThunk())
        dispatch(fetchSaveUserThunk())
    }, [])

    // console.log(workData[0].workDetails)
    useEffect(() => {
        // if (message.length !== 0) {
        //     alert(message)

        // }
        if (error.length !== 0) {
            // console.log(error)
            alert(error)
            dispatch(workProfileActions.errorReducer())
        }

    }, [message, error])
    
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

        // e.preventDefault();
        console.log(workSearch, filterWork)
        const arg = {
            workSearch, filterWork
        }
        dispatch(searchThunk(arg))
        dispatch(fetchSaveUserThunk())
    }
    const [sortField, setSortField] = useState('')
    const onSortChange = (sort, field) => {
        console.log(sort, field)
        const arg = {
            sort, field
        }
        dispatch(sortThunk(arg))
        dispatch(fetchSaveUserThunk())
    }
    return (
        <Grid container spacing={1} justifyContent="center" marginTop={5}>
            <Grid item xs={11} sm={11} >
                <Grid container spacing={2} marginBottom={2}>
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
                            renderInput={(params) => <TextField
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
                                        // getOptionLabel={(option) => option.label || ''}
                                        onInputChange={(e, value) => setFilterWork(value)}
                                        // filterOptions={(options, params) => {

                                        // const opt = options.filter(r => tags.filter(x => x === r).length === 0)
                                        // const filtered = filter(opt, params);
                                        // // Suggest the creation of a new value
                                        // if (params.inputValue !== '' && tags.filter(x => x === params.inputValue).length === 0) {
                                        //     filtered.push(params.inputValue)
                                        // }
                                        // return filtered
                                        // }}
                                        renderInput={(params) =>

                                            <TextField {...params}
                                                id="er"
                                                label="Filter By"
                                                value={filterWork}
                                            />
                                        }
                                    // onChange={() => searchChange()}
                                    />

                                    :
                                    <>
                                        {/* <Grid container>
                                            <Grid item xs={11} sm={11}> */}
                                        <TextField
                                            id="search-bar"
                                            className="text"

                                            label={` ${workSearch === "Location" ? "Enter Pincode" : workSearch === "Name" ? "Enter Name" : "Search Input"}`}
                                            variant="outlined"
                                            placeholder="Search..."
                                            fullWidth
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <InputAdornment position="end">
                                            //             <SearchIcon onClick={(e) => searchChange(e)} />
                                            //         </InputAdornment>
                                            //     )
                                            // }}
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
                                <SearchIcon cursor={"pointer"} sx={{colo:"#163758"}} onClick={(e) => searchChange(e)} />
                            </InputAdornment>}
                    </Grid>
                    <Grid item xs={0} sm={5}>
                    </Grid>

                    <Grid item xs={12} sm={2.5} display="flex" alignItems='center' >
                        {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortField}
                                height={2}
                                label="Sort By"
                                onChange={(event)=>setSortField(event.target.value) }
                            >
                                <MenuItem value="" size="small" >
                                    None
                                </MenuItem>
                                <MenuItem value="Age" >
                                    Age
                                    <IconButton aria-label="Example" size="small" sx={{ marginLeft: 7, padding: 0 }} onClick={()=>onSortChange("up","dob")} >
                                        <ArrowUpwardRoundedIcon />
                                    </IconButton>
                                    <IconButton aria-label="Example" size="small" sx={{ padding: 0 }} onClick={()=>onSortChange("down","dob")} >
                                        <ArrowDownwardRoundedIcon />
                                    </IconButton>
                                </MenuItem>
                                <MenuItem value="Experience" >Experience
                                    <IconButton aria-label="Example" size="small" sx={{ padding: 0, marginLeft: 1 }} onClick={()=>onSortChange("up","exp")} >
                                        <ArrowUpwardRoundedIcon />
                                    </IconButton>
                                    <IconButton aria-label="Example" size="small" sx={{ padding: 0 }} margin={0} onClick={()=>onSortChange("down","exp")} >
                                        <ArrowDownwardRoundedIcon />
                                    </IconButton>
                                </MenuItem>
                                <MenuItem value="Salary">Salary
                                    <IconButton aria-label="Example" size="small" sx={{ padding: 0, marginLeft: 5 }} onClick={()=>onSortChange("up","sal")} >
                                        <ArrowUpwardRoundedIcon />
                                    </IconButton>
                                    <IconButton aria-label="Example" size="small" sx={{ padding: 0 }} onClick={()=>onSortChange("down","sal")} >
                                        <ArrowDownwardRoundedIcon />
                                    </IconButton>
                                </MenuItem>
                            </Select>
                        </FormControl> */}
                        <Typography variant="h6"> Sort By : Age </Typography>
                        <IconButton aria-label="Example" size="medium" sx={{ color:"#163758"}} onClick={() => onSortChange("up", "dob")} >
                            <ArrowUpwardRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="Example" size="medium" sx={{ color: "#163758" }} onClick={() => onSortChange("down", "dob")} >
                            <ArrowDownwardRoundedIcon />
                        </IconButton>
                    </Grid>
                    {/* <Grid item xs={12} sm={5}  >
                        <Stack spacing={2} direction="row" justifyContent="end" paddingTop={1}>
                            <Pagination count={100} size="large" showFirstButton showLastButton />

                        </Stack>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid container direction="row" >

                {
                    // status = { saveUser.length !== 0 ? console.log(saveUser.user_id) ? true : false : false },
                    displayData.map((values, index) => {
                        {
                            rates = values.rating[0] !== undefined ?
                                values.rating[0].map((id) =>
                                    id.rate
                                ).reduce((prev, curr) => prev + curr, 0)
                                /
                                values.rating[0].map((id) =>
                                    id.user_id
                                ).length

                                : null

                            status = saveUser.length !== 0 ? saveUser.map((val) => values.r_id === val.user_id).includes(true) ? true : false : false

                            hireStatus = hireUser.lenght !== 0 ? hireUser.filter(val => values.r_id === val.user_id).map((val) => val.status) : ''

                        }
                        return <Grid item xs={12} sm={3} align="center" key={index} >
                            <CardJS values={values} rates={rates} saveStatus={status} hireStatus={hireStatus} />
                        </Grid>
                    })
                }
                {
                    // status = { saveUser.length !== 0 ? console.log(saveUser.user_id) ? true : false : false },
                    displayData.map((values, index) => {
                        {
                            rates = values.rating[0] !== undefined ?
                                values.rating[0].map((id) =>
                                    id.rate
                                ).reduce((prev, curr) => prev + curr, 0)
                                /
                                values.rating[0].map((id) =>
                                    id.user_id
                                ).length

                                : null

                            status = saveUser.length !== 0 ? saveUser.map((val) => values.r_id === val.user_id).includes(true) ? true : false : false

                            hireStatus = hireUser.lenght !== 0 ? hireUser.filter(val => values.r_id === val.user_id).map((val) => val.status) : ''

                        }
                        return <Grid item xs={12} sm={3} align="center" key={index} >
                            <CardJS values={values} rates={rates} saveStatus={status} hireStatus={hireStatus} />
                        </Grid>
                    })
                }
            </Grid>
        </Grid >
    )
}

export default DisplayData