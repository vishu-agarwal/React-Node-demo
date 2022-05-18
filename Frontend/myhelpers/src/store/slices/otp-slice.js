import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    otpUser: '',
    message: "",
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
    },
    extraReducers: {
        [otpThunk.pending]: (state, action) => {
            state.loadingOtp = true
        },
        [otpThunk.fulfilled]: (state, action) => {
            state.loadingOtp = false
            // console.log(action.payload.data.message)
            state.message = action.payload.data.message
            state.otpUser = action.payload.data.otp
        },
        [otpThunk.rejected]: (state, error) => {
            state.loadingOtp = false
            // console.log("rejected::", error.error.message)
            state.otpError = error.error.message
        },

    }

})
export const otpActions = otpSlice.actions
export default otpSlice.reducer