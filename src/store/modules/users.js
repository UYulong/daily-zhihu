import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '@/apis'

// 获取用户信息
export const fetchUserInfo = createAsyncThunk('users/userInfo', async () => {
  try {
    const { data } = await API.queryUserInfo()
    return data
  } catch (e) {
    console.log(e);
  }
})

const usersSlice = createSlice({
  name: 'users',

  initialState: {
    info: {}
  },

  reducers: {
    clearInfo: (state) => {
      state.info = []
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        state.info = payload || {}
      })
  }
})

export const { clearInfo } = usersSlice.actions

export default usersSlice.reducer