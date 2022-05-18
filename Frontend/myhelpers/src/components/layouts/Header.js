import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { NavLink, useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WorkRequest from '../WorkRequests'
import ShortListed from '../ShortListed';
import HiredHelper from '../HiredHelper';
import { loginActions } from '../../store/slices/login-slice'

import { useSelector, useDispatch } from 'react-redux';

function ScrollTop(props) {
    const { children, window } = props;

    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', backgroundColor:"#163758", bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};



const pages = ['Home', 'Find Helpers', 'About Us', 'Profile'];

const Header = (props) => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    // let { token } = useSelector((state) => ({ ...state.loginStore }))
    const role = "Client"//localStorage.getItem("role")
    // const {isAuth} = useSelector(state => ({ ...state.loginStore }))
const isAuth = true
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openRequest, setOpenRequest] = useState(false)
    const [openShortlist, setOpenShortlist] = useState(false)
    const [openHired, setOpenHired] = useState(false)
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const onRequestClick = () => {
        handleCloseUserMenu()
        setOpenRequest(true)   
    }
    const onShortlistClick = () => {
        handleCloseUserMenu()
        setOpenShortlist(true)
    }
    const onHireClick = () => {
        handleCloseUserMenu()
        setOpenHired(true)
    }
    const handleModelClose = () => {
        setOpenRequest(false);
        setOpenHired(false);
        setOpenShortlist(false);
    };
    console.log("request open :: ", openRequest)
    const onLogoutClick = () => {
        localStorage.removeItem("r_id")
        localStorage.removeItem("logToken")
        localStorage.removeItem("role")
        dispatch(loginActions.logoutReducer())
    }
    // const navigate = useNavigate()
    return (
        <>
            <AppBar position="fixed" sx={{ marginTop: 0, background: '#163758',color:"" }} >
                <Container maxWidth="xl">

                    <Toolbar disableGutters>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            fontFamily="cursive"
                        >
                            My Helpers
                        </Typography>
                        {isAuth &&
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {/* {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))} */}
                                    <MenuItem onClick={onRequestClick}>Home</MenuItem>
                                    {/* <MenuItem onClick={() => navigate("/findHelper")} >Hiring Process</MenuItem> */}
                                    {role==="Client"&&<MenuItem onClick = {() => navigate("/findHelper")}>Find Helpers</MenuItem>}
                                    <MenuItem onClick={() => { return (navigate("/profile"), handleCloseNavMenu) }}>Profile</MenuItem>
                                    
                                </Menu>
                            </Box>
                        }
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            fontFamily="fantasy"
                        >
                            My Helper
                        </Typography>

                        <Box sx={{
                            flexGrow: 50
                        }} />
                        {isAuth &&
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {/* {pages.map((page) => ( */}
                                <Button

                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Home
                                </Button>
                                {role === "Client" &&
                                    <Button

                                    onClick={() => navigate("/findHelper")}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Find Helpers
                                </Button>}
                                {/* <Button

                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Hiring Process
                                </Button> */}
                                <Button

                                    onClick={() => navigate("/profile")}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Profile
                                </Button>
                                {/* ))} */}
                            </Box>
                        }
                        {isAuth &&
                            <Box sx={{ flexGrow: 0 }}>
                                {/* <Tooltip title="My Profile"> */}
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="" />
                                </IconButton>
                                {/* </Tooltip> */}
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <MenuItem onClick={onRequestClick}>Requests</MenuItem>
                                    {role==="Client" && <MenuItem onClick={onShortlistClick} >Shortlisted</MenuItem>}
                                    <MenuItem onClick={onHireClick}>Hired</MenuItem>
                                    <MenuItem onClick={onLogoutClick}>Logout</MenuItem>


                                </Menu>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            {openRequest && <WorkRequest click={handleModelClose} />}
            {openShortlist && <ShortListed click={handleModelClose} />}
            {openHired && <HiredHelper click={handleModelClose} />}
            <Toolbar id="back-to-top-anchor" />
            {isAuth &&
                <ScrollTop {...props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>}
        </>
    );
};
export default Header;
