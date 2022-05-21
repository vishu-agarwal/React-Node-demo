import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelperRoutesList } from './RoutesList'; // Route list
import { ClientRoutesList } from './RoutesList'; // Route list
import Loader from '../components/layouts/LoadingFile';
import HiringProcess from '../components/Homepage/HiringProcess';
const ProtectedRoutes = ({ role }) => (

        <Suspense
            fallback={<Loader />}
        >
            {role === "C" ?
                ClientRoutesList.map(({ element: Component, path, exact }) => (
                    // <Route
                    //     path={`/${path}`}
                    //     key={path}
                    //     exact={exact}
                    // >
                    //     <Component />
                    // </Route>
                    Temp(role, Component)
                ))
          
                :
                role === "H" &&
                    HelperRoutesList.map(({ element: Component, path, exact }) => (
                        // <Route
                        //     path={`/${path}`}
                        //     key={path}
                        //     exact={exact}
                        // >
                        //     <Component />
                        // </Route>
                        Temp(role, Component)
                    ))
                    // :
                    // <Route
                    //     exact
                    //     path={`/home`}
                    // >
                    //     <HiringProcess />
                    // </Route>

            }
        </Suspense>
    
);

const Temp = ({ role, children }) => {

    const userRole = localStorage.getItem('role')

    if (role.toLowerCase() === userRole.charAt(0).toLowerCase()) {
        return (
            <>{children}</>
        )
    }
    else if (userRole === "Client")
    {
        
        }
}

export default ProtectedRoutes;