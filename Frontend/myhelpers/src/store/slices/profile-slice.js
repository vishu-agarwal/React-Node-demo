import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    userProfile: [],
    profileMessage: '',
    profileLoading: false,
    profileError: ""
}
const varToken = localStorage.getItem("logToken");
console.log("varToken", varToken)
export const starThunk = createAsyncThunk("userProfile/starThunk", async (arg) => {
    try {
        const data = {
            user_id: "C106",
            rate: arg.rate
        }

        const res = await axios.put(`/myhelper/updateStar/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
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

        const res = await axios.post(`/myhelper/upldAvatar/C109`, formdata, config, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
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

        const res = await axios.post(`/myhelper/upldAadhar/C109`, formdata, config, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        // console.log("response :: ", res)
        return res

    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const createProfileThunk = createAsyncThunk("userProfile/createProfileThunk", async (arg) => {
    // console.log("profilediapatch::", arg)
    try {

        // const varToken = localStorage.getItem("token");
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
        const userRes = await axios.post(`/myhelpers/crtProfile/C109`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })

        // console.log("loginRes", loginRes)
        return userRes

    }
    catch (error) {
        console.log(error.response)
        throw new Error(error.response.data)
    }
})
export const fetchUserProfileThunk = createAsyncThunk("userProfile/fetchProfileThunk", async (arg) => {
    try {
        // console.log("arg ",arg)    

        const fetchUser = await axios.get(`/myhelpers/userProfile/fetch/${arg}`,
            {
                headers: {
                    Authorization: "Bearer " + varToken,
                },
            })

        // console.log("Fwtch Response:: ", fetchUser)
        return fetchUser

    } catch (error) {
        throw new Error(error.response.data)
    }
})
//update profile of user
export const updateProfileThunk = createAsyncThunk("userProfile/updateProfileThunk", async (arg) => {
    try {
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
            about: arg.values.about,
            aadhar_card: arg.aadhar
        }
        // console.log("data::",data)
        const updateuser = await axios.put(`/myhelpers/client/update/C109`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })

        // console.log("Fwtch Response:: ", fetchRes)
        return updateuser

    } catch (error) {
        throw new Error(error.response.data)
    }
})

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.profileError = ""
        },

        messageReducer(state) {
            state.profileMessage = ""
        },
    },
    extraReducers: {
        //avatar
        [avatarThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [avatarThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            state.profileMessage = [action.payload.data]
        },
        [avatarThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
        //aadhar
        [aadharThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [aadharThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            state.profileMessage = [action.payload.data]
        },
        [aadharThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
        //userProfileData
        [createProfileThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [createProfileThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            // state.userProfile = [action.payload.data]
        },
        [createProfileThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
        //fetchProfileData
        [fetchUserProfileThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [fetchUserProfileThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            if (action.payload.data === "Please create profile for move further!") {
                state.profileMessage = action.payload.data
            }
            else {
                state.userProfile = [action.payload.data]
            }
            // console.log("userProfile::",state.userProfile)
        },
        [fetchUserProfileThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
        //update userProfileData
        [updateProfileThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [updateProfileThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            // state.userProfile = [action.payload.data]
        },
        [updateProfileThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
        //update stars
        [starThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [starThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            // state.message = action.payload.data
        },
        [starThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
    }
})

export const profileActions = profileSlice.actions
export default profileSlice.reducer