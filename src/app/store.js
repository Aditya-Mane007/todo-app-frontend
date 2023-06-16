import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/users/userSlice'
import todoSlice from '../features/todos/todoSlice'

export const store = configureStore({
  reducer: {
    users: userSlice,
    todos: todoSlice
  },
})
