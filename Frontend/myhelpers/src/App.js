//main file
import './App.css';
import Header from "./components/layouts/Header"
import Content from "./components/LoginFiles/Content"
import ClientProfile from './components/ProfileFiles/ClientProfile';

import Login from './components/LoginFiles/login';


import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import bgimg from "./background1.jpg";
import DisplayData from './components/DisplayDataPages/DisplayData';
import ViewProfileDetail from './components/DisplayDataPages/ViewProfileDetail';
import ViewClientProfile from './components/DisplayDataPages/ViewClientProfile';
import HomePage from './components/Homepage/HomePage';
import Profile from './components/ProfileFiles/ClientProfile';
import Footer from './components/layouts/Footer';
import PageNotFound from './components/layouts/PageNotFound';
import HiringProcess from './components/Homepage/HiringProcess';

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

