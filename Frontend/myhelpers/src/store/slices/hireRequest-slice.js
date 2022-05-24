import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    hireRequestData: [],
    singleUser: [],
    requestMessage: '',
    requestLoading: false,
    requestError: ""
}

const varToken = localStorage.getItem("logToken");

//create work Details thunk
export const sendHireRequestThunk = createAsyncThunk("hireRequest/sendHireRequestThunk", async (arg) => {

    try {


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
        const workDataRes = await axios.post(`/myhelpers/sendHelperRequest/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })


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
        const hireRequest = await axios.get(`/myhelpers/fetchHireRequest/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        // console.log(hireRequest)
        return hireRequest
    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
export const fetchSingleHireRequestThunk = createAsyncThunk("hireRequest/fetchSingleHireRequestThunk", async (arg) => {
    try {
        // console.log("abc")
        const fetchHelperRes = await axios.get(`/myhelpers/fetchSingleHireRequest/${arg.rid}/${arg.user_id}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return fetchHelperRes
    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//update work details thunk
export const updateHireRequestThunk = createAsyncThunk("hireRequest/updateHireRequestThunk", async (arg) => {
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


        const updateRes = await axios.put(`/myhelpers/updateHireRequest/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return updateRes

    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//accept request of client by helper
export const acceptRequestThunk = createAsyncThunk("hireRequest/acceptRequestThunk", async (arg) => {
    try {
        // console.log("abc")
        const response = await axios.patch(`/myhelpers/acceptRequest/H102/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return response

    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//reject request of client by helper
export const rejectRequestThunk = createAsyncThunk("hireRequest/rejectRequestThunk", async (arg) => {
    try {
        // console.log("abc")
        const response = await axios.patch(`/myhelpers/rejectRequest/H103/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return response

    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//accept request of client by helper
export const deleteRequestThunk = createAsyncThunk("hireRequest/deleteRequestThunk", async (arg) => {
    try {
        // console.log("abc")
        const response = await axios.patch(`/myhelpers/deleteRequest/C101/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })


        return response

    } catch (error) {
        // console.log(error.response.data)
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
    },
    extraReducers: {
        //workProfileData
        [sendHireRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [sendHireRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            //  state.isAuth = true
            // state.message = action.payload.data
        },
        [sendHireRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            // console.log("rejected::", error.error.message)

            state.requestError = error.error.message
        },
        //fetc helper request all 
        [fetchHelperRequestsThunk.pending]: (state, action) => {
            state.requestLoading = true
            console.log("requestLoading......")
        },
        [fetchHelperRequestsThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            state.hireRequestData = action.payload.data
            console.log("payload::", action.payload.data)
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
            state.requestLoading = false
            //  state.isAuth = true
            if (action.payload.data === "Please fill deatils for enquiry!") {
                state.requestMessage = action.payload.data
            }
            else {
                state.singleUser = action.payload.data[0]
                console.log("single userState", state.singleUser)
            }
        },
        [fetchSingleHireRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            // console.log("rejected::", error.error.message)

            state.requestError = error.error.message
        },
        //acceptRequest for work
        [acceptRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [acceptRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            //  state.isAuth = true
            state.message = action.payload.data
        },
        [acceptRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            // console.log("rejected::", error.error.message)

            state.requestError = error.error.message
        },
        //reject request by helper
        [rejectRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [rejectRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            //  state.isAuth = true
            state.message = action.payload.data
        },
        [rejectRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            // console.log("rejected::", error.error.message)

            state.requestError = error.error.message
        },
        //delete request by client
        [deleteRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [deleteRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            //  state.isAuth = true
            state.message = action.payload.data
        },
        [deleteRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            // console.log("rejected::", error.error.message)

            state.requestError = error.error.message
        },
        //update hire request data of single helper by client
        [updateHireRequestThunk.pending]: (state, action) => {
            state.requestLoading = true
        },
        [updateHireRequestThunk.fulfilled]: (state, action) => {
            state.requestLoading = false
            //  state.isAuth = true
            state.message = action.payload.data
        },
        [updateHireRequestThunk.rejected]: (state, error) => {
            state.requestLoading = false
            // console.log("rejected::", error.error.message)

            state.requestError = error.error.message
        },
    }
})

export const hireRequestActions = hireRequestSlice.actions
export default hireRequestSlice.reducer