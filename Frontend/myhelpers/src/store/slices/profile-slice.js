import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    userProfile: [],
    loading: false,
    error: ""
}

export const createProfileThunk = createAsyncThunk("userProfile/createProfileThunk", async (arg) => {
    console.log("diapatch::", arg)
    try {
        const r_id = localStorage.getItem("r_id")
        const data = {
            name: arg.values.fname + ' ' + arg.values.lname,
            dob: arg.values.dob,
            email: arg.values.email,
            gender: arg.values.gender,
            isMarried: arg.values.married,
            physical_disable: arg.values.physic_dis,
            address: [
                {
                    state: arg.values.state,
                    city: arg.values.city,
                    pincode: arg.values.pincode,
                    landmark: arg.values.street,
                    house_name: arg.values.house_name,
                    houseNo: arg.values.house_no,
                }
            ],
            alt_mob_num: arg.values.altmbl,
            about: arg.values.about

        };
        console.log("data", data)
        const userRes = await axios.post(`/myhelpers/crtProfile/C105`, data)

        // console.log("loginRes", loginRes)
        return userRes

    }
    catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.error = ""
        },
        isAuthReducer(state) {
            state.isAuth = true
        },
    },
    extraReducers: {
        [createProfileThunk.pending]: (state, action) => {
            state.loading = true
        },
        [createProfileThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.user = [action.payload.data]
        },
        [createProfileThunk.rejected]: (state, error) => {
            state.loading = false
            console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
    }
})
export const profileActions = profileSlice.actions
export default profileSlice.reducer