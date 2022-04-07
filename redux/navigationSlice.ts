import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import pageApi from '../services/page';

interface MenuItem {
  id: number,
  name: string,
  template: string
}

interface Navigation {
  loading: boolean,
  active: boolean
  data: MenuItem[]
}

const initialState: Navigation = {
  loading: false,
  active: false,
  data: []
}

export const fetchNavigation = createAsyncThunk('user/navigation', async(_, thunkApi) => {
  const response = await pageApi.request('api/app/get_mobile_home_layout')
  if (response.data) {
    return JSON.parse(response.data)
  } else {
    return thunkApi.rejectWithValue({message: response.error})
  }
})

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    closeNav: (state, action) => {
      state.active = action.payload
    },
    toggleNav: (state) => {
      state.active = !state.active
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNavigation.pending, (state, _) => {
      state.loading = true 
    }),
    builder.addCase(fetchNavigation.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false 
      state.data = action.payload
    }),
    builder.addCase(fetchNavigation.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
  }
})

// Action creators are generated for each case reducer function
export const { toggleNav, closeNav } = navigationSlice.actions

export default navigationSlice.reducer