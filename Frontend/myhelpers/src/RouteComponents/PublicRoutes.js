import React from 'react';
import {
    Route,
    Navigate
} from 'react-router-dom';

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
    const role = localStorage.getItem("role") 
    if (!isAuthenticated)
    {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
    return <Navigate to={{pathname: `${role}/home`}} /> 
}

export default PublicRoutes
