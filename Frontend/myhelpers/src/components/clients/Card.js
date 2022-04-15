import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

const CardJS = () => {

    return (
        <>     
        <Card sx={{
            maxWidth: 300, maxHeight: 200, margin: 10
        }} elevation={4}>
            <CardContent sx={{padding:1}}>
                    <Grid container direction={'row'} spacing={0}>
                        <Grid item xs={11} >
                        <Typography sx={{ fontSize: 15}} color="text.secondary" gutterBottom align="left">
                                Name of person
                            </Typography>
                        </Grid>
                        <Grid item xs={1}  justifyContent="right" >

                        <Tooltip title="Save">
                            <BookmarkBorderIcon fontSize="medium"/>
                        </Tooltip>
                        </Grid>
                    </Grid>
                <Grid container direction={'row'} >
                    <Grid item xs={6}>
                <CardMedia
                    component="img"
                    height="150"
                    sx={{ width: 100 }}
                    image="https://images.unsplash.com/photo-1599103892985-253246c5558e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                    alt="Paella dish"
                    />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" component="div"></Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align="left">
                            Person no
                        </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Work category
                    </Typography>
                    <Typography variant="body2">
                        exprience
                        <br />
                            Preferred Time  
                            <br />
                            Age
                        </Typography>
                    <div align="right" >
                        <Button sx={{padding:0, paddingTop: 1.5 }}>View Details </Button>
                    </div>
                    </Grid>

                </Grid>
            </CardContent>
            </Card>
            </>
    );
}

export default CardJS