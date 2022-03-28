import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import pageApi from '../services/page';

export interface AuthState {
  isLogged: boolean,
  isLoading: boolean,
  userInfo: UserInfo,
  errorMessage: string
}

interface UserInfo {
  token: string,
  user_email: string,
  user_nicename: string,
  user_display_name: string
}

const initialState: AuthState = {
  isLogged: false,
  isLoading: false,
  userInfo: {
    token: '',
    user_email: '',
    user_nicename: '',
    user_display_name: ''
  },
  errorMessage: ''
}

const clearState: AuthState = {
  isLogged: false,
  isLoading: false,
  userInfo: {
    token: '',
    user_email: '',
    user_nicename: '',
    user_display_name: ''
  },
  errorMessage: ''
}

export const userLogin = createAsyncThunk(
  'user/login',
  async(params: any, thunkApi) => {
    const response = await pageApi.request("wp-json/jwt-auth/v1/token", {method: 'POST', params})
    if (response.error) {
      return thunkApi.rejectWithValue('Username or password is not correct.')
    } 
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logout')
      sessionStorage.removeItem('token')
      return initialState
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: AuthState, _) => {
      state.isLogged = false
      state.isLoading = true
    }),
    builder.addCase(userLogin.fulfilled, (state: AuthState, action: PayloadAction<UserInfo>) => {
      console.log(action)
      console.log(state)
      sessionStorage.setItem('token', action.payload.token)
      state.isLogged = true 
      state.isLoading = true 
      state.userInfo = action.payload
      state.errorMessage = ''
      
    }),
    builder.addCase(userLogin.rejected, (state: AuthState, action: any) => {
      sessionStorage.removeItem('token')
      state.isLogged = false
      state.isLoading = false
      state.errorMessage = action.payload

    })
  }
})

export const {logout} = authSlice.actions
export default authSlice.reducer
