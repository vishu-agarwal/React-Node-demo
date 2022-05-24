import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    workData: [],
    workMessage: '',
    workLoading: false,
    workError: ""
}
const varToken = localStorage.getItem("logToken");
//create work Details thunk
export const workProfileThunk = createAsyncThunk("workProfile/workProfileThunk", async (arg) => {
    // // console.log("values::", values)
    // console.log("languages", lang)
    // const obj = { ...arg.lang };
    console.log("workFields::", arg)
    try {

        const lang = arg.lang.map(l => ({ language: l }));
        // console.log("lang->>", lang)
        const data = {
            profession_mbl: arg.values.porf_mbl,
            workTime: arg.values.workTime,
            education: arg.values.study,
            other_education: arg.values.otherStudy,
            workDetails: arg.fields,
            languages: lang
        };
        // console.log("data", data)
        const workDataRes = await axios.post(`/myhelpers/createWorkProfile/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })

        // console.log("Response::", workDataRes)
        return workDataRes

    }
    catch (error) {
        // console.log("backend error: ",error.response.data)
        throw new Error(error.response.data)
    }
})
//fetch workDetails thunk
export const fetchWorkThunk = createAsyncThunk("workProfile/fetchWorkThunk", async (arg) => {
    try {
        // console.log("abc")
        const fetchRes = await axios.get(`/myhelpers/fetchWorkDetail/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })

        // console.log("Fetch work Response:: ", fetchRes)
        return fetchRes

    } catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
//update work details thunk
export const updateWorkThunk = createAsyncThunk("workProfile/updateWorkThunk", async (arg) => {
    try {

        const rid = localStorage.getItem("r_id")
        const lang = arg.lang.map(l => ({ language: l }));
        // console.log("lang->>", lang)
        const data = {
            profession_mbl: arg.values.porf_mbl,
            workTime: arg.values.workTime,
            education: arg.values.study,
            other_education: arg.values.otherStudy,
            workDetails: arg.fields,
            languages: lang
        };
        const updateRes = await axios.put(`/myhelpers/updateWorkDetail/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })

        console.log("update work Response:: ", updateRes)
        return updateRes

    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data)
    }
})


const workSlice = createSlice({
    name: 'workProfile',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.workError = ""
        },
        messageReducer(state) {
            state.workMessage = ""
        },
    },
    extraReducers: {

        //workProfileData
        [workProfileThunk.pending]: (state, action) => {
            state.workLoading = true
        },
        [workProfileThunk.fulfilled]: (state, action) => {
            state.workLoading = false
            //  state.isAuth = true
            state.workMessage = action.payload.data
        },
        [workProfileThunk.rejected]: (state, error) => {
            state.workLoading = false
            // console.log("rejected::", error.error.message)

            state.workError = error.error.message
        },
        //fetchWorkData
        [fetchWorkThunk.pending]: (state, action) => {
            state.workLoading = true
        },
        [fetchWorkThunk.fulfilled]: (state, action) => {
            state.workLoading = false
            //  state.isAuth = true
            state.workData = action.payload.data
        },
        [fetchWorkThunk.rejected]: (state, error) => {
            state.workLoading = false
            // console.log("rejected::", error.error.message)

            state.workError = error.error.message
        },
        //updateWorkData
        [updateWorkThunk.pending]: (state, action) => {
            state.workLoading = true
        },
        [updateWorkThunk.fulfilled]: (state, action) => {
            state.workLoading = false
            //  state.isAuth = true
            state.workMessage = action.payload.data
        },
        [updateWorkThunk.rejected]: (state, error) => {
            state.workLoading = false
            // console.log("rejected::", error.error.message)

            state.workError = error.error.message
        },
    }
})

export const workProfileActions = workSlice.actions
export default workSlice.reducer