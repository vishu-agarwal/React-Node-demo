import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    user: [],
    isAuth: false,
    loading: false,
    error: null
}

export const loginThunk = createAsyncThunk("userLogin/loginThunk", async (arg) => {
   console.log(arg)
    try {
        const data = {
            mob_num: arg.values.mobile_no,
            password: arg.values.password,
        };
        console.log(data)
        const loginRes = await axios.post(`/myhelpers/register/${arg.values.role}`, data)
        // .then((res) => {
        //     console.log("responce " ,res);
        // })
        console.log("loginRes", loginRes)
        return loginRes
    }
    catch (error) {
        console.log(error)
    }
})
const loginSlice = createSlice({
    name: 'userLogin',
    initialState,//: initialState
    reducers: {
        logout(state, action) {
            state.isAuth = false

        },
    },
    extraReducers: {
        [loginThunk.pending]: (state, action) => {
            state.loading = true
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.loading = false
            console.log(action.payload.data)
            state.user = [action.payload.data]
        },
        [loginThunk.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

    }

})
export const loginActions = loginSlice.actions
export default loginSlice.reducer