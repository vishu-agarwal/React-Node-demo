import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    otpUser: '',
    otpMessage: "",
    isOtp: false,
    loadingOtp: false,
    otpError: ""
}
export const otpThunk = createAsyncThunk("otpLogin/otpThunk", async (arg) => {
    console.log("diapatch::", arg)
    try {
        const data = {
            email: arg.email,
        };
        console.log("data",data)
        const otpRes = await axios.post(`/myhelpers/otp/${arg.role}`,data)
        console.log("otpResponse :: ", otpRes)
        return otpRes
    }
    catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
const otpSlice = createSlice({
    name: 'otpLogin',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.otpError = ""
        },
        isOtpReducer(state) {
            state.isOtp = true
        },
        messageReducer(state) {
            state.otpMessage = ""
        },
    },
    extraReducers: {
        [otpThunk.pending]: (state, action) => {
            state.loadingOtp = true
        },
        [otpThunk.fulfilled]: (state, action) => {
            state.loadingOtp = false
            // console.log(action.payload.data.message)
            state.otpMessage = action.payload.data.message
            state.otpUser = action.payload.data.otp
        },
        [otpThunk.rejected]: (state, error) => {
            state.loadingOtp = false
            state.otpError = error.error.message
        },
    }
})
export const otpActions = otpSlice.actions
export default otpSlice.reducer