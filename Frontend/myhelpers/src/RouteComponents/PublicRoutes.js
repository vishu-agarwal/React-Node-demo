import React from 'react';
import {
    Route,
    Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux'

// function PublicRoutes({ children, isAuthenticated, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={
//                 ({ location }) => (
//                     !isAuthenticated ? (
//                         children
//                     ) : (
//                         <Navigate
//                             to={{
//                                 pathname: '/home',
//                                 state: { from: location }
//                             }}
//                         />
//                     ))
//             }
//         />
//     );
// }
function PublicRoutes({ children, isAuthenticated, ...rest }) {
    
    // const role = localStorage.getItem("role")
    const { isAuth, role } = useSelector(state => state.loginStore)

    console.log('role::', role);
    if (!isAuth) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
    return <Navigate to={`/${role}/home`} replace={true} />
}

export default PublicRoutes
