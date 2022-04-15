import {  configureStore } from '@reduxjs/toolkit'
import loginReducer from './login-slice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        loginStore: loginReducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export default store;