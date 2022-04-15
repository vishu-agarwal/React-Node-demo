//header file
import React from 'react'

//   mui

import CardContent from '@mui/material/CardContent';


import { Card, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import abc from '../../components/client4img.jpg';
import { NavLink } from 'react-router-dom';

const Content = () => {
  
  return (
    <Container align="center" >
      <Card variant="outlined"
        sx={{
          maxWidth: 500, minHeight: 300,

          borderWidth: 1,
          borderRadius: 6,
          marginTop: 15,
          backgroundImage: `url(${abc})`,
          backgroundRepeat: "no-repeat",

          backgroundSize: "100%",
          marginTop: 15
        }}>
        <CardContent>
          <Typography variant="h4" fontWeight='1000' fontSize='30px'> Login As ?</Typography>
          <div>
            <NavLink to="/login/Client" style={{ textDecoration: 'none' }}><Button variant="contained" style={{ marginTop: '25px', minHeight: '50px', fontSize: '25px' }} defaultValue='client' color='error' fullWidth sx={{ marginTop: 2 }}>
              I want to hire Helpers !
            </Button></NavLink>
          </div>
          <div>
            <NavLink to="/login/Helper" style={{ textDecoration: 'none' }}><Button variant="contained"  style={{ minHeight: '50px', fontSize: '25px' }}color = "error"  defaultValue='helper' fullWidth sx={{ marginTop: 2 }}>
              I want to do Work !
            </Button></NavLink>
          </div>
        </CardContent>
      </Card>
    </Container >
  );
}

export default Content