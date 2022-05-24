import {
    Route,
    Navigate

} from 'react-router-dom';
import React from 'react';
function PrivateRoutes({ children, isAuthenticated, ...rest }) {
    console.log(children)
    if (isAuthenticated) {
    
        return (
            <React.Fragment>
               
                {children}
            </React.Fragment>
        )
    }
    return <Navigate to={{ pathname: '/' }} />

    // return (
    //     <Route
    //         {...rest}
    //         render={
    //             ({ location }) => (
    //                 isAuthenticated
    //                     ? (
    //                         children
    //                     ) : (
    //                         <Navigate
    //                             to={{
    //                                 pathname: '/',
    //                                 state: { from: location }
    //                             }}
    //                         />
    //                     ))
    //         }
    //     />
    // );
}

export default PrivateRoutes;