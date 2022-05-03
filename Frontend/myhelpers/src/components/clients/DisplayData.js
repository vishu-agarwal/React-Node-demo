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
import { fetchAllThunk, fetchSaveUserThunk } from '../../store/slices/display-slice';
import workProfileActions from '../../store/slices/work-slice'
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const workSearchBy = [
    { label: 'All' },
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
    let { displayData, saveUser, message, error } = useSelector((state) => ({ ...state.displayStore }))

    // const [values,message, setValues] = useState({
    //     name: '',
    //     porf_mbl: '',
    //     age: '',
    //     work: '',
    //     experience: '',
    //     time: '',
    // });
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
            console.log("displayData :: ", displayData)
            // let abc
            // let list =
            //     workData[0].workDetails.map((value, index) => {
            //         return value.category.split("(")[0] + ", "
            //     })

            // setValues({
            //     porf_mbl: workData[0].profession_mbl,
            //     time: workData[0].workTime,
            //     work: list,
            //     name: userProfile[0].name,

            // })
            // console.log(list)

        }
        
    }, [displayData])
    useEffect(() => {
      
        if (saveUser.length !== 0) {
            console.log("saveUser ::", saveUser);
            // saveUser.map((val)=> values.r_id === val.user_id)
            // console.log("saveUser ::", saveUser.length !== 0 ? saveUser.map((val)=>console.log("H110"===val.user_id)):null);
        }
    }, [ saveUser])
    let rates, status
    const [workSearch, setWorkSearch] = useState('')
    const [filterWork, setFilterWork] = useState('')

    return (
        <Grid container spacing={1} justifyContent="center" marginTop={5}>
            <Grid item xs={10} sm={10} >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2.5}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={workSearchBy}
                            defaultValue={workSearchBy[0]}
                            getOptionLabel={(option) => option.label || ''}
                            // getOptionSelected={(option, value) => option.label === value.label}
                            onInputChange={(e, value) => {
                                setWorkSearch(value)
                                setFilterWork('')
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
                            workSearch === "Work Category" || workSearch === "Work Timing" ?

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"

                                    options={workSearch === "Work Category" ? filterCategory : workSearch === "Work Timing" ? filterTime : ['']}
                                    getOptionLabel={(option) => option.label || ''}
                                    onInputChange={(e, value) => { setFilterWork(value) }}
                                    renderInput={(params) =>
                                        // console.log("params :: ",params);
                                        <TextField {...params}
                                            label="Filter By"
                                            value={filterWork}
                                        />


                                    }
                                />
                                :
                                <TextField
                                    id="search-bar"
                                    className="text"
                                    onInput={(e) => {
                                        // setSearchQuery(e.target.value);
                                    }}
                                    label={` ${workSearch === "Location" ? "Enter Pincode" : workSearch === "Name" ? "Enter Name" : "Search Input"}`}
                                    variant="outlined"
                                    placeholder="Search..."
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />

                        }
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
                            
                                status = saveUser.length !== 0 ? saveUser.map((val)=> values.r_id === val.user_id).includes(true) ? true:false : false
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
                            <CardJS values={values} rates={rates} status={status} />
                        </Grid>
                    })
                }

            </Grid>
        </Grid>
    )
}

export default DisplayData