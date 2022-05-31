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
    try {
        const lang = arg.lang.map(l => ({ language: l }));
        const data = {
            profession_mobile_number: arg.values.porf_mbl,
            work_time: arg.values.workTime,
            education: arg.values.study,
            other_education: arg.values.otherStudy,
            work_details: arg.fields,
            languages: lang
        };
        const workDataRes = await axios.post(`/myhelpers/createWorkProfile/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return workDataRes
    }
    catch (error) {
        throw new Error(error.response.data)
    }
})
//fetch workDetails thunk
export const fetchWorkThunk = createAsyncThunk("workProfile/fetchWorkThunk", async (arg) => {
    try {
        const fetchRes = await axios.get(`/myhelpers/fetchWorkDetail/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return fetchRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
//update work details thunk
export const updateWorkThunk = createAsyncThunk("workProfile/updateWorkThunk", async (arg) => {
    try {
        const lang = arg.lang.map(l => ({ language: l }));
        const data = {
            profession_mobile_number: arg.values.porf_mbl,
            work_time: arg.values.workTime,
            education: arg.values.study,
            other_education: arg.values.otherStudy,
            work_details: arg.fields,
            languages: lang
        };
        const updateRes = await axios.put(`/myhelpers/updateWorkDetail/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return updateRes
    } catch (error) {
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
        logoutEmpty(state) {
            state.workData=[]
        }
    },
    extraReducers: {
        //workProfileData
        [workProfileThunk.pending]: (state, action) => {
            state.workLoading = true
        },
        [workProfileThunk.fulfilled]: (state, action) => {
            state.workLoading = false
            state.workData = action.payload.data
            state.workMessage = "Work details saved successfully!"
        },
        [workProfileThunk.rejected]: (state, error) => {
            state.workLoading = false
            state.workError = error.error.message
        },
        //fetchWorkData
        [fetchWorkThunk.pending]: (state, action) => {
            state.workLoading = true
        },
        [fetchWorkThunk.fulfilled]: (state, action) => {
            state.workLoading = false
            state.workData = action.payload.data
        },
        [fetchWorkThunk.rejected]: (state, error) => {
            state.workLoading = false
            state.workError = error.error.message
        },
        //updateWorkData
        [updateWorkThunk.pending]: (state, action) => {
            state.workLoading = true
        },
        [updateWorkThunk.fulfilled]: (state, action) => {
            state.workLoading = false
            state.workData = action.payload.data
            state.workMessage = "Work details update successfully!"
        },
        [updateWorkThunk.rejected]: (state, error) => {
            state.workLoading = false
            state.workError = error.error.message
        },
    }
})

export const workProfileActions = workSlice.actions
export default workSlice.reducer