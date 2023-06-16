import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import userService from "./userService"

const user = JSON.parse(localStorage.getItem("User"))

const initialState = {
  user: user ? user : null,
  isNight: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
}

export const registerUser = createAsyncThunk("user/register",async (formData,thunkAPI) => {
  try {
    return await userService.registerUser(formData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const loginUser = createAsyncThunk("user/login",async (formData,thunkAPI) => {
  try {
    return await userService.loginUser(formData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})


export const logout = createAsyncThunk("user/logout",async () => {
  await userService.logout()
})

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    changeMode: (state) => {
      state.isNight = !state.isNight
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending,(state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerUser.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(loginUser.pending,(state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(logout.fulfilled,(state) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = null
      })
      .addCase(logout.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})


export const { reset,changeMode } = userSlice.actions
export default userSlice.reducer