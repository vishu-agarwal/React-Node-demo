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
import { useSelector, useDispatch } from 'react-redux';
const helperImages = [
  { image: require("../allImages/cook.jpg"), text: "Cook/Chef" },
  { image: require("../allImages/parent.png"), text: "Parent Care Taker" },
  { image: require("../allImages/wash.jpg"), text: "Vessels Cleaning" },
  { image: require("../allImages/watchman.jpg"), text: "Watchman" },
  { image: require("../allImages/laundary.jpg"), text: "Laundary" },
  { image: require("../allImages/driver.jpg"), text: "Driver" },
  { image: require("../allImages/cleaning.jpg"), text: "House Cleaning" },
  { image: require("../allImages/japa1.jpg"), text: "Japa Maid" },
  { image: require("../allImages/elevator.jpg"), text: "Lift Operator" },
  { image: require("../allImages/store.jpg"), text: "Store Helper" },
  { image: require("../allImages/peon.jpg"), text: "Peon" },
  { image: require("../allImages/gardner.jpg"), text: "Gardner" },
];

const imageList = [
  { images: require("../allImages/search.png"), request: "search", text: "Search" },
  { images: require("../allImages/sortlist.png"), request: "sortlist", text: "Sortlist" },
  { images: require("../allImages/request.png"), request: "request", text: "See Request" },
  { images: require("../allImages/relax1.png"), request: "hire", text: "Hire" },
];
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
  const [openModal, setOpenModel] = useState(false)

  const onRequestClick = () => {
    setOpenModel(true)
    setOpenRequest(true)
  }
  const onShortlistClick = () => {
    setOpenModel(true)
    setOpenShortlist(true)
  }
  const onHireClick = () => {
    setOpenModel(true)
    setOpenHired(true)
  }
  const handleModelClose = () => {
    setOpenModel(false)
    setOpenRequest(false);
    setOpenHired(false);
    setOpenShortlist(false);
  };

  return (
    <div>
      <Grid container justifyContent="center" marginBottom={2}>
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
            <Grid container item xs={12} sm={6} md={10} justifyContent="center">
              <Typography sx={{ typography: { sm: 'h6', xs: 'body2', md: 'h4', lg: 'h3' }, marginTop: { lg: "15%", sm: "5%" } }}
                style={{ color: "white" }} >
                FIND YOUR RIGHT HELPER EASILY
              </Typography>
            </Grid>
            <Grid container item xs={12} sm={6} md={8} justifyContent="center">
              <Typography sx={{ typography: { sm: 'caption', xs: 'caption', md: 'h6', lg: "h6" }, marginTop: { lg: "5%", sm: "1%" } }}
                style={{ color: "white" }}  >
                Need skilled help service? Book with us and we will ensure you have safe, secure and responsible manpower.
              </Typography>
            </Grid>
            <Button
              variant="contained"
              onClick={() => navigate("/findHelper")}
              sx={{
                marginTop: { lg: "3%" },
                width: "50%", height: { xs: "23%", sm: "15%", md: "10%", lg: "8%" },
                backgroundColor: '#e91e1e', display: 'block'
              }}
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
                  <Typography style={{ color: "#163758" }} marginTop={1} fontSize="35px">
                    Your Ultimate Helpers Hiring Platform
                  </Typography>
                </Grid>
                {
                  helperImages.map((val, index) => {
                    return <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                      <Card elevation={12} sx={{ backgroundColor: "#a0bfdb" }}>
                        <CardContent sx={{ padding: 0 }}>
                          <Grid container >
                            <Grid item xs={12} sm={12} md={12} >
                              <img src={val.image} style={{ cursor: "pointer" }} onClick={() => navigate("/findHelper")} height={"100%"} width={"100%"} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                              <Typography sx={{ typography: { sm: 'body2', xs: 'caption', md: 'h6' } }} paddingTop={2} variant="h6" color="#ffffff" >{val.text}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  }
                  )
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} margin={2} marginBottom={5} >
          <Grid container justifyContent="center" >
            <Grid item sm={12} xs={12} md={12}>
              <Typography style={{ color: "#163758" }} marginTop={1} fontSize="35px">
                How It Works ?
              </Typography>
            </Grid>
            <Grid item xs={11} md={10} sm={11} marginTop={"1%"}>
              <Grid container spacing={1} justifyContent="center" >
                {
                  imageList.map((val) => {
                    const click = val.request === "search" ? () => navigate("/findHelper") : val.request === "sortlist" ?
                      onShortlistClick : val.request === "request" ? onRequestClick : val.request === "hire" && onHireClick
                    return <Grid item xs={6} sm={3} md={3} lg={2} key={`${val.images}`}>
                      <Grid container >
                        <Grid item xs={12} sm={12} md={12} >
                          <img src={val.images} onClick={click} style={{ borderRadius: "50%", cursor: "pointer" }} height={"100%"} width={"80%"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Typography paddingTop={2} variant="h5" color="#163758" >{val.text}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  }
                  )
                }
              </Grid>
              {openShortlist && <ShortListed click={handleModelClose} open={openModal} />}
              {openRequest && <WorkRequest click={handleModelClose} open={openModal} />}
              {openHired && <HiredHelper click={handleModelClose} open={openModal} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage;