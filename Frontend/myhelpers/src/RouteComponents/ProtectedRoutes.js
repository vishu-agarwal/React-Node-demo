import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../components/Layouts/LoadingFile';
import HiringProcess from '../components/Homepage/HiringProcess';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ role, children }) => {
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