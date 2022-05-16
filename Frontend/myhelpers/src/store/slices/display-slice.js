import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    displayData: [],
    saveUser: [],
    hireUser:[],
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
export const fetchSaveUserThunk = createAsyncThunk("displayAll/fetchSaveUserThunk", async (arg) => {
    try {

        const fetchRes = await axios.get(`/myhelpers/fetchSaveUser/C106`)

        console.log("save Response:: ", fetchRes)

        return fetchRes

    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const searchThunk = createAsyncThunk("displayAll/searchThunk", async (arg) => {
    try {
        // console.log(searchText)
        const fetchRes = await axios.get(`/myhelpers/search?field=${arg.workSearch}&searchValue=${arg.filterWork}`)

        console.log("Fwtch Response:: ", fetchRes)

        return fetchRes

    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const sortThunk = createAsyncThunk("displayAll/sortThunk", async (arg) => {
    try {
        // console.log(searchText)
        const fetchRes = await axios.get(`/myhelpers/sort?field=${arg.field}&sortValue=${arg.sort}`)

        console.log("Fwtch Response:: ", fetchRes)

        return fetchRes

    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const saveThunk = createAsyncThunk("displayAll/saveThunk", async (arg) => {
    const data = {
        user_id : arg
    }
    
    const fetchRes = await axios.post(`/myhelpers/saveUser/C106`, data)
    
    return fetchRes
})
// export const hireUserThunk = createAsyncThunk("displayAll/hireUserThunk", async (arg) => {
//     const data = {
//         user_id: arg
//     }
//     console.log(arg);
//     const fetchRes = await axios.post(`/myhelpers/hireUser/C106`, data)
//     console.log(fetchRes)
//     return fetchRes
// })
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
        //search result
        [searchThunk.pending]: (state, action) => {
            state.loading = true
        },
        [searchThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.displayData = action.payload.data
            // console.log(state.displayData)
        },
        [searchThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            state.error = error.error.message
        },
        //sort result
        [sortThunk.pending]: (state, action) => {
            state.loading = true
        },
        [sortThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.displayData = action.payload.data
            // console.log(state.displayData)
        },
        [sortThunk.rejected]: (state, error) => {
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
            // state.saveUser = action.payload.data
            // console.log(state.displayData)
        },
        [saveThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            state.error = error.error.message
        },
        //fetch saveUser
        [fetchSaveUserThunk.pending]: (state, action) => {
            state.loading = true
        },
        [fetchSaveUserThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.saveUser = action.payload.data.saveUser
            
            // console.log(state.saveUser)
        },
        [fetchSaveUserThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)
            state.error = error.error.message
        },
        // [hireUserThunk.pending]: (state, action) => {
        //     state.loading = true
        // },
        // [hireUserThunk.fulfilled]: (state, action) => {
        //     state.loading = false
        //     //  state.isAuth = true
        //     // state.saveUser = action.payload.data
        //     // console.log(state.displayData)
        // },
        // [hireUserThunk.rejected]: (state, error) => {
        //     state.loading = false
        //     // console.log("rejected::", error.error.message)
        //     state.error = error.error.message
        // },
    }
})

export const displayActions = displaySlice.actions
export default displaySlice.reducer