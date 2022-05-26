import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userProfile: [],
    viewUserProfile: [],
    profileMessage: '',
    profileLoading: false,
    profileError: "",
    email: "",
    avatar: []
}
const varToken = localStorage.getItem("logToken");

export const starThunk = createAsyncThunk("userProfile/starThunk", async (arg) => {
    try {
        const data = {
            user_id: arg.user_id,
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
export const avatarThunk = createAsyncThunk("userProfile/avatarThunk", async (arg) => {
    try {
        const res = await axios.post(`/myhelper/upldAvatar/${arg.rid}`, arg.formdata, {
            headers: {
                Authorization: "Bearer " + varToken
            },
        }, arg.config)
        return res
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const aadharThunk = createAsyncThunk("userProfile/aadharThunk", async (arg) => {
    try {
        const res = await axios.post(`/myhelper/upldAadhar/${arg.rid}`, arg.formdata, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        }, arg.config)
        return res

    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const createProfileThunk = createAsyncThunk("userProfile/createProfileThunk", async (arg) => {
    try {
        const data = {
            name: arg.values.fname + ' ' + arg.values.lname,
            dob: arg.values.dob,
            is_profile: true,
            mobile_number: arg.values.mbl,
            gender: arg.values.gender,
            married: arg.values.married,
            physical_disable: arg.values.physic_dis,
            address:
            {
                state: arg.values.state,
                city: arg.values.city,
                pincode: arg.values.pincode,
                landmark: arg.values.street,
                house_name: arg.values.house_name,
                house_no: arg.values.house_no,
            },
            alternate_mobile_number: arg.values.altmbl,
            about: arg.values.about
        };
        const userRes = await axios.post(`/myhelpers/crtProfile/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return userRes
    }
    catch (error) {
        throw new Error(error.response.data)
    }
})

export const fetchEmailThunk = createAsyncThunk("userProfile/fetchEmailThunk", async (arg) => {
    try {
        const fetchemail = await axios.get(`/myhelpers/userProfile/fetchEmail/${arg}`,
            {
                headers: {
                    Authorization: "Bearer " + varToken,
                },
            })

        // console.log("Fwtch Response:: ", fetchUser)
        return fetchemail

    } catch (error) {
        throw new Error(error.response.data)
    }
})

export const fetchAvatarThunk = createAsyncThunk("userProfile/fetchAvatarThunk", async (arg) => {
    try {
        // console.log("arg ",arg)    

        const fetchemail = await axios.get(`/myhelpers/userProfile/fetchAvatar/${arg}`,
            {
                headers: {
                    Authorization: "Bearer " + varToken,
                },
            })

        // console.log("Fwtch Response:: ", fetchUser)
        return fetchemail

    } catch (error) {
        throw new Error(error.response.data)
    }
})

export const fetchUserProfileThunk = createAsyncThunk("userProfile/fetchProfileThunk", async (arg) => {
    try {
        const fetchUser = await axios.get(`/myhelpers/userProfile/fetch/${arg}`,
            {
                headers: {
                    Authorization: "Bearer " + varToken,
                },
            })
       
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
            mobile_number: arg.values.mbl,
            gender: arg.values.gender,
            married: arg.values.married,
            physical_disable: arg.values.physic_dis,
            address:
            {
                state: arg.values.state,
                city: arg.values.city,
                pincode: arg.values.pincode,
                landmark: arg.values.street,
                house_name: arg.values.house_name,
                house_no: arg.values.house_no,
            },
            alternate_mobile_number: arg.values.altmbl,
            about: arg.values.about,
            aadhar_card: arg.aadhar
        }
        // console.log("data::",data)
        const updateuser = await axios.put(`/myhelpers/client/update/${arg.rid}`, data, {
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

            state.userProfile = action.payload.data
            state.profileMessage = "Photo uploaded successfully!"
        },
        [avatarThunk.rejected]: (state, error) => {
            state.profileLoading = false
            state.profileError = error.error.message
        },
        //aadhar
        [aadharThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [aadharThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            state.userProfile = action.payload.data
            state.profileMessage = "Addhar card uploaded successfully!"
        },
        [aadharThunk.rejected]: (state, error) => {
            state.profileLoading = false
            state.profileError = error.error.message
        },
        //userProfileData
        [createProfileThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [createProfileThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            state.userProfile = action.payload.data
            state.profileMessage = "Profile details uploaded successfully!"
        },
        [createProfileThunk.rejected]: (state, error) => {
            state.profileLoading = false
            state.profileError = error.error.message
        },
        //fetchEmail
        [fetchEmailThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [fetchEmailThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            state.email = action.payload.data
        },
        [fetchEmailThunk.rejected]: (state, error) => {
            state.profileLoading = false
            // console.log("rejected::", error.error.message)

            state.profileError = error.error.message
        },
        //fetch avatar

        [fetchAvatarThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [fetchAvatarThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            //  state.isAuth = true
            if (action.payload.data === "First upload photo for create profile!") {
                state.profileMessage = action.payload.data
            }
            else {
                state.avatar = action.payload.data
            }
        },
        [fetchAvatarThunk.rejected]: (state, error) => {
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
            if (action.payload.data === "Please create profile for move forward!") {
                state.profileMessage = action.payload.data
            }
            else {
                state.userProfile = action.payload.data
            }
            // console.log("userProfile::",state.userProfile)
        },
        [fetchUserProfileThunk.rejected]: (state, error) => {
            state.profileLoading = false
            state.profileError = error.error.message
        },
        //update userProfileData
        [updateProfileThunk.pending]: (state, action) => {
            state.profileLoading = true
        },
        [updateProfileThunk.fulfilled]: (state, action) => {
            state.profileLoading = false
            state.profileMessage = action.payload.data
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
            state.userProfile = action.payload.data
        },
        [starThunk.rejected]: (state, error) => {
            state.profileLoading = false
            state.profileError = error.error.message
        },
    }
})

export const profileActions = profileSlice.actions
export default profileSlice.reducer