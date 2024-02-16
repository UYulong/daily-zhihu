import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '@/apis'

// 获取 收藏文章列表
export const fetchCollectList = createAsyncThunk('collect/list', async () => {
  try {
    const { data } = await API.queryStoreList()
    return data
  } catch (e) {
    console.log(e);
  }
})

const collectSlice = createSlice({
  name: 'collect',

  initialState: {
    list: []
  },

  reducers: {
    removeNews: (state, { payload }) => {
      state.list = state.list.filter(item => +item.id !== +payload)
    },

    clearNewsList: (state) => {
      state.list = []
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchCollectList.fulfilled, (state, { payload }) => {
        state.list = payload || []
      })
  }
})

export const { removeNews, clearNewsList } = collectSlice.actions

export default collectSlice.reducer