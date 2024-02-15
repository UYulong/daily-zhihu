import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './modules/users'

export default configureStore({
  reducer: {
    users: usersSlice
  }
})