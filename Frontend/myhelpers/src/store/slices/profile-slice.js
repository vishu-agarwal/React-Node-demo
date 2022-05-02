import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    userProfile: [],
    message:'',
    loading: false,
    error: ""
}
export const starThunk = createAsyncThunk("userProfile/starThunk", async (arg) => {
    try {
        const data = {
            user_id:"C101",
            rate:arg.rate
        }
        
        const res = await axios.put(`/myhelper/updateStar/${arg.rid}`,data)
        return res;
    }
    catch (error) {
        throw new Error(error.response.data)
    }
})
export const avatarThunk = createAsyncThunk("userProfile/avatarThunk", async (formdata, config) => {
    // console.log("avatarDispatch:: ", formdata,config)
    try {
        const rid = localStorage.getItem("r_id")

        const res = await axios.post(`/myhelper/upldAvatar/H102`, formdata, config)
        // console.log("response :: ", res)
        return res

    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const aadharThunk = createAsyncThunk("userProfile/aadharThunk", async (formdata, config) => {
    // console.log("avatarDispatch:: ", formdata,config)
    try {
        const rid = localStorage.getItem("r_id")

        const res = await axios.post(`/myhelper/upldAadhar/H102`, formdata, config)
        // console.log("response :: ", res)
        return res

    } catch (error) {
        throw new Error(error.response.data)
    }
})    
export const createProfileThunk = createAsyncThunk("userProfile/createProfileThunk", async (arg) => {
    // console.log("profilediapatch::", arg)
    try {
        const rid = localStorage.getItem("r_id")
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
        // console.log("data", data)
        const userRes = await axios.post(`/myhelpers/crtProfile/H102`, data)

        // console.log("loginRes", loginRes)
        return userRes

    }
    catch (error) {
        // console.log(error.response.data)
        throw new Error(error.response.data)
    }
})
export const fetchProfileThunk = createAsyncThunk("userProfile/fetchProfileThunk",async (arg) => {
    try {
        
        const fetchRes = await axios.get(`/myhelpers/userProfile/fetch/${arg}`)

        console.log("Fwtch Response:: ", fetchRes)
        return fetchRes

    } catch (error) {
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
        //avatar
        [avatarThunk.pending]: (state, action) => {
            state.loading = true
        },
        [avatarThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.message = [action.payload.data    ]
        },
        [avatarThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
        //aadhar
        [aadharThunk.pending]: (state, action) => {
            state.loading = true
        },
        [aadharThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.message = [action.payload.data]
        },
        [aadharThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
        //userProfileData
        [createProfileThunk.pending]: (state, action) => {
            state.loading = true
        },
        [createProfileThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.userProfile = [...action.payload.data]
        },
        [createProfileThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            state.error = error.error.message
        },
        //fetchProfileData
        [fetchProfileThunk.pending]: (state, action) => {
            state.loading = true
        },
        [fetchProfileThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            state.userProfile = action.payload.data
        },
        [fetchProfileThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            // state.error = error.error.message
        },
        //update stars
        [starThunk.pending]: (state, action) => {
            state.loading = true
        },
        [starThunk.fulfilled]: (state, action) => {
            state.loading = false
            //  state.isAuth = true
            // state.message = action.payload.data
        },
        [starThunk.rejected]: (state, error) => {
            state.loading = false
            // console.log("rejected::", error.error.message)

            // state.error = error.error.message
        },
    }
})

export const profileActions = profileSlice.actions
export default profileSlice.reducer