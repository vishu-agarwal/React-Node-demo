import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './slices/login-slice';
import otpReducer from './slices/otp-slice'
import profileReducer from './slices/profile-slice'
import workReducer from './slices/work-slice'
import displayReducer from './slices/display-slice'
const store = configureStore({
    reducer: {
        loginStore: loginReducer,
        otpStore: otpReducer,
        profileStore: profileReducer,
        workProfileStore: workReducer,
        displayStore: displayReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export default store;