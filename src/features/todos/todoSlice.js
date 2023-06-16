import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import todoService from "./todoService"

const initialState = {
  todos: [],
  current: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
}
export const getAll = createAsyncThunk("todo/getAll",async (_,thunkAPI) => {
  try {
    const token = await thunkAPI.getState().users.user.token
    // console.log(token)
    return await todoService.getAllTodos(token)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)

  }
})

export const getActive = createAsyncThunk("todo/active",async (_,thunkAPI) => {
  try {
    const token = await thunkAPI.getState().users.user.token
    // console.log(token)
    return await todoService.getActive(token)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)

  }
})

export const getCompleted = createAsyncThunk("todo/getCompleted",async (_,thunkAPI) => {
  try {
    const token = await thunkAPI.getState().users.user.token
    // console.log(token)
    return await todoService.getCompleted(token)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)

  }
})

export const createTodo = createAsyncThunk("todo/create",async (formData,thunkAPI) => {
  try {
    const token = await thunkAPI.getState().users.user.token

    return await todoService.createTodo(token,formData)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)

  }
})

export const updateTodo = createAsyncThunk("todo/update",async (formData,thunkAPI) => {
  try {
    const token = await thunkAPI.getState().users.user.token
    return await todoService.updateTodo(token,formData)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteTodo = createAsyncThunk("todo/delete",async (id,thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.user.token
    return await todoService.deleteTodo(token,id)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)

  }
})

export const deleteAllTodo = createAsyncThunk("todo/deleteAll",async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.user.token
    return await todoService.deleteAllTodo(token)
  } catch (error) {
    const message =
      (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)

  }
})

export const setCurrentState = createAsyncThunk("todo/setCurrent",async (text,thunkAPI) => {
  return await todoService.setCurrent(text)
})
export const removeCurrentState = createAsyncThunk("todo/removeCurrent",async (_,thunkAPI) => {
  return await todoService.removeCurrent()
})
export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getAll.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = action.payload
      })
      .addCase(getAll.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getActive.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getActive.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = action.payload
      })
      .addCase(getActive.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCompleted.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getCompleted.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = action.payload
      })
      .addCase(getCompleted.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createTodo.pending,(state) => {
        state.isLoading = true
      })
      .addCase(createTodo.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos.push(action.payload)
      })
      .addCase(createTodo.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTodo.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(updateTodo.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = state.todos.map((todo) => todo._id === action.payload._id ? action.payload : todo)
      })
      .addCase(updateTodo.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTodo.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(deleteTodo.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = state.todos.filter((todo) => todo._id !== action.payload.id)
      })
      .addCase(deleteTodo.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAllTodo.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(deleteAllTodo.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = []
      })
      .addCase(deleteAllTodo.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(setCurrentState.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(setCurrentState.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.current = action.payload
      })
      .addCase(setCurrentState.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeCurrentState.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(removeCurrentState.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.current = action.payload
      })
      .addCase(removeCurrentState.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = todoSlice.actions
export default todoSlice.reducer