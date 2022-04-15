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
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Component } from 'react';

function App() {
  const isAuth = useSelector(state=> state.loginStore.isAuth)
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/role" element={!isAuth && <Content />} />
          <Route path="/login/:role" element={!isAuth && <Login />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/helperProfile" element={<HelperProfile />} />
        </Routes>
      </BrowserRouter>
      
      
      <Dashboard />
      <CardJS />
{/*       
      <ClientProfile />
      <HelperProfile /> */}

    </div>
  );
}

export default App;
