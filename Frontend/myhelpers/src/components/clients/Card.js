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

const CardJS = () => {
 
    return (
        <>
            <Card sx={{
                maxWidth: 250, maxHeight: 170
            }} elevation={8}>
                <CardContent sx={{ padding: 1 }}>
                    <Grid container direction={'row'} spacing={0} >
                        <Grid item xs={11} sm={11}>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom align="left">
                                Name of person
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1} justifyContent="right" >

                            <Tooltip title="Save">
                                <BookmarkBorderIcon fontSize="small" />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} >
                        <Grid item xs={4} sm={5} paddingBottom={1}>
                            <CardMedia
                                component="img"
                                height="90%"
                                sx={{ width: "90%" }}
                                image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                                alt="Paella dish"
                            />

                            <Rating name="size-small" defaultValue={2} size="small"/>
                            {/* {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )} */}


                        </Grid>

                        <Grid item xs={8} sm={7} align="left">
                            <Typography variant="h5" component="div"></Typography>
                            <Typography gutterBottom sx={{ fontSize: 10 }} >
                                Mobile No : 7818925632
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 10 }}  >
                                Age : Age
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 10 }} >
                                Work category
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 10 }}  >
                                Experience : Experience
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 10 }}  >
                                Preferred Time : Preferred
                            </Typography>
                            <Button sx={{ float:"right",padding: 0,paddingTop:2, fontSize: 12 }} >View Details </Button>

                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CardJS