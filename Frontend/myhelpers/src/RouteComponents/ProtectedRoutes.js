import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../components/layouts/LoadingFile';
import HiringProcess from '../components/Homepage/HiringProcess';
import { useSelector } from 'react-redux';
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
    // const userRole = localStorage.getItem('role')
    const { role: userRole } = useSelector(state => state.loginStore)
    

    if (role.toLowerCase() === userRole.charAt(0).toLowerCase()) {
        return (
            <>{children}</>
        )
    }
    else if (userRole === "Client") {
        return (
            <Navigate
                to={'/Client/home'} replace={true}
            />
        )
    }
    else return (
        <Navigate
            to={'/Helper/home'} replace={true}
        />
    )
}

export default ProtectedRoutes;