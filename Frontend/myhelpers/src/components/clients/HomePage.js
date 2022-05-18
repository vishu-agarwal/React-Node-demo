import React from 'react'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate, useParams, Link } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate()
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
          <div>
            <img src={require("../homeImg.png")} height={"100%"} width={"100%"} />
          </div>
          <div style={{ height: "99.5%", width: "50%", background: "#000000", opacity: 0.5, position: "absolute", top: 0, left: "75%", transform: "translateX(-18%)", }}>
            <Typography sx={{ typography: { sm: 'h4', xs: 'body1' ,md:'h2' } }} style={{ fontWeight: 900, color: "white" }} marginLeft={"5%"} marginRight={"40%"} marginTop={"10%"} >
              FIND YOUR RIGHT HELPER EASILY
            </Typography>

            <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} style={{ fontWeight: 900, color: "white" }} marginLeft={"5%"} marginRight={"40%"} marginTop={"1%"} >
              Need skilled help service? Book with us and we will ensure you have safe, secure and responsible manpower.
            </Typography>
            <Button

              
              // color="#163758"
              variant="contained"
              onClick={() => navigate("/findHelper")}
              
              sx={{ my: 2, backgroundColor: '#e91e1e', display: 'block', marginLeft:"25%", marginRight: "20%",marginTop:"4%"  }}
            >
              Find Helpers
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} backgroundColor="white">
          <Grid container justifyContent="center" >
            <Grid item sm={11} xs={11} md={11}  >
              <Grid container spacing={2} marginBottom={3} >
                <Grid item sm={12} xs={12} md={12}  >
                  <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                    Your Ultimate Helpers Hiring Platform
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../cook.jpg")} style={{ cursor: "pointer"}} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Cook/Chef</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} sm={4} md={2} >
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }} >
                    <CardContent sx={{ padding: 0 }} cursor="pointer">
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../parent.png")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Parent Care Taker</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../wash.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Vessels Cleaning</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../watchman.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Watchman</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../laundary.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Laundary</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../driver.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Driver</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../cleaning.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >House Cleaning</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../japa1.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Japa Maid</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../elevator.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Lift Operator</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../store.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Store Helper</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../peon.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Peon</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../gardner.jpg")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Gardner</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} margin={2} >
          <Grid container justifyContent="center" >
            <Grid item sm={12} xs={12} md={12}>
              <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                How It Works ?
              </Typography>
            </Grid>
            <Grid item xs={11} md={10} sm={11} marginTop={"1%"}>
              <Grid container spacing={1} justifyContent="center" >
                <Grid item xs={6} sm={4} md={2}>
                  <Grid container>

                  <Grid item xs={12} sm={12} md={12} >
                      <img src={require("../search.png")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paddingTop={2} style={{ fontWeight: 900}}  variant="h5" color="#163758" >Search</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Grid container>

                    <Grid item xs={12} sm={12} md={12} >
                      <img src={require("../sortlist.png")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Sortlist</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Grid container>

                    <Grid item xs={12} sm={12} md={12} >
                      <img src={require("../relax1.png")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Hire</Typography>
                    </Grid>
                  </Grid>
                </Grid>
               
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage