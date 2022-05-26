// import React from 'react'
// import CardContent from '@mui/material/CardContent';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/material/styles';
// import { Card, Container, Grid, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import FormControl from '@mui/material/FormControl';

// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import Box from '@mui/material/Box';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Dialog from '@mui/material/Dialog';
// import RadioGroup from '@mui/material/RadioGroup';
// import Radio from '@mui/material/Radio';
// import FormControlLabel from '@mui/material/FormControlLabel';


// const AddField = (props) => {
//     return (
//         <React.Fragment key={props.val.index}>
//             <Grid xs={12} sm={4} item>
//                 <FormControl fullWidth>
//                     <InputLabel htmlFor="grouped-native-select">Working Category</InputLabel>
//                     <Select native defaultValue=""
//                         data-id={props.idx}
//                         id={props.category} label="Working Category">

//                         <option value={1}>Cook(2 Adult, 1 Child)</option>
//                         <option value={1}>Sweeping(1 BHK)</option>
//                         <option value={2}>Mopping(1 BHK)</option>
//                         <option value={2}>Laundary(2 Adult, 1 Child)</option>
//                         <option value={2}>Washroom Cleaning(1)</option>
//                         <option value={3}>Driver</option>
//                         <option value={4}>Japa Maid</option>
//                         <option value={4}>Vessel cleaning(3 people)</option>
//                         <option value={4}>Baby sitter</option>
//                         <option value={4}>Parent Care Taker(1 person)</option>
//                         <option value={4}>Store Helper</option>
//                         <option value={4}>Peon</option>
//                         <option value={4}>Lift Operator</option>
//                         <option value={4}>WatchMan(1 buiding)</option>
//                     </Select>
//                 </FormControl>
//             </Grid>
//             <Grid xs={12} sm={3.5} item>
//                 <FormControl fullWidth>
//                     <InputLabel htmlFor="grouped-native-select">Exprience</InputLabel>
//                     <Select native defaultValue="" label="Exprience"
//                         data-id={props.idx}
//                         id={props.exprience}
//                     >
//                         <option value={1}>Fresher(No Exprience)</option>
//                         <option value={1}>4-8 Months</option>
//                         <option value={1}>1 Year</option>
//                         <option value={2}>3 Years</option>
//                         <option value={2}>5 Years</option>
//                         <option value={2}>More than 5 Year</option>
//                     </Select>
//                 </FormControl>
//             </Grid>
//             <Grid xs={12} sm={3.5} item>
//                 <TextField

//                     required
//                     variant='outlined'
//                     placeholder='Rs.'
//                     // id="salary"
//                     label="Expected salary Range"
//                     fullWidth
//                     data-id={props.idx}
//                     id={props.salary}
//                 />
//             </Grid>
//             <Grid xs={12} sm={1} item>
//                 {/* <Button variant="contained" sx={{ marginTop: 1, marginLeft: 0.5 }} fullWidth onClick={addWorkHandler}>+</Button> */}
//                 {props.idx === 0 ? (
//                     <Button
//                         onClick={props.add}
//                         variant="contained" sx={{ marginTop: 1, marginLeft: 0.5 }} fullWidth
//                     >
//                         +
//                     </Button>
//                 ) : (
//                     <Button
//                         variant="contained" sx={{ marginTop: 1, marginLeft: 0.5 }} fullWidth
//                         onClick={() => props.delete(props.val)}
//                     >
//                         -
//                     </Button>
//                 )}
//             </Grid>
//         </React.Fragment>
//     )
// }

// export default AddField