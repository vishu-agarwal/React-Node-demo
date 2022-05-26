import {
    Route,
    Navigate

} from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

function PrivateRoutes({ children, isAuthenticated, ...rest }) {
    const { isAuth } = useSelector(state => state.loginStore)
    if (isAuth) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
    else return <Navigate to={'/'} replace={true} />    
}

export default PrivateRoutes;