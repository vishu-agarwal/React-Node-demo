import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(skill, experience, price) {
    return { skill, experience, price };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 4.3),
    createData('Eclair', 262, 16.0),
];


const ViewProfileDetail = () => {
    //save icon state
    const [saveIcon, setSaveIcon] = useState(false)
    //save icon click event
    const onSaveClick = () => {
        setSaveIcon(!saveIcon)
    }

    return (
        <Card sx={{

            marginTop: 1,
            paddingLeft: 10,
            paddingRight: 10,
        }} elevation={0}>
            <CardContent >
                <Grid container direction={'row'} >

                    <Grid item xs={3} sm={3} align="center" paddingRight={4} >
                        <CardMedia
                            component="img"
                            height={200}
                            sx={{ width: "80%" }}
                            image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                            alt="Paella dish"
                        />
                        <Rating name="size-small" defaultValue={2} size="medium" />
                    </Grid>
                    <Grid item xs={8} sm={8} align="left" >
                        <Typography variant="h4" color="primary" component="div">
                            Radhe Radhe
                        </Typography>

                        <Typography marginLeft={5} marginRight={30} gutterBottom sx={{ fontSize: 12 }} >
                            My name is dfsdjfhsdgfhssfsgvfhs
                            dffvhsdfhsdfhsdhgjfgjhjfgh
                            sgdghffueytrfgwefb n fnsdbfnsdf
                            sdbsfghsdfghh
                        </Typography>

                        <Typography gutterBottom sx={{ fontSize: 12 }}  >
                            Age: 25 Years
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 12 }}  >
                            Gender : Female

                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 12 }}  >
                            Married: yes
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 12 }}  >
                            Physical Disability: yes
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 12 }}  >
                            Address : A-504 Vatika TownShip Dumbhal Fire Station ParvatPatiya Suurat 395010
                        </Typography>
                    </Grid>
                    <Grid item sm={1} xs={1} align="right">

                        <Tooltip title="Save">
                            {saveIcon ?
                                <BookmarkIcon fontSize="large" onClick={onSaveClick} />
                                :
                                <BookmarkBorderIcon fontSize="large" onClick={onSaveClick} />
                            }
                        </Tooltip>
                    </Grid>
                </Grid>
                    <Divider textAlign="left">   <Chip label="Work Details" /></Divider>
                <Grid container direction={'row'} >
                    <Grid item xs={4} sm={4} padding={0} align="left">
                        <Typography gutterBottom variant="caption" >
                            Mobile No :: 1234567890
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="caption" >
                            Preffered Time :: Full Day(12 Hrs)
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="caption" >
                            Known Languages :: Hindi,English,Gujarati,MArathi
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="caption" >
                            Education :: Not Done
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="caption" >
                            Other Education :: N/A
                        </Typography>
                        <br />
                        <Typography gutterBottom sx={{ fontSize: 12 }}  >
                            Email :abcdxyz@gmail.com
                        </Typography>

                        <Typography gutterBottom sx={{ fontSize: 12 }} >
                            Alternate Moibile : 7418529630
                        </Typography>


                    </Grid>


                    <Grid item xs={8} sm={8} align="left" >

                        
                        <TableContainer >
                            <Table sx={{ minWidth: "100%" }} aria-label="caption table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell>Skills</TableCell>
                                        <TableCell >Experience</TableCell>
                                        <TableCell >Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.skill}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                </Grid>

            </CardContent >
        </Card >
    )
}

export default ViewProfileDetail