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
    try {
        const data = {
            email: arg.email,
        };
        const otpRes = await axios.post(`/myhelpers/otp/${arg.role}`,data)
        return otpRes
    }
    catch (error) {
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
        isOtpReducer(state, action) {
            state.isOtp = action.payload
        },
        messageReducer(state) {
            state.otpMessage = ""
        },
        countCompleteReducer(state) {
            state.otpUser=''
        }
    },
    extraReducers: {
        [otpThunk.pending]: (state, action) => {
            state.loadingOtp = true
        },
        [otpThunk.fulfilled]: (state, action) => {
            state.loadingOtp = false
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