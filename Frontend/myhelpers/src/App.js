//main file
import './App.css';
import Header from "./components/layouts/Header"
import Content from "./components/LoginFiles/Content"
import ClientProfile from './components/ProfileFiles/ClientProfile';

import Login from './components/LoginFiles/login';


import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import DisplayData from './components/DisplayDataPages/DisplayData';
import ViewProfileDetail from './components/DisplayDataPages/ViewProfileDetail';
import ViewClientProfile from './components/DisplayDataPages/ViewClientProfile';
import HomePage from './components/Homepage/HomePage';
import Profile from './components/ProfileFiles/ClientProfile';
import Footer from './components/layouts/Footer';
import PageNotFound from './components/layouts/PageNotFound';
import HiringProcess from './components/Homepage/HiringProcess';

import { lazy, Suspense } from 'react';
import Loader from './components/layouts/LoadingFile';
import ProtectedRoutes from './RouteComponents/ProtectedRoutes'; //Authenticated routes
import PublicRoute from './RouteComponents/PublicRoutes';
import PrivateRoute from './RouteComponents/PrivateRoutes';

const RolePage = lazy(() => import('./components/LoginFiles/Content'));
const LoginPage = lazy(() => import('./components/LoginFiles/login'));
// const ForgotPassword = lazy(() => import('components/ForgotPassword'));
const NoFoundComponent = lazy(() => import('./components/layouts/PageNotFound'));


const publicRoutes = [
  {
    path: '/',
    Component: RolePage
  },
  {
    path: '/login/:role',
    Component: LoginPage
  },
]

const privateRoutes = [
  {
    path: '/login/:role',
    Component: LoginPage,
    role: 'C'
  },
]

function App() {
  const { isAuth } = useSelector(state => state.loginStore)
  // console.log(isAuth)
  // const role = localStorage.getItem("role")

  const isToken = localStorage.getItem("logToken")

  console.log("is authhhhhhh", isAuth, isToken)
  return (
    <div className="App">
      <Header />
      <div className="xyz" aligm="center">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* private route for both client and helper */}

            <Route path='/profile'
              element={
                <PrivateRoute
                  isAuthenticated={isToken}
                >
                  <Profile />
                </PrivateRoute>
              }
            >
            </Route>
            {publicRoutes.map(({ path, Component }) => (
              <Route path={path}
                element={
                  <PublicRoute
                    isAuthenticated={isToken}
                  >
                    <Component />
                  </PublicRoute>
                }
              />
            ))}
            {privateRoutes.map(({ path, Component, role }) => (
              <Route path={path}
                element={
                  <PrivateRoute
                    isAuthenticated={isToken}
                  >
                    <Component />
                    <ProtectedRoutes role={role} >
                    </ProtectedRoutes>
                  </PrivateRoute>
                }
              />
            ))}
            {/* <Route path='/'
              element={
                <PublicRoute

                  isAuthenticated={isToken}
                >
                  <RolePage />

                </PublicRoute>
              } >

            </Route>
            
              <Route path='/login/:role'
                element={
                  <PublicRoute

                    isAuthenticated={isToken}
                  >
                    <LoginPage />

                  </PublicRoute>
                } >

            </Route> */}


            {/* <Route path='/'
              element={
                <PrivateRoute

                  isAuthenticated={isToken}
                >
                  <ProtectedRoutes role={role} />
                </PrivateRoute>
              } >

            </Route> */}
            {/* <PublicRoute
            path="/"
            isAuthenticated={isToken}
          >
            <Suspense fallback={<Loader />}>
              <RolePage />
            </Suspense>
          </PublicRoute> */}
            {/* <PublicRoute
                path="/login/:role"
              isAuthenticated={isToken}
              >
                <LoginPage />
              </PublicRoute> */}

            {/* <PrivateRoute
                path="/profile"
              isAuthenticated={isToken}
              >
                <Profile />
            </PrivateRoute>
            <PrivateRoute
              path="/"
              isAuthenticated={isToken}
            >
              <ProtectedRoutes role={role} />
             </PrivateRoute> */}
            {/* <PrivateRoute
              path="/viewHelperDetails/:rid"
              isAuthenticated={isToken}
            >
              <ProtectedRoutes />
            </PrivateRoute>
            <PrivateRoute
              path="/hiringProcess"
              isAuthenticated={isToken}
            >
              <ProtectedRoutes />
            </PrivateRoute>
            <PrivateRoute
              path="/viewClientDetails/:rid"
              isAuthenticated={isToken}
            >
              <ProtectedRoutes />
            </PrivateRoute>
           */}
            {/* <Route path="*">
                <NoFoundComponent />
              </Route> */}
          </Routes>
        </Suspense>


      </div>
      <Footer />
    </div>
  );
}

export default App;

