import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    hireRequestData: [],
    message: '',
    loading: false,
    error: ""
}
//create work Details thunk
export const sendHireRequestThunk = createAsyncThunk("hireRequest/workProfileThunk", async (arg) => {
    // // console.log("values::", values)
    // console.log("languages", lang)
    // const obj = { ...arg.lang };
    console.log("workFields::", arg)
    try {
        const rid = localStorage.getItem("r_id")
        // const work = arg.work.map(l => ({ work: l }));
        // console.log("lang->>", work)
        const data = 
            [
                {
                    user_id: arg.user_id,
                    status: false,
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

        console.log("Response::", workDataRes)
        return workDataRes

    }
    catch (error) {
        // console.log("backend error: ",error.response.data)
        throw new Error(error.response.data)
    }
})
//fetch workDetails thunk
export const fetchHireRequestThunk = createAsyncThunk("hireRequest/fetchHireRequestThunk", async (arg) => {
    try {
        // console.log("abc")
        const fetchRes = await axios.get(`/myhelpers/fetchHireRequest/C106`)

        console.log("Fetch work Response:: ", fetchRes)
        return fetchRes

    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//update work details thunk
export const updateHireRequestThunk = createAsyncThunk("hireRequest/updateWorkThunk", async (arg) => {
    try {

        const rid = localStorage.getItem("r_id")
        const lang = arg.lang.map(l => ({ language: l }));
        // console.log("lang->>", lang)
        const data = {
            // profession_mbl: arg.values.porf_mbl,
            // workTime: arg.values.workTime,
            // education: arg.values.study,
            // other_education: arg.values.otherStudy,
            // workDetails: arg.fields,
            // languages: lang
        };
        const updateRes = await axios.put(`/myhelpers/updateWorkDetail/H102`, data)

        console.log("update work Response:: ", updateRes)
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
        [fetchHireRequestThunk.pending]: (state, action) => {
            state.loading = true
        },
        [fetchHireRequestThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.hireRequestData = action.payload.data
        },
        [fetchHireRequestThunk.rejected]: (state, error) => {
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