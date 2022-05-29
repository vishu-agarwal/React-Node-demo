import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import store from "../storeToolkitIndex"

const initialState = {
    logUser: [],
    token: "",
    isAuth: false,
    loadingLogin: false,
    error: "",
    role: "",
    r_id: ""
}

const isToken = localStorage.getItem("logToken")

if (isToken) {
    initialState.isAuth = true
    initialState.token = isToken
    initialState.role = localStorage.getItem("role")
    initialState.r_id = localStorage.getItem("r_id")
}

export const loginThunk = createAsyncThunk("userLogin/loginThunk", async (arg) => {
    try {
        const data = {
            email: arg.email
        };
        const loginRes = await axios.post(`/myhelpers/register/${arg.role}`, data)
        let role = 'Client';
        if (loginRes?.data?.removeOtp?.r_id?.charAt(0) === 'C') {
            role = 'Client'
        } else {
            role = 'Helper'
        }

        return { ...loginRes, role }
    }
    catch (error) {
        throw new Error(error.response.data)
    }
})
const loginSlice = createSlice({
    name: 'userLogin',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.error = ""
        },
        logoutReducer(state) {

            state.isAuth = false
            state.logUser = []
            state.token = ""
            state.r_id = ""
            state.role = ""
        },
    },
    extraReducers: {
        [loginThunk.pending]: (state, action) => {
            state.loadingLogin = true
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.loadingLogin = false
            state.isAuth = true
            state.token = action.payload.data.token
            state.logUser = action.payload.data.removeOtp
            state.role = action.payload.role
            state.r_id = action.payload.data.removeOtp.r_id

            localStorage.setItem("logToken", state.token)
            localStorage.setItem("r_id", state.r_id)
            localStorage.setItem("role", state.role)
        },
        [loginThunk.rejected]: (state, error) => {
            state.loadingLogin = false
            state.error = error.error.message
        },
    }
})

export const loginActions = loginSlice.actions
export default loginSlice.reducer