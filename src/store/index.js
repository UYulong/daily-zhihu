import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './modules/users'
import collectSlice from './modules/collect'

export default configureStore({
  reducer: {
    users: usersSlice,
    collect: collectSlice
  }
})