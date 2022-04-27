import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from"./Card"

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

    const [workSearch, setWorkSearch] = useState('')
    const [filterWork, setFilterWork] = useState('')
    console.log(workSearch)
    console.log(filterWork)
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
                                console.log("set filter value :: ", filterWork)
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
            <Grid item xs={10} sm={10}>
                {/* card display in two or 3 rows */}
                <Card />
            </Grid>
        </Grid>

    )
}

export default DisplayData