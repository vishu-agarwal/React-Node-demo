import {  configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/login-slice';
import profileReducer from './slices/profile-slice'
const store = configureStore({
    reducer: {
        loginStore: loginReducer,
        c_profile: profileReducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export default store;