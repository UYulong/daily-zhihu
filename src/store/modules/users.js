import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    info: {}
  },

  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    }
  }
})

export const { setInfo } = usersSlice.actions

export default usersSlice.reducer