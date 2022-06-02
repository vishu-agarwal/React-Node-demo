//header file
import React from 'react'

//   mui

import CardContent from '@mui/material/CardContent';
import { Card, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import abc from '../allImages//client4img.jpg';
import { NavLink } from 'react-router-dom';

const Content = () => {
  
  return (
    <Container align="center" >
      <Card
        // variant="outlined"
        elevation={24}
        sx={{
          maxWidth: 600, minHeight: 350,

          borderWidth: 3,
          borderRadius: 6,
          
          backgroundImage: `url(${abc})`,
          backgroundRepeat: "no-repeat",
          // borderColor: "#163758",
          backgroundSize: "100%",
          // marginTop: 15
        }}>
        <CardContent>
          <Typography variant="h4"  fontSize='30px'> Login As ?</Typography>
          <div>
            <NavLink to="/login/Client" style={{ textDecoration: 'none' }}><Button variant="contained"
              style={{ marginTop: "35px", minHeight: '50px', backgroundColor: '#163758', fontSize: '18px' }}
              defaultValue='client' fullWidth sx={{ marginTop: 2 }}>
              I want to hire Helpers !
            </Button></NavLink>
          </div>
          <div>
            <NavLink to="/login/Helper" style={{ textDecoration: 'none' }}><Button variant="contained"
              style={{ minHeight: '50px', fontSize: '18px', backgroundColor: '#163758' }}
              defaultValue='helper' fullWidth sx={{ marginTop: 2 }}>
              I want to do Work !
            </Button></NavLink>
          </div>
        </CardContent>
      </Card>
    </Container >
  );
}

export default Content