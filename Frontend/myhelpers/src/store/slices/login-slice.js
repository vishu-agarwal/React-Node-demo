import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    logUser: null,
    token: "",
    isAuth: false,
    loadingLogin: false,
    error: ""
}

const isToken = localStorage.getItem("logToken")
// console.log(isToken)
if (isToken) {
    initialState.isAuth = true
    initialState.token=isToken
}
export const loginThunk = createAsyncThunk("userLogin/loginThunk", async (arg) => {
    try {
        // console.log("diapatch::", arg)
        const data = {
            email: arg.email
        };
        // console.log(data)
        const loginRes = await axios.post(`/myhelpers/register/${arg.role}`, data)
        // localStorage.setItem("logToken", loginRes.data.token)
        // localStorage.setItem("r_id", loginRes.data.newUser.r_id)
        console.log("loginRes", loginRes)
        return loginRes
    }
    catch (error) {
        // console.log(error.response.data)
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
            state.logUser = null
            state.token = ""
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
        },
        [loginThunk.rejected]: (state, error) => {
            state.loadingLogin = false
            state.error = error.error.message
        },
    }
})
export const loginActions = loginSlice.actions
export default loginSlice.reducer