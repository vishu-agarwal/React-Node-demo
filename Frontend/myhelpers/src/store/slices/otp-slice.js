import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    otpUser: [],
    isOtp : false,
    loading: false,
    otpError: ""
}

export const otpThunk = createAsyncThunk("otpLogin/otpThunk", async (arg) => {
    console.log("diapatch::", arg)
    try {
        const data = {
            mob_num: arg.values.mobile_no,
            // password: arg.values.password,
        };
        console.log(data)
        const otpRes = await axios.post(`/myhelpers/otp/${arg.values.role}`, data)
        console.log("otpResponse :: ", otpRes)
        return otpRes

    }
    catch (error) {
        // console.log(error.response.data)
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
            state.loading = true
        },
        [otpThunk.fulfilled]: (state, action) => {
            state.loading = false
            state.otpUser = [action.payload.data.user]
        },
        [otpThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            state.otpError = error.error.message
        },

    }

})
export const otpActions = otpSlice.actions
export default otpSlice.reducer