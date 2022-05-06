import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CardJS from "./Card"
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllThunk, fetchSaveUserThunk, searchThunk } from '../../store/slices/display-slice';
import workProfileActions from '../../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const workSearchBy = [
    // { label: 'All' },
    { label: 'Work Category' },
    { label: 'Work Timing' },
    { label: 'Location' },
    { label: 'Name' },
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
    }, [workSearch])

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
            console.log("displayData :: ", displayData)


        }

    }, [displayData])
    useEffect(() => {

        if (saveUser.length !== 0) {
            console.log("saveUser ::", saveUser);
            // saveUser.map((val)=> values.r_id === val.user_id)
            // console.log("saveUser ::", saveUser.length !== 0 ? saveUser.map((val)=>console.log("H110"===val.user_id)):null);
        }
    }, [saveUser])

    const searchChange = (e) => {

        // e.preventDefault();
        console.log(workSearch, filterWork)
        const arg = {
            workSearch, filterWork
        }
        dispatch(searchThunk(arg))
    }

    // const [searchText, setSearchText] = useState('')
    return (
        <Grid container spacing={1} justifyContent="center" marginTop={5}>
            <Grid item xs={11} sm={11} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2.5}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={workSearchBy}
                            // defaultValue={workSearchBy[0]}
                            // getOptionLabel={(option) => option.label || ''}
                            // getOptionSelected={(option, value) => option.label === value.label}
                            onInputChange={(e, values) => {

                                // if (document.getElementById('er')) {
                                //     document.getElementById('er').value = "";
                                // }
                                setWorkSearch(values)

                                // console.log("set filter value :: ", filterWork)
                            }}
                            // onChange={(val) => setWorkSearch(val)}

                            renderInput={(params) => <TextField
                                {...params} label="Search By"
                                value={workSearch}
                            />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2.5}>
                        {

                            workSearch === "" ?
                                ""
                                :

                                workSearch === "Work Category" || workSearch === "Work Timing" ?

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"

                                        options={workSearch === "Work Category" ? filterCategory : workSearch === "Work Timing" ? filterTime : ['']}
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
                                        onChange={() => searchChange()}
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
                                            value={filterWork}
                                            onChange={(val) => setFilterWork(val.target.value)}
                                        />
                                        {/* </Grid>
                                           
                                            {/* </Grid>
                                        </Grid> */}
                                    </>

                        }
                    </Grid>
                    <Grid item xs={12} sm={0.5} marginTop={3}>
                        {workSearch !== "" &&
                            <InputAdornment position="end">
                                <SearchIcon onClick={(e) => searchChange(e)} />
                            </InputAdornment>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid margin={0} container direction="row" >

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
                            // hireStatus = hireUser.length !== 0 ? hireUser.map((val) => values.r_id === val.user_id).includes(true) ?  : false: false
                            hireStatus = hireUser.lenght !== 0 ? hireUser.filter(val => values.r_id === val.user_id).map((val) => val.status) : ''
                            // console.log("hireStatus::",hireStatus)
                        }
                        return <Grid item xs={12} sm={4} align="center" key={index}>

                            {/* 
                        // values.rating[0] !== undefined ? console.log("rates :: ",
                            //     values.rating[0].map((id) =>
                            //         id.rate
                            //     ).reduce((prev, curr) => prev + curr, 0)

                            // ) : ''
                        <Grid> {console.log(
                            values.rating[0].map((id) =>
                               console.log( id.user_id)
                            ).length
                        )
                        }</Grid> */},
                            <CardJS values={values} rates={rates} saveStatus={status} hireStatus={hireStatus} />
                        </Grid>
                    })
                }

            </Grid>
        </Grid >
    )
}

export default DisplayData