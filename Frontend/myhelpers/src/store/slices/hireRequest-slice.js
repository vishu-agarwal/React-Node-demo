import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    hireRequestData: [],
    singleUser: [],
    message: '',
    loading: false,
    error: ""
}
//create work Details thunk
export const sendHireRequestThunk = createAsyncThunk("hireRequest/workProfileThunk", async (arg) => {
    
    try {
        const rid = localStorage.getItem("r_id")
      
        const data =
            [
                {
                    user_id: arg.user_id,
                    status: "pending!",
                    work: arg.work,
                    fromDate: arg.values.fromDate,
                    toDate: arg.values.toDate,
                    fromTime: arg.values.fromTime,
                    toTime: arg.values.toTime,
                    description: arg.values.description
                }
            ]

        // console.log("data", data)
        const workDataRes = await axios.post(`/myhelpers/sendHelperRequest/C101`, data)

        
        return workDataRes

    }
    catch (error) {
        // console.log("backend error: ",error.response.data)
        throw new Error(error.response.data)
    }
})
//fetch workDetails thunk
export const fetchHelperRequestsThunk = createAsyncThunk("hireRequest/fetchHelperRequestsThunk", async (arg) => {
    try {
        // console.log("abc")
        const hireRequest = await axios.get(`/myhelpers/fetchHireRequest/H110`)

        
        return hireRequest

    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
export const fetchSingleHireRequestThunk = createAsyncThunk("hireRequest/fetchHireRequestThunk", async (arg) => {
    try {
        // console.log("abc")
        const fetchHelperRes = await axios.get(`/myhelpers/fetchSingleHireRequest/C101/${arg}`)

        
        return fetchHelperRes

    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//update work details thunk
export const updateHireRequestThunk = createAsyncThunk("hireRequest/updateWorkThunk", async (arg) => {
    try {

        const rid = localStorage.getItem("r_id")

        const data =

        {
            user_id: arg.user_id,
            status: "pending!",
            work: arg.work,
            fromDate: arg.values.fromDate,
            toDate: arg.values.toDate,
            fromTime: arg.values.fromTime,
            toTime: arg.values.toTime,
            description: arg.values.description
        }


        const updateRes = await axios.put(`/myhelpers/updateHireRequest/C106`, data)

        
        return updateRes

    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data)
    }
})


const hireRequestSlice = createSlice({
    name: 'hireRequest',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.error = ""
        },
    },
    extraReducers: {
        //workProfileData
        [sendHireRequestThunk.pending]: (state, action) => {
            state.loading = true
        },
        [sendHireRequestThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            // state.message = action.payload.data
        },
        [sendHireRequestThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
        //fetchWorkData
        [fetchHelperRequestsThunk.pending]: (state, action) => {
            state.loading = true
            console.log("loading......")
        },
        [fetchHelperRequestsThunk.fulfilled]: (state, action) => {
            state.loading = false
            state.hireRequestData = action.payload.data
            console.log("payload::", action.payload.data)
        },
        [fetchHelperRequestsThunk.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        },

        //fetchWorkData
        [fetchSingleHireRequestThunk.pending]: (state, action) => {
            state.loading = true
        },
        [fetchSingleHireRequestThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.singleUser = action.payload.data[0]
            console.log("single userState", state.singleUser)

        },
        [fetchSingleHireRequestThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
        //updateWorkData
        [updateHireRequestThunk.pending]: (state, action) => {
            state.loading = true
        },
        [updateHireRequestThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.message = action.payload.data
        },
        [updateHireRequestThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
    }
})

export const hireRequestActions = hireRequestSlice.actions
export default hireRequestSlice.reducer