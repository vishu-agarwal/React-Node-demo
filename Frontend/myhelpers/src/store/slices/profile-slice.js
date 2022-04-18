import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    userProfile: [],
    
    loading: false,
    error: ""
}

export const profileThunk = createAsyncThunk("userProfile/profileThunk", async (arg) => {
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

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.error = ""
        },
        isAuthReducer(state) {
            state.isAuth = true
        },
    },
    extraReducers: {
        [profileThunk.pending]: (state, action) => {
            state.loading = true
        },
        [profileThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.user = [action.payload.data]
        },
        [profileThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },

    }

})
export const profileActions = profileSlice.actions
export default profileSlice.reducer