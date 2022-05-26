import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    displayData: [],
    userAvatar: [],
    saveUser: [],
    hireUser: [],
    displayMessage: '',
    displayLoading: false,
    displayError: "",
}

const varToken = localStorage.getItem("logToken");
export const fetchAllAvatarThunk = createAsyncThunk("displayAll/fetchAllAvatarThunk", async (arg) => {
    try {
        const fetchavatar = await axios.get(`/myhelpers/fetchAllAvatar`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return fetchavatar
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const fetchAllThunk = createAsyncThunk("displayAll/fetchAllThunk", async (arg) => {
    try {
        const fetchRes = await axios.get(`/myhelpers/fetchAllData/Client`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return fetchRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const fetchSaveUserThunk = createAsyncThunk("displayAll/fetchSaveUserThunk", async (arg) => {
    try {
        const fetchRes = await axios.get(`/myhelpers/fetchSaveUser/${arg}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        console.log("save Response:: ", fetchRes)
        return fetchRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const searchThunk = createAsyncThunk("displayAll/searchThunk", async (arg) => {
    try {
        console.log("searchThunk :: ", arg)
        const fetchRes = await axios.get(`/myhelpers/search?field=${arg.workSearch}&searchValue=${arg.filterWork}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        console.log("Fwtch Response:: ", fetchRes)
        return fetchRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const sortThunk = createAsyncThunk("displayAll/sortThunk", async (arg) => {
    try {
        const fetchRes = await axios.get(`/myhelpers/sort?field=${arg.field}&sortValue=${arg.sort}`, {
            headers: {
                Authorization: "Bearer " + varToken,
            },
        })
        return fetchRes
    } catch (error) {
        throw new Error(error.response.data)
    }
})
export const saveThunk = createAsyncThunk("displayAll/saveThunk", async (arg) => {
    try {
        const data = {
            user_id: arg.user_id
        }
        const fetchRes = await axios.post(`/myhelpers/saveUser/${arg.rid}`, data, {
            headers: {
                Authorization: "Bearer " + varToken,
            }
        }
        )
        return fetchRes
    }
    catch (error) {
        throw new Error(error.response.data)
    }
})

const displaySlice = createSlice({
    name: 'displayAll',
    initialState,//: initialState
    reducers: {
        errorReducer(state) {
            state.displayError = ""
        },
        messageReducer(state) {
            state.displayMessage = ""
        },
    },
    extraReducers: {
        //fetchProfileData
        [fetchAllThunk.pending]: (state, action) => {
            state.displayLoading = true
        },
        [fetchAllThunk.fulfilled]: (state, action) => {
            state.displayLoading = false
            state.displayData = action.payload.data
        },
        [fetchAllThunk.rejected]: (state, error) => {
            state.displayLoading = false
            state.displayError = error.error.message
        },
        //fetch avatar of all helpers
        [fetchAllAvatarThunk.pending]: (state, action) => {
            state.displayLoading = true
        },
        [fetchAllAvatarThunk.fulfilled]: (state, action) => {
            state.displayLoading = false
            state.userAvatar = action.payload.data
        },
        [fetchAllAvatarThunk.rejected]: (state, error) => {
            state.displayLoading = false
            state.displayError = error.error.message
        },
        //search result
        [searchThunk.pending]: (state, action) => {
            state.displayLoading = true
        },
        [searchThunk.fulfilled]: (state, action) => {
            state.displayLoading = false
            state.displayData = action.payload.data
        },
        [searchThunk.rejected]: (state, error) => {
            state.displayLoading = false
            state.displayError = error.error.message
        },
        //sort result
        [sortThunk.pending]: (state, action) => {
            state.displayLoading = true
        },
        [sortThunk.fulfilled]: (state, action) => {
            state.displayLoading = false
            state.displayData = action.payload.data
        },
        [sortThunk.rejected]: (state, error) => {
            state.displayLoading = false
            state.displayError = error.error.message
        },
        //saveUser
        [saveThunk.pending]: (state, action) => {
            state.displayLoading = true
        },
        [saveThunk.fulfilled]: (state, action) => {
            state.displayLoading = false
            state.saveUser = action.payload.data
        },
        [saveThunk.rejected]: (state, error) => {
            state.displayLoading = false
            state.displayError = error.error.message
        },
        //fetch saveUser
        [fetchSaveUserThunk.pending]: (state, action) => {
            state.displayLoading = true
        },
        [fetchSaveUserThunk.fulfilled]: (state, action) => {
            state.displayLoading = false
            state.saveUser = action.payload.data
        },
        [fetchSaveUserThunk.rejected]: (state, error) => {
            state.displayLoading = false
            state.displayError = error.error.message
        },
    }
})

export const displayActions = displaySlice.actions
export default displaySlice.reducer