import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    user: [],
    token: "",
    isAuth: false,
    loadingLogin: false,
    error: ""
}

export const loginThunk = createAsyncThunk("userLogin/loginThunk", async (arg) => {
    try {
        console.log("diapatch::", arg)
        const data = {
            email: arg.email
        };
        console.log(data)
        const loginRes = await axios.post(`/myhelpers/register/${arg.role}`, data)

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
            state.error = ""
        },
        isAuthReducer(state) {
            state.isAuth = true
        },
        logoutReducer(state)
        {
            state.isAuth = false
            state.user = []
            state.token=""
        }
    },
    extraReducers: {
        [loginThunk.pending]: (state, action) => {
            state.loadingLogin = true
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.loadingLogin = false
            //  state.isAuth = true
            state.token = action.payload.data.token
            // console.log(state.token)
            state.user = [action.payload.data.newUser]
        },
        [loginThunk.rejected]: (state, error) => {
            state.loadingLogin = false
            // console.log("rejected::", error.error.message)
            state.error = error.error.message
        },

    }

})
export const loginActions = loginSlice.actions
export default loginSlice.reducer