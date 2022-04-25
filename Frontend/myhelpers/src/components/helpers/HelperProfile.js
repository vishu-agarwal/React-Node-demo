// //header file
// import * as React from 'react';

// //   mui
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


// const Input = styled('input')({
//     display: 'none',
// });
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };
// const language = [
//     'Hindi',
//     'English',
//     'Gujarati',
//     'Marthi',
//     'Marwadi',
//     'Bengali',
//     'Telugu',
//     'Tamil',
//     'Punjab',
//     'Malyalam',
//     'Kannad'
// ];
// const HelperProfile = (props) => {
//     // const classes = useStyles();

//     const [values, setValues] = React.useState({
//         mobile_no: '',
//         password: '',

//         showPassword: false,
//     });
//     const [lang, setlang] = React.useState([]);

//     const handleChange = (event) => {
//         const {
//             target: { value },
//         } = event;
//         setlang(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );
//     };
//     const addWorkHandler = () => {
        
//     }
//     return (
//         <React.Fragment>

//             <Grid >
//                 <Card
//                     sx={{
//                         maxWidth: 800, maxHeight: 8000,
//                         margin: '0 auto',
//                         paddingTop: 1,

//                         borderRadius: 10,
//                     }}>
//                     <CardContent>

//                         <Grid container direction={'row'} spacing={0}>

//                             <Grid item xs={10} >

//                             </Grid>
//                             <Grid item xs={2} justifyContent="right" >
//                                 <Button variant="contained" color="error" onClick={props.click}>Back</Button>
//                             </Grid>

//                         </Grid>

//                         <Typography variant="h4" component='div' fontSize='30px'>Professional Profile</Typography>
//                         <Typography color='orange' variant='body1' component='p'>Please fill up this form is necessary to move forward !</Typography>
//                         <form>
//                             {/* <Typography variant='subtitle1' marginLeft={1.5}  align='left' color='InfoText'>Personal Details : </Typography> */}
//                             <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Working Details : </Typography>
//                             <Grid container spacing={1}>

//                                 <Grid xs={12} sm={6} item>
//                                     <TextField
//                                         required
//                                         variant='outlined'
//                                         id="profession no"
//                                         label="Professional Mobile no."
//                                         fullWidth
//                                     />
//                                 </Grid>
//                                 <Grid xs={12} sm={6} item>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="grouped-native-select">Working Time</InputLabel>
//                                         <Select native defaultValue="" id="grouped-native-select" label="Working Time">

//                                             <option value={1}>Live In (24 Hrs)</option>
//                                             <option value={1}>Full Day (12 Hrs)</option>
//                                             <option value={2}>Half Day (6 Hrs)</option>

//                                             <option value={3}>Custom (1-4 Hrs)</option>
//                                             <option value={4}>Night Shift (2-12 Hrs)</option>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid xs={12} sm={4} item>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="grouped-native-select">Working Category</InputLabel>
//                                         <Select native defaultValue="" id="grouped-native-select" label="Working Category">

//                                             <option value={1}>Cook(2 Adult, 1 Child)</option>
//                                             <option value={1}>Sweeping(1 BHK)</option>
//                                             <option value={2}>Mopping(1 BHK)</option>
//                                             <option value={2}>Laundary(2 Adult, 1 Child)</option>
//                                             <option value={2}>Washroom Cleaning(1)</option>
//                                             <option value={3}>Driver</option>
//                                             <option value={4}>Japa Maid</option>
//                                             <option value={4}>Vessel cleaning(3 people)</option>
//                                             <option value={4}>Baby sitter</option>
//                                             <option value={4}>Parent Care Taker(1 person)</option>
//                                             <option value={4}>Store Helper</option>
//                                             <option value={4}>Peon</option>
//                                             <option value={4}>Lift Operator</option>
//                                             <option value={4}>WatchMan(1 buiding)</option>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid xs={12} sm={3.5} item>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="grouped-native-select">Exprience</InputLabel>
//                                         <Select native defaultValue="" id="grouped-native-select" label="Exprience">
//                                             <option value={1}>Fresher(No Exprience)</option>
//                                             <option value={1}>4-8 Months</option>
//                                             <option value={1}>1 Year</option>
//                                             <option value={2}>3 Years</option>
//                                             <option value={2}>5 Years</option>
//                                             <option value={2}>More than 5 Year</option>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid xs={12} sm={3.5} item>
//                                     <TextField
//                                         required
//                                         variant='outlined'
//                                         placeholder='Rs.'
//                                         id="salary"
//                                         label="Expected salary Range"
//                                         fullWidth
//                                     />
//                                 </Grid>
//                                 <Grid xs={12} sm={1} item>
//                                     <Button variant="contained" sx={{ marginTop: 1, marginLeft: 0.5 }} fullWidth onClick={addWorkHandler}>+</Button>
//                                 </Grid>
//                             </Grid>
//                             <Typography variant='subtitle1' marginLeft={1.5} sx={{ marginBottom: 1 }} align='left' color='InfoText'>Education Details : </Typography>
//                             <Grid container spacing={1}>
//                                 <Grid xs={12} sm={12} item>
//                                     <FormControl fullWidth>
//                                         <InputLabel id="demo-multiple-checkbox-label">Language Known</InputLabel>
//                                         <Select
//                                             labelId="demo-multiple-checkbox-label"
//                                             id="demo-multiple-checkbox"
//                                             multiple
//                                             value={lang}
//                                             onChange={handleChange}
//                                             input={<OutlinedInput label="TaLanguage Knowng" />}
//                                             renderValue={(selected) => selected.join(', ')}
//                                             MenuProps={MenuProps}
//                                         >
//                                             {language.map((name) => (
//                                                 <MenuItem key={name} value={name}>
//                                                     <Checkbox checked={lang.indexOf(name) > -1} />
//                                                     <ListItemText primary={name} />
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid xs={12} sm={6} item>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="grouped-native-select">Studied Upto</InputLabel>
//                                         <Select native defaultValue="" id="grouped-native-select" label="Studied Upto">
//                                             <option value=""> </option>
//                                             <option value={1}>Not Done</option>
//                                             <option value={1}>1st - 5th Class </option>
//                                             <option value={1}>6th - 9th Class</option>
//                                             <option value={2}>10th Class</option>
//                                             <option value={2}>12th Class</option>

//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid xs={12} sm={6} item>
//                                     <TextField
//                                         required
//                                         variant='outlined'
//                                         id="other"
//                                         label="Other Education"
//                                         fullWidth
//                                     />
//                                 </Grid>
//                             </Grid>
//                             <Grid xs={12} item>
//                                 <Button type='submit' variant="contained" color='primary' fullWidth sx={{ marginTop: 2 }}>
//                                     Save
//                                 </Button>
//                             </Grid>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </Grid>
//         </React.Fragment>
//     );
// }

// export default HelperProfile