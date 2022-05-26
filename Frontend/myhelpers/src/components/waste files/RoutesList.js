import { lazy } from 'react';

export const ClientRoutesList = [
    {
        path: 'home',
        element: lazy(() => import('../components/Homepage/HomePage')),
        exact: true
    },
    {
        path: 'findHelper',
        element: lazy(() => import('../components/DisplayDataPages/DisplayData')),
        exact: true
    },
    {
        path: 'viewHelperDetails/:rid',
        element: lazy(() => import('../components/DisplayDataPages/ViewProfileDetail')),
        exact: true
    },
   
];
export const HelperRoutesList = [
   
    {
        path: 'hiringProcess',
        element: lazy(() => import('../components/Homepage/HiringProcess')),
        exact: true
    },
    {
        path: 'viewClientDetails/:rid',
        element: lazy(() => import('../components/DisplayDataPages/ViewClientProfile')),
        exact: true
    },

];
