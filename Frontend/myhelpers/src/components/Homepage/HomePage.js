import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import "../../App.css"
import Box from '@mui/material/Box';
import ShortListed from '../Modals/ShortListed';
import HiredHelper from '../Modals/HiredHelper';
import WorkRequest from '../Modals/WorkRequests';
import { fetchUserProfileThunk } from '../../store/slices/profile-slice';

import { useSelector, useDispatch } from 'react-redux';
// const helperImages = [
//   { image: require("../cook.jpg") },
//   { image: require("../parent.png") },
//   { image: require("../watchman.jpg") },
//   { image: require("../laundary.jpg") },
//   { image: require("../wash.jpg") },
//   { image: require("../driver.jpg") },
//   { image: require("../japa1.jpg") },
//   { image: require("../elevator.jpg") },
//   { label: require("../store.jpg") },
//   { label: require("../peon.jpg") },
//   { label: require("../cleaning.jpg") },
//   { label: require("../gardner.jpg") },
// ];


const ScrollButton = () => {

  const [visible, setVisible] = useState(true)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 0) {
      setVisible(false)
    }
    else if (scrolled <= 0) {
      setVisible(true)
    }
  };

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });

  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <img
      src={`${require("../allImages/down1.gif")}`} onClick={scrollToBottom}
      // sx={{ display: 'block' }}
      style={{
        width: "10%",
        display: visible ? 'inline' : 'none', cursor: "pointer", animation: "movebtn 3s ease-in -out infinite",
        transition: "all .5s ease -in -out"
      }}
    />
  );
}
const HomePage = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  let { userProfile } = useSelector((state) => ({ ...state.profileStore }))
  let { logUser } = useSelector((state) => ({ ...state.loginStore }))

  const [openRequest, setOpenRequest] = useState(false)
  const [openShortlist, setOpenShortlist] = useState(false)
  const [openHired, setOpenHired] = useState(false)

  //   useEffect(() => {
  //     (!userProfile?.is_profile || !logUser?.is_profile)
  //     &&
  //       navigate("/profile")
  //     console.log("navigate")

  // }, [])


  const onRequestClick = () => {
    setOpenRequest(true)
  }
  const onShortlistClick = () => {

    setOpenShortlist(true)
  }
  const onHireClick = () => {

    setOpenHired(true)
  }
  const handleModelClose = () => {
    setOpenRequest(false);
    setOpenHired(false);
    setOpenShortlist(false);
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} sm={12} style={{ position: "relative" }}>
          <div>
            <img src={require("../allImages/homeImg.png")} height={"100%"} width={"100%"} />
          </div>
          <Grid container style={{ opacity: 1.0, position: "absolute", top: "60%" }} justifyContent="center">
            <ScrollButton />
          </Grid>
          <div style={{
            height: "99.5%", width: "35.3%", background: "#000000", opacity: 0.5,
            position: "absolute", top: 0, left: "70%", transform: "translateX(-15%)"
          }} align="center">
            {/* <Box mt={"15%"} > */}
            <Grid container item xs={12} sm={6} md={10} justifyContent="center">
              <Typography sx={{ typography: { sm: 'h6', xs: 'body2', md: 'h4', lg: 'h2' }, marginTop: { lg: "10%", sm: "5%" } }}
                style={{ fontWeight: 900, color: "white" }} >
                FIND YOUR RIGHT HELPER EASILY
              </Typography>
            </Grid>
            <Grid container item xs={12} sm={6} md={8} justifyContent="center">
              <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6', lg: "h5" }, marginTop: { lg: "2%", sm: "1%" } }}
                style={{ fontWeight: 900, color: "white" }}  >
                Need skilled help service? Book with us and we will ensure you have safe, secure and responsible manpower.
              </Typography>
            </Grid>
            {/* </Box> */}
            {/* <Box mt={"5%"} > */}
            <Button
              // color="#163758"

              variant="contained"
              onClick={() => navigate("/findHelper")}
              // size="large"
              sx={{
                width: "50%", height: { xs: "23%", sm: "15%", md: "10%", lg: "8%" },
                backgroundColor: '#e91e1e', display: 'block'
              }}
            >
              Find Helpers
            </Button>
            {/* </Box> */}
          </div>
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
                      <img src={require("../allImages/search.png")} onClick={() => navigate("/findHelper")} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Search</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Grid container>

                    <Grid item xs={12} sm={12} md={12} >
                      <img src={require("../allImages/sortlist.png")} onClick={onShortlistClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                      {openShortlist && <ShortListed click={handleModelClose} />}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Sortlist</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Grid container>

                    <Grid item xs={12} sm={12} md={12} >
                      <img src={require("../allImages/request.png")} onClick={onRequestClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                      {openRequest && <WorkRequest click={handleModelClose} />}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paddingTop={2} style={{ fontWeight: 900 }} variant="h5" color="#163758" >Send Request</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Grid container>

                    <Grid item xs={12} sm={12} md={12} >
                      <img src={require("../allImages/relax1.png")} onClick={onHireClick} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"100%"} />
                      {openHired && <HiredHelper click={handleModelClose} />}
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
        <Grid item xs={12} sm={12} md={12} margin={1} marginBottom={0} backgroundColor="white">
          <Grid container justifyContent="center" >
            <Grid item sm={11} xs={11} md={11}  >
              <Grid container spacing={2} marginBottom={3} >
                <Grid item sm={12} xs={12} md={12}  >
                  <Typography style={{ fontWeight: 900, color: "#163758" }} marginTop={1} variant="h3">
                    Your Ultimate Helpers Hiring Platform
                  </Typography>
                </Grid>
                {/* {
                  helperImages.map((val, index) => 
                    
                    <Grid item xs={6} sm={4} md={2} key = {index}>
                      <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                        <CardContent sx={{ padding: 0 }}>
                          <Grid container >
                            <Grid item xs={12} sm={12} md={12} >
                              <img src={val.image} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                              <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Cook/Chef</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                } */}
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/cook.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Cook/Chef</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2} >
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }} >
                    <CardContent sx={{ padding: 0 }} cursor="pointer">
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/parent.png")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Parent Care Taker</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2} >
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/wash.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Vessels Cleaning</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/watchman.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Watchman</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/laundary.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Laundary</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/driver.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Driver</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/cleaning.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >House Cleaning</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}  >
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/japa1.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Japa Maid</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/elevator.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Lift Operator</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/store.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Store Helper</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/peon.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                          <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >Peon</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={require("../allImages/gardner.jpg")} onClick={() => navigate("/findHelper")} style={{ cursor: "pointer" }} height={"100%"} width={"100%"} />
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

      </Grid>
    </div>
  )
}

export default HomePage;