//main file
import './App.css';
import Header from "./components/layouts/Header"
import Content from "./components/LoginFiles/Content"
import ClientProfile from './components/ProfileFiles/ClientProfile';

import Login from './components/LoginFiles/login';


import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


import DisplayData from './components/DisplayDataPages/DisplayData';
import ViewProfileDetail from './components/DisplayDataPages/ViewProfileDetail';
import ViewClientProfile from './components/DisplayDataPages/ViewClientProfile';
import HomePage from './components/Homepage/HomePage';
import Profile from './components/ProfileFiles/ClientProfile';
import Footer from './components/layouts/Footer';
import PageNotFound from './components/layouts/PageNotFound';
import HiringProcess from './components/Homepage/HiringProcess';


function App() {
  const {isAuth} = useSelector(state => state.loginStore)
  // console.log(isAuth)
  const role = localStorage.getItem("role")

  return (
    <div className="App">
      <Header />

      <div className="xyz" aligm="center">

        <Routes>
          <Route path="/" element={!isAuth && <Content />  } />

          <Route path={`/login/:role`} element={!isAuth && <Login /> } />
          {/* {isAuth && <> */}
          <Route path="/home" element={isAuth && <HomePage /> } />
          <Route path="/hiringProcess" element={isAuth && <HiringProcess />}/>
          <Route path="/profile" element={isAuth && <ClientProfile /> } />
          <Route path="/findHelper" element={isAuth && <DisplayData /> } />
          <Route path="/viewClientDetails/:rid" element={isAuth && <ViewClientProfile /> } />
          <Route path="/viewHelperDetails/:rid" element={isAuth && <ViewProfileDetail /> } />
          {/* <Route path="/profileTemp" elemenmts={<Profile />} /> */}

          {/* <Route path="/home" element={<HomePage />} /> */}

          {/* <Route path="/helperProfile" element={isAuth && <HelperProfile />} /> */}
          {/* </>} */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;

