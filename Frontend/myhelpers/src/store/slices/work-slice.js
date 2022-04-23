import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    workData: [],
    message: '',
    loading: false,
    error: ""
}

export const workProfileThunk = createAsyncThunk("workProfile/workProfileThunk", async (arg) => {
    // // console.log("values::", values)
    // console.log("languages", lang)
    // const obj = { ...arg.lang };
    console.log("workFields::", arg)
    try {
        const rid = localStorage.getItem("r_id")
        const lang = arg.lang.map(l => ({ language: l }));
        console.log("lang->>", lang)
        const data = {
            profession_mbl: arg.values.porf_mbl,
            workTime: arg.values.workTime,
            education: arg.values.study,
            other_education: arg.values.otherStudy,
            workDetails: arg.fields,
            languages: lang
        };
        console.log("data", data)
        const workDataRes = await axios.post(`/myhelpers/createWorkProfile/H107`, data)

        console.log("Response::", workDataRes)
        return workDataRes

    }
    catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})

const workSlice = createSlice({
    name: 'workProfile',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.error = ""
        },
    },
    extraReducers: {

        //workProfileData
        [workProfileThunk.pending]: (state, action) => {
            state.loading = true
        },
        [workProfileThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            // state.workProfile = [action.payload.data]
        },
        [workProfileThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },

    }
})

export const workProfileActions = workSlice.actions
export default workSlice.reducer