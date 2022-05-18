//main file
import './App.css';
import Header from "./components/layouts/Header"
import Content from "./components/LoginFiles/Content"
import ClientProfile from './components/ProfileFiles/ClientProfile';
import HelperProfile from './components/helpers/HelperProfile';
import Login from './components/LoginFiles/login';
import CardJS from './components/clients/Card';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Component } from 'react';
import bgimg from "./background1.jpg";
import DisplayData from './components/clients/DisplayData';
import ViewProfileDetail from './components/clients/ViewProfileDetail';
import ViewClientProfile from './components/clients/ViewClientProfile';
import ShortListed from './components/ShortListed';
import HireUser from './components/HireUser';
import WorkRequest from './components/WorkRequests';
import HiredHelper from './components/HiredHelper';
import HomePage from './components/clients/HomePage';
import Profile from './components/ProfileFiles/ClientProfile';
import Footer from './components/layouts/Footer';
import PageNotFound from './components/layouts/PageNotFound';
import HiringProcess from './components/clients/HiringProcess';

function App() {
  const isAuth = true//useSelector(state => state.loginStore.isAuth)
  // console.log(isAuth)
  const role = localStorage.getItem("role")

  return (
    <div className="App">
      <Header />

      <div>

        <Routes>
          <Route path="/" element={!isAuth && <Content />} />

          <Route path={`/login/:role`} element={!isAuth && <Login />} />
          {/* {isAuth && <> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/hiringProcess" element={<HiringProcess />} />
            <Route path="/profile" element={isAuth ? <ClientProfile /> : "you are unauthorised"} />
          <Route path="/findHelper" element={isAuth || role==="Client" ?<DisplayData />: "you are unauthorised"} />
          <Route path="/viewClientDetails/:rid" element={isAuth ?<ViewClientProfile />: "you are unauthorised"} />
          <Route path="/viewHelperDetails/:rid" element={isAuth ?<ViewProfileDetail />: "you are unauthorised"} />
            {/* <Route path="/profileTemp" elemenmts={<Profile />} /> */}
            
            <Route path="/home" element={<HomePage />} />

          {/* <Route path="/helperProfile" element={isAuth && <HelperProfile />} /> */}
        {/* </>} */}
          <Route path="*" element={"page not found"} />
        </Routes>

      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

