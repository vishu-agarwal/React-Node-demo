import React from 'react';
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux'

function PublicRoutes({ children, isAuthenticated, ...rest }) {
    const { isAuth, role } = useSelector(state => state.loginStore)
    if (!isAuth) {
        return (
            <React.Fragment >
                {children}
            </React.Fragment>
        )
    }
   else return <Navigate to={`/${role}/home`} replace={true} />
}

export default PublicRoutes
