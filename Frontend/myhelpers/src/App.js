//main file
import './App.css';
import Header from "./components/layouts/Header"
// import Content from "./components/LoginFiles/Content"
// import ClientProfile from './components/ProfileFiles/ClientProfile';

// import Login from './components/LoginFiles/login';


import { useSelector } from 'react-redux'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'

import Profile from './components/ProfileFiles/ClientProfile';
import Footer from './components/layouts/Footer';
// import PageNotFound from './components/layouts/PageNotFound';
import About from './components/Homepage/AboutPage';

import { lazy, Suspense } from 'react';
import Loader from './components/layouts/LoadingFile';
import ProtectedRoutes from './RouteComponents/ProtectedRoutes'; //Authenticated routes
import PublicRoute from './RouteComponents/PublicRoutes';
import PrivateRoute from './RouteComponents/PrivateRoutes';

const RolePage = lazy(() => import('./components/LoginFiles/Content'));
const LoginPage = lazy(() => import('./components/LoginFiles/login'));
const HomePage = lazy(() => import('./components/Homepage/HomePage'));

// const ForgotPassword = lazy(() => import('components/ForgotPassword'));
// const NoFoundComponent = lazy(() => import('./components/layouts/PageNotFound'));

const publicRoutes = [
  {
    path: '/',
    Component: RolePage
  },
  {
    path: '/login/:role',
    Component: LoginPage
  },
  // {
  //   path: '/home/client',
  //   element: HomePage,
  // }
]

// element: lazy(() => import('./components/Homepage/HomePage')),
const protectedRoutes = [
  {
    path: '/Client/home',
    element: HomePage,
    exact: true,
    role: 'C'
  },
  {
    path: '/findHelper',
    element: lazy(() => import('./components/DisplayDataPages/DisplayData')),
    exact: true,
    role: 'C'
  },
  {
    path: '/viewHelperDetails/:rid',
    element: lazy(() => import('./components/DisplayDataPages/ViewProfileDetail')),
    exact: true,
    role: 'C'
  },
  {
    path: '/Helper/home',
    element: lazy(() => import('./components/Homepage/HiringProcess')),
    exact: true,
    role: 'H'
  },
  {
    path: 'viewClientDetails/:rid',
    element: lazy(() => import('./components/DisplayDataPages/ViewClientProfile')),
    exact: true,
    role: 'H'
  },
]

function App() {
  const { isAuth } = useSelector(state => state.loginStore)
  // console.log(isAuth)
  // const role = localStorage.getItem("role")

  const isToken = localStorage.getItem("logToken")

  // console.log("is authhhhhhh", isAuth, isToken)
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="xyz" aligm="center">
          <Suspense fallback={<Loader isLoad={true} />}>
            <Routes>
              {/* private route for both client and helper */}
              <Route path="/about" element={<About />} />
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
                  key={`public-${path}`}
                  element={
                    <PublicRoute
                      isAuthenticated={isToken}
                    >
                      <Component />
                    </PublicRoute>
                  }
                />
              ))}
              {protectedRoutes.map(({ path, element: Component, role }) => (
                <Route
                  key={`private-${path}`}
                  path={path}
                  element={
                    <PrivateRoute
                      isAuthenticated={isToken}
                    >
                      <ProtectedRoutes role={role}>
                        <Component />
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
    </BrowserRouter>
  );
}

export default App;

