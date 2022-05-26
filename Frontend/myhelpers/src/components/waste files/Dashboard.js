import React from 'react'

import CardContent from '@mui/material/CardContent';
import Badge from '@mui/material/Badge';
import { Card, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Avatar from '@mui/material/Avatar';

const Dashboard = () => {
  return (
    <>
      <Grid>
        <Card
          elevation={12}
          sx={{
            maxWidth: 1000, maxHeight: 8000,
            margin: '0 auto',
            padding: 0,
            paddingTop: 1,
            marginTop: 15
          }}>
          <CardContent sx={{ padding: 0, margin: 0 }}>
            <Grid xs={12} sx={{ backgroundColor: 'purple', height: 50 }} item>
              <Typography variant="h3" textAlign='center' color='white'>Profile</Typography>
            </Grid>
            <form>
              <Grid container spacing={1} justifyContent="center">
                <Grid xs={12} item sx={{ marginTop: 2 }} >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                      <BookmarkBorderIcon sx={{ height: 30, width: 30 }} />
                    }
                  >
                    {/* /static/images/avatar/2.jpg */}
                    <Avatar alt="Profile " src="" sx={{ color: 'black', borderColor: "black", width: 130, height: 130 }} >Photo</Avatar>
                  </Badge>
                </Grid>
                <Grid xs={12} sm={12} sx={{ marginTop: 2 }} item>
                  <Button>
                    View Aadhar Card
                  </Button>
                </Grid>
                <Grid xs={12} sm={2} item>
                  <Button style={{ borderRadius: 20 }} variant="contained" fullWidth color='secondary'>
                    I Want to Hire !
                  </Button>
                </Grid>
              </Grid>
              <Divider><Typography variant='h6' sx={{ textDecoration: "underline", fontFamily: 'cursive', color: 'gray' }} align='center'>Personal Details  </Typography></Divider>
              <Grid container direction={'row'} sx={{ margin: 2 }}>
                <Grid xs={4} sm={4} item>
                  <Typography variant='subtitle1' align='left'>Full Name : </Typography>
                </Grid>
                <Grid xs={8} sm={4} item>
                  <Typography variant='subtitle1' align='left'>Full Name : </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'> Email Address : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Email Address : </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'> Profession Mobile no : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'> Profession Mobile no : </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Alternate Mobile no : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Alternate Mobile no : </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Age : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Age  </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'> Marital Status </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>MArried/Unmarraied </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Gender : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Gender  </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Language : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Language  </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Education : </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Education  </Typography>
                </Grid>
              </Grid>
              <Divider><Typography variant='h6' sx={{ textDecoration: "underline", fontFamily: 'cursive', color: 'gray' }} align='center'>Address Details  </Typography></Divider>
              <Grid container direction={'row'} sx={{ margin: 2 }}>
                <Grid xs={2} item>
                  <Typography variant='subtitle1' align='left'>House/Flat no </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography variant='subtitle1' align='left'>House/Appartment Name </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography variant='subtitle1' align='left'>Area/Landmark </Typography>
                </Grid>
                <Grid xs={2} item>
                  <Typography variant='subtitle1' align='left'>House/Flat no </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography variant='subtitle1' align='left'>House/Appartment Name </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography variant='subtitle1' align='left'>Area/Landmark </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>City </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>State </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Pincode </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Surat </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>State </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Pincode </Typography>
                </Grid>
              </Grid>
              <Divider><Typography variant='h6' sx={{ textDecoration: "underline", fontFamily: 'cursive', color: 'gray' }} align='center'>Working Details  </Typography></Divider>
              <Grid container direction={'row'} sx={{ margin: 2 }}>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Available For </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Time </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginLeft: -2, marginRight: 2 }} item>
                  <Divider variant='middle' />
                  <Divider variant='middle' />
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Roles </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Rs. </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Experience </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Role </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Rs. </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Experience</Typography>
                </Grid>
              </Grid>
              <Divider><Typography variant='h6' sx={{ textDecoration: "underline", fontFamily: 'cursive', color: 'gray' }} align='center'>Other Details  </Typography></Divider>
              <Grid container direction={'row'} sx={{ margin: 2 }}>
                <Grid xs={4} item>
                  <Typography variant='subtitle1' align='left'>Remark </Typography>
                </Grid>
                <Grid xs={8} item>
                  <Typography variant='subtitle1' align='left'>Remark </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Dashboard