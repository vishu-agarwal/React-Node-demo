import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    displayData: [],
    saveUser:[],
    message: '',
    loading: false,
    error: ""
}

export const fetchAllThunk = createAsyncThunk("displayAll/fetchAllThunk", async (arg) => {
    try {

        const fetchRes = await axios.get(`/myhelpers/fetchAllData/Client`)

        // console.log("Fwtch Response:: ", fetchRes)
        
        return fetchRes

    } catch (error) {
        throw new Error(error.response.data)
    }
})

export const saveThunk = createAsyncThunk("displayAll/saveThunk", async (arg) => {
    const data = {
        user_id : arg
    }
    const fetchRes = await axios.post(`myhelpers/saveUser/C106`, data)
    console.log(fetchRes)
    return fetchRes
})
const displaySlice = createSlice({
    name: 'displayAll',
    
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.error = ""
        },
      
    },
    extraReducers: {
        
        //fetchProfileData
        [fetchAllThunk.pending]: (state, action) => {
            state.loading = true
        },
        [fetchAllThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.displayData = action.payload.data
            // console.log(state.displayData)
        },
        [fetchAllThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            state.error = error.error.message
        },
        //saveUser
        [saveThunk.pending]: (state, action) => {
            state.loading = true
        },
        [saveThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.saveUser = action.payload.data
            // console.log(state.displayData)
        },
        [saveThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            state.error = error.error.message
        },
    }
})

export const displayActions = displaySlice.actions
export default displaySlice.reducer