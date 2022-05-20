
import { Fragment, useState } from 'react';
import React from 'react'

import TextField from '@mui/material/TextField';

import { Grid } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormHelperText from '@mui/material/FormHelperText';
import Loading from '../layouts/LoadingFile'

const DisplayWorkingFields = ({ fields, setFields, fieldsDisable, errorEnable, setErrorEnable }) => {

    const [errorText, setErrorText] = useState("");

    const handleChange = (e, index) => {

        const { name, value } = e.target
        const list = [...fields]
        if (name === "category") {
            list[index][name] = value
            setFields(list)
            if (list[index][name] === "") {
                setErrorEnable({ ...errorEnable, [name]: true })
                setErrorText("Please choose it!")
            }
            else {
                setErrorEnable({ ...errorEnable, [name]: false })
            }
        }
        if (name === "experience") {
            list[index][name] = value
            setFields(list)
            if (list[index][name] === "") {
                setErrorEnable({ ...errorEnable, [name]: true })
                setErrorText("Please choose it!")
            }
            else {
                setErrorEnable({ ...errorEnable, [name]: false })
            }
        }
        if (name === "salary") {
            list[index][name] = value
            setFields(list)
            if (/^[0-9]{1,6}$/.test(list[index][name])) {
                // console.log("correct!")
                setErrorEnable({ ...errorEnable, salary: false })

            }
            else {
                // console.log("wrong!")
                setErrorEnable({ ...errorEnable, salary: true })
                setErrorText("Please enter valid Amount!")
            }
        }

    };
    // console.log(fields)
    const handleRemove = (index) => {
        if (count === 5) {
            setDisable(false)
        }

        const list = [...fields];
        list.splice(index, 1);
        setFields(list);
        setCount(count - 1)
        // console.log("delete:: ", count - 1)
    };
    let [count, setCount] = useState(1)

    const handleAdd = () => {
        if (count === 4) {
            setDisable(true)
        }
        setFields([...fields, {

            category: "",
            experience: "",
            salary: "",
        }])
        setCount(count + 1)
        // console.log("add:: ", count + 1)
    }
    const [disable, setDisable] = useState(false)
    return (
        <Fragment >
            {
                fields.map((x, i) => {
                    console.log(x, "dropdown value")
                    return (
                        <Fragment key={i}>
                            <Grid xs={12} sm={4} item>
                                <FormControl fullWidth error={errorEnable.category}>
                                    <InputLabel htmlFor="grouped-native-select">Working Category</InputLabel>
                                    <Select native
                                        // disabled={fieldsDisable}
                                        inputProps={{
                                            readOnly: Boolean(fieldsDisable),
                                        }}
                                        name="category"
                                        value={x.category}
                                        onChange={e => handleChange(e, i)}
                                        label="Working Category">
                                        <option value=""></option>
                                        <option value="Cook(2 Adult, 1 Child)">Cook(2 Adult, 1 Child)</option>
                                        <option value="Sweeping(1 BHK)">Sweeping(1 BHK)</option>
                                        <option value="Mopping(1 BHK)">Mopping(1 BHK)</option>
                                        <option value="Laundary(2 Adult, 1 Child)">Laundary(2 Adult, 1 Child)</option>
                                        <option value="Washroom Cleaning(1)">Washroom Cleaning(1)</option>
                                        <option value="Driver">Driver</option>
                                        <option value="Japa Maid">Japa Maid</option>
                                        <option value="Vessel cleaning(3 people)">Vessel cleaning(3 people)</option>
                                        <option value="Baby sitter">Baby sitter</option>
                                        <option value="Parent Care Taker(1 person)">Parent Care Taker(1 person)</option>
                                        <option value="Store Helper">Store Helper</option>
                                        <option value="Peon">Peon</option>
                                        <option value="Lift Operator">Lift Operator</option>
                                        <option value="WatchMan(1 buiding)">WatchMan(1 buiding)</option>
                                    </Select>
                                    <FormHelperText>{errorEnable.category && errorText}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={3.5} item>
                                <FormControl fullWidth error={errorEnable.experience}>
                                    <InputLabel htmlFor="grouped-native-select">Experience</InputLabel>
                                    <Select native label="Experience"
                                        // disabled={fieldsDisable}
                                        inputProps={{
                                            readOnly: Boolean(fieldsDisable),
                                        }}
                                        name="experience"
                                        value={x.experience}
                                        onChange={e => handleChange(e, i)}
                                    >
                                        <option value=""></option>
                                        <option value="Fresher(No Exprience)">Fresher(No Experience)</option>
                                        <option value="4-8 Months">4-8 Months</option>
                                        <option value="1 Year">1 Year</option>
                                        <option value="3 Years">3 Years</option>
                                        <option value="5 Years">5 Years</option>
                                        <option value="More than 5 Year">More than 5 Year</option>
                                    </Select>
                                    <FormHelperText>{errorEnable.experience && errorText}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={3.5} item>
                                <TextField
                                    // disabled={fieldsDisable}
                                    inputProps={{
                                        readOnly: Boolean(fieldsDisable),
                                    }}
                                    required
                                    variant='outlined'
                                    placeholder='Rs.'
                                    name="salary"
                                    value={x.salary}
                                    onChange={e => handleChange(e, i)}

                                    error={errorEnable.salary}
                                    helperText={errorEnable.salary && errorText}
                                    label="Expected salary Range"
                                    fullWidth

                                />
                            </Grid>
                            {!fieldsDisable &&
                                < Grid xs={12} sm={1} item>
                                    
                                    {fields.length !== 1 &&
                                        <IconButton color="error" onClick={() => handleRemove(i)} component="span">
                                            
                                            <DeleteIcon fontSize="medium" />
                                            
                                        </IconButton>


                                    }
                                    {!disable &&
                                        fields.length - 1 === i &&
                                        <IconButton  color="primary" onClick={handleAdd} component="span">
                                            
                                            <AddIcon color="info" fontSize="large" />
                                            
                                        </IconButton>

                                    }
                                </Grid>}
                        </Fragment>
                    );
                })
            }

        </Fragment>
    )
}

export default DisplayWorkingFields