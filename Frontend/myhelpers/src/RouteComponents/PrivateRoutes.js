import {
    Route,
    Navigate

} from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
function PrivateRoutes({ children, isAuthenticated, ...rest }) {

    const { isAuth } = useSelector(state => state.loginStore)

    // console.log(children)
    if (isAuth) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
    return <Navigate to={'/'} replace={true} />

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