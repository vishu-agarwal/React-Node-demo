import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    user: [],
    isAuth: false,
    loading: false,
    error: ""
}

export const loginThunk = createAsyncThunk("userLogin/loginThunk", async (arg) => {
    // console.log("diapatch::", arg)
    try {
        const data = {
            mob_num: arg.values.mobile_no,
            password: arg.values.password,
        };
        //console.log(data)
        const loginRes = await axios.post(`/myhelpers/register/${arg.values.role}`, data)

        // console.log("loginRes", loginRes)
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
            state.error= ""
        },
    },
    extraReducers: {
        [loginThunk.pending]: (state, action) => {
            state.loading = true
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.loading = false
             state.isAuth = true
            state.user = [action.payload.data]
        },
        [loginThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            
            state.error = error.error.message
        },

    }

})
export const loginActions = loginSlice.actions
export default loginSlice.reducer