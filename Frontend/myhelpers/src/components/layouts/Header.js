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
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WorkRequest from '../Modals/WorkRequests'
import ShortListed from '../Modals/ShortListed';
import HiredHelper from '../Modals/HiredHelper';
import { otpActions } from '../../store/slices/otp-slice'
import { loginActions } from '../../store/slices/login-slice'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfileThunk, profileActions } from '../../store/slices/profile-slice';
import { workProfileActions } from '../../store/slices/work-slice'
import Loading from './LoadingFile';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';

function ScrollTop(props) {
    const { children, window } = props
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
                sx={{ position: 'fixed', bottom: 70, right: 16 }}
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

const Header = (props) => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let { userProfile, profileLoading } = useSelector((state) => ({ ...state.profileStore }))
    const role = localStorage.getItem("role")
    const rid = localStorage.getItem("r_id")
    const [openModal, setOpenModel] = useState(false)
    const { isAuth } = useSelector(state => ({ ...state.loginStore }))
    const [anchorElNav, setAnchorElNav] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(false);
    const [openRequest, setOpenRequest] = useState(false)
    const [openShortlist, setOpenShortlist] = useState(false)
    const [openHired, setOpenHired] = useState(false)
    const [avatar, setAvatar] = useState(`${require("../allImages/profile.gif")}`)

    useEffect(() => {
        isAuth &&
            dispatch(fetchUserProfileThunk(rid))
    }, [rid])

    useEffect(() => {
        userProfile?.avatar && setAvatar("http://localhost:3001/" + userProfile?.avatar)
    }, [userProfile])

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
        setOpenModel(true)
        setOpenRequest(true)
    }
    const onShortlistClick = () => {
        handleCloseUserMenu()
        setOpenModel(true)
        setOpenShortlist(true)
    }
    const onHireClick = () => {
        setOpenModel(true)
        handleCloseUserMenu()
        setOpenHired(true)
    }
    const handleModelClose = () => {
        setOpenModel(false)
        setOpenRequest(false);
        setOpenHired(false);
        setOpenShortlist(false);
    };
    const onLogoutClick = () => {
        handleCloseUserMenu()
        localStorage.removeItem("r_id")
        localStorage.removeItem("logToken")
        localStorage.removeItem("role")
        dispatch(otpActions.isOtpReducer(false));
        dispatch(loginActions.logoutReducer())
        dispatch(profileActions.logoutEmpty())
        dispatch(workProfileActions.logoutEmpty())
        navigate("/")
    }

    return (
        <>
            <AppBar position="fixed" sx={{ marginTop: 0, background: '#163758', color: "" }} >
                <Container maxWidth="xl">
                    {profileLoading && <Loading isLoad={true} />}
                    <Toolbar disableGutters>
                        <Typography
                            fontSize={25}
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
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
                                    {role === "Client" &&
                                        <MenuItem onClick={() => navigate("/Client/home")}>
                                            <HomeIcon sx={{ marginRight: 1 }} />Home</MenuItem>}
                                    {role === "Client" && <MenuItem onClick={() => navigate("/findHelper")}>
                                        <PersonSearchIcon sx={{ marginRight: 1 }} />Find Helpers</MenuItem>}
                                    {role === "Helper" && <MenuItem onClick={() => navigate("/Helper/home")}>
                                        <HomeIcon sx={{ marginRight: 1 }} /> Home</MenuItem>}
                                    <MenuItem onClick={() => { return (navigate("/about"), handleCloseNavMenu) }}>
                                        <InfoIcon sx={{ marginRight: 1 }} /> About Us</MenuItem>
                                    <MenuItem onClick={() => { return (navigate("/profile"), handleCloseNavMenu) }}>
                                        <AccountCircleIcon sx={{ marginRight: 1 }} />Profile</MenuItem>
                                </Menu>
                            </Box>
                        }
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            fontFamily="cursive"
                        >
                            My Helpers
                        </Typography>

                        <Box sx={{
                            flexGrow: 50
                        }} />
                        {isAuth &&
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {role === "Client" &&
                                    <>
                                        <Button
                                            onClick={() => navigate("/Client/home")}
                                            sx={{ my: 2, color: 'white' }}>
                                            <HomeIcon sx={{ marginRight: 1 }} />Home
                                        </Button>
                                        <Button
                                            onClick={() => navigate("/findHelper")}
                                            sx={{ my: 2, color: 'white' }}>
                                            <PersonSearchIcon sx={{ marginRight: 1 }} /> Find Helpers
                                        </Button>
                                    </>
                                }
                                {role === "Helper" && <Button
                                    onClick={() => navigate("/Helper/home")}
                                    sx={{ my: 2, color: 'white' }}
                                >
                                    <HomeIcon sx={{ marginRight: 1 }} /> Home</Button>}
                                <Button
                                    onClick={() => navigate("/about")}
                                    sx={{ my: 2, color: 'white' }}>
                                    <GroupsIcon sx={{ marginRight: 1 }} /> About Us </Button>
                                <Button
                                    onClick={() => navigate("/profile")}
                                    sx={{ my: 2, color: 'white' }}>
                                    <AccountCircleIcon sx={{ marginRight: 1 }} /> Profile </Button>
                            </Box>
                        }
                        {isAuth &&
                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={`${avatar}`} />
                                </IconButton>
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
                                    <MenuItem onClick={onRequestClick}>
                                        <ListAltIcon sx={{ marginRight: 1 }} />Enquiry</MenuItem>
                                    {role === "Client" && <MenuItem onClick={onShortlistClick} >
                                        <BookmarkIcon sx={{ marginRight: 1 }} />Shortlisted</MenuItem>}
                                    <MenuItem onClick={onHireClick}>
                                        <HandshakeIcon sx={{ marginRight: 1 }} />Hired</MenuItem>
                                    <MenuItem onClick={onLogoutClick}>
                                        <ExitToAppIcon sx={{ marginRight: 1 }} /> Logout</MenuItem>
                                </Menu>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            {openRequest && <WorkRequest click={handleModelClose} open={openModal} />}
            {openShortlist && <ShortListed click={handleModelClose} open={openModal} />}
            {openHired && <HiredHelper click={handleModelClose} open={openModal} />}
            <Toolbar id="back-to-top-anchor" />
            {
                isAuth &&
                <ScrollTop {...props}>
                    <Fab sx={{ backgroundColor: "#163758", color: "white", borderColor: "red" }} size="medium" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            }
        </>
    );
};
export default Header;
