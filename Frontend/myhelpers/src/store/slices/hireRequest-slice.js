import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    hireRequestData: [],
    singleUser: [],
    requestMessage: '',
    requestLoading: false,
    requestError: ""
}

//create work Details thunk
export const sendHireRequestThunk = createAsyncThunk("hireRequest/sendHireRequestThunk", async (arg) => {
    try {
        const work = arg.work.map(w => ({ work: w }));
        const data =
            [
                {
                    user_id: arg.user_id,
                    status: "pending!",
                    works: work,
                    from_date: arg.values.fromDate,
                    to_date: arg.values.toDate,
                    from_time: arg.values.fromTime,
                    to_time: arg.values.toTime,
                    description: arg.values.description
                }
            ]
        const workDataRes = await axios.post(`/myhelpers/sendHelperRequest/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            },
        })
        return workDataRes
    }
    catch (error) {
        throw new Error(error.response.data)
    }
})
//fetch workDetails thunk
export const fetchHelperRequestsThunk = createAsyncThunk("hireRequest/fetchHelperRequestsThunk", async (arg) => {
    try {
        const hireRequest = await axios.get(`/myhelpers/fetchHireRequest/${arg}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            },
        })
        return hireRequest
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const fetchSingleHireRequestThunk = createAsyncThunk("hireRequest/fetchSingleHireRequestThunk", async (arg) => {
    try {
        const fetchHelperRes = await axios.get(`/myhelpers/fetchSingleHireRequest/${arg.rid}/${arg.user_id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            },
        })
        return fetchHelperRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
//update work details thunk
export const updateHireRequestThunk = createAsyncThunk("hireRequest/updateHireRequestThunk", async (arg) => {
    try {
        const work = arg.work.map(w => ({ work: w }));
        const data = {
            user_id: arg.user_id,
            status: "pending!",
            works: work,
            from_date: arg.values.fromDate,
            to_date: arg.values.toDate,
            from_time: arg.values.fromTime,
            to_time: arg.values.toTime,
            description: arg.values.description
        }
        const updateRes = await axios.put(`/myhelpers/updateHireRequest/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            },
        })
        return updateRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
//accept request of client by helper
export const acceptRequestThunk = createAsyncThunk("hireRequest/acceptRequestThunk", async (arg) => {
    try {
        const response = await axios.patch(`/myhelpers/acceptRequest/${arg.rid}/${arg.user_id}`, { },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            },
        })
        return response
    } catch (error) {
        throw new Error(error.response.data)
    }
})
//reject request of client by helper
export const rejectRequestThunk = createAsyncThunk("hireRequest/rejectRequestThunk", async (arg) => {
    try {
        const response = await axios.patch(`/myhelpers/rejectRequest/${arg.rid}/${arg.user_id}`,{ }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            }
        })
        return response
    } catch (error) {
        throw new Error(error.response.data)
    }
})
//accept request of client by helper
export const deleteRequestThunk = createAsyncThunk("hireRequest/deleteRequestThunk", async (arg) => {
    try {
        const response = await axios.patch(`/myhelpers/deleteRequest/${arg.rid}/${arg.user_id}`,{ }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("logToken"),
            },
        })
        return response
    } catch (error) {
        throw new Error(error.response.data)
    }
})
const hireRequestSlice = createSlice({
    name: 'hireRequest',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.requestError = ""
        },
        messageReducer(state) {
            state.requestMessage = ""
        },
        emptySingleUser(state) {
            state.singleUser = []
        }
    },
    extraReducers: {
        //ceate or send request
        [sendHireRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [sendHireRequestThunk.fulfilled]: (state, action) => {
            state.singleUser = action.payload.data[0]
            state.requestMessage="Your request send!"
            state.requestLoading = false
        },
        [sendHireRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            state.requestError = error.error.message
        },
        //fetc helper request all 
        [fetchHelperRequestsThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [fetchHelperRequestsThunk.fulfilled]: (state, action) => {
            state.hireRequestData = action.payload.data
            state.requestLoading = false
        },
        [fetchHelperRequestsThunk.rejected]: (state, error) => {
            state.requestLoading = false
            state.requestError = error.error.message
        },
        //fetch single helper request
        [fetchSingleHireRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [fetchSingleHireRequestThunk.fulfilled]: (state, action) => {
            if (action.payload.data === "Please fill deatils for enquiry!") {
                state.requestMessage = action.payload.data
            }
            else {
                state.singleUser = action.payload.data[0]
            }
            state.requestLoading = false
        },
        [fetchSingleHireRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            state.requestError = error.error.message
        },
        //acceptRequest for work
        [acceptRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [acceptRequestThunk.fulfilled]: (state, action) => {
            state.requestMessage = action.payload.data
            state.requestLoading = false
        },
        [acceptRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            state.requestError = error.error.message
        },
        //reject request by helper
        [rejectRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [rejectRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            state.requestMessage = action.payload.data
        },
        [rejectRequestThunk.rejected]: (state, error) => {
            state.requestError = error.error.message
            state.requestLoading = false
        },
        //delete request by client
        [deleteRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [deleteRequestThunk.fulfilled]: (state, action) => {
            state.requestMessage = action.payload.data
            state.requestLoading = false
        },
        [deleteRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            state.requestError = error.error.message
        },
        //update hire request data of single helper by client
        [updateHireRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [updateHireRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            state.singleUser = action.payload.data[0]
            state.requestMessage = "Your request updated!"
        },
        [updateHireRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            state.requestError = error.error.message
        },
    }
})

export const hireRequestActions = hireRequestSlice.actions
export default hireRequestSlice.reducer