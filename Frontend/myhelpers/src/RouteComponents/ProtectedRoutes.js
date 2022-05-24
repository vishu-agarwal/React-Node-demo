import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HelperRoutesList } from './RoutesList'; // Route list
import { ClientRoutesList } from './RoutesList'; // Route list
import Loader from '../components/layouts/LoadingFile';
import HiringProcess from '../components/Homepage/HiringProcess';
// const ProtectedRoutes = ({ role }) => (

//         <Suspense
//             fallback={<Loader />}
//         >
//             {role === "C" ?
//                 ClientRoutesList.map(({ element: Component, path, exact }) => (
//                     // <Route
//                     //     path={`/${path}`}
//                     //     key={path}
//                     //     exact={exact}
//                     // >
//                     //     <Component />
//                     // </Route>
//                     Temp(role, Component)
//                 ))

//                 :
//                 role === "H" &&
//                     HelperRoutesList.map(({ element: Component, path, exact }) => (
//                         // <Route
//                         //     path={`/${path}`}
//                         //     key={path}
//                         //     exact={exact}
//                         // >
//                         //     <Component />
//                         // </Route>
//                         Temp(role, Component)
//                     ))
//                     // :
//                     // <Route
//                     //     exact
//                     //     path={`/home`}
//                     // >
//                     //     <HiringProcess />
//                     // </Route>

//             }
//         </Suspense>

// );

const ProtectedRoutes = ({ role, children }) => {
console.log(children)
    const userRole = localStorage.getItem('role')

    if (role.toLowerCase() === userRole.charAt(0).toLowerCase()) {
        return (
            <>{children}</>
        )
    }
    else if (userRole === "Client") {
        return (
            <Navigate
                to={{
                    pathname: '/Client/home',

                }}
            />
        )
    }

    return (
        <Navigate
            to={{
                pathname: '/Helper/home',
            }}
        />
    )
}

export default ProtectedRoutes;