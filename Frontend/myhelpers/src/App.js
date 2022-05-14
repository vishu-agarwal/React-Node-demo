//main file
import './App.css';
import Header from "./components/layouts/Header"
import Content from "./components/layouts/Content"
import ClientProfile from './components/clients/ClientProfile';
import HelperProfile from './components/helpers/HelperProfile';
import Login from './components/login';
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
function App() {
  const isAuth = useSelector(state => state.loginStore.isAuth)
  // console.log(isAuth)

  const CheckRoute = (props) => {
    // console.log(props)
  }

  return (
    <div className="App"
    // backgroundImage= {`url(${bgimg})`}
    // backgroundRepeat= "no-repeat"
    // backgroundSize = "100%" 

    >

      <Header />

      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!isAuth && <Content />} />
            <Route path={`/login/:role`} element={!isAuth && <Login />} />
            {/* <Route path="/clientProfile" element={isAuth && <ClientProfile />} /> */}
            <Route path="/clientProfile" element={<ClientProfile />} />
            <Route path="/display" element={<DisplayData />} />
            <Route path="/viewClientDetails/:rid" element={<ViewClientProfile />} />
            <Route path="/viewHelperDetails/:rid" element={<ViewProfileDetail />} />
            <Route path="/shortlist" element={<ShortListed />} />
            <Route path="/hireUsers" element={<HireUser />} />
            <Route path="/hiredHelper" element={<HiredHelper />} />
            <Route path="/workRequest" element={<WorkRequest />} />
            <Route path="/helperProfile" element={isAuth && <HelperProfile />} />
            <Route path="*" element={"error"} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
