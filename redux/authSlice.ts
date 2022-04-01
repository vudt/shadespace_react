import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, ValidateAuth, UserInfo, ParamsLogin } from "../interfaces/auth";
import pageApi from '../services/page';
var qs = require('qs');

interface ValidationErrors {
  message: string
}

const initialState: AuthState = {
  isLogged: false,
  isLoading: false,
  userInfo: {
    token: null,
    id: null,
    user_email: null,
    user_nicename: null,
    user_display_name: null
  },
  errorMessage: ''
}

export const userLogin = createAsyncThunk<UserInfo, ParamsLogin, {rejectValue: ValidationErrors}>(
  'user/login',
  async(params, thunkApi) => {
    const response = await pageApi.request("wp-json/jwt-auth/v1/token", {
      method: 'POST', 
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      data: qs.stringify(params)
    })
    if (response.error) {
      return thunkApi.rejectWithValue({message: 'Username or password is not valid.'})
    } 
    return response
  }
)

export const getUserInfo = createAsyncThunk<ValidateAuth, void, {rejectValue: ValidationErrors}>(
  'user/getUserInfo',
  async(_: void, thunkApi) => {
    const token = sessionStorage.getItem('token')
    const response = await pageApi.request("wp-json/jwt-auth/v1/token/validate", {
      method: 'POST', 
      headers: { 'Authorization': `Bearer ${token}`}
    })
    if (response.error) {
      return thunkApi.rejectWithValue({message: response.description})
    } 
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('token')
      return initialState
    },
    clearError: (state) => {
      state.errorMessage = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, _) => {
      state.isLogged = false
      state.isLoading = true
    }),
    builder.addCase(userLogin.fulfilled, (state, action) => {
      sessionStorage.setItem('token', action.payload.token!)
      return {...state, isLogged: true, isLoading: true, userInfo: action.payload, errorMessage: ''}
    }),
    builder.addCase(userLogin.rejected, (state, action) => {
      sessionStorage.removeItem('token')
      return {...initialState, errorMessage: action.payload?.message!}
    })
    builder.addCase(getUserInfo.pending, (state, _) => {
      state.isLogged = false
      state.isLoading = true
    }),
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const {token, id, user_email, user_nicename, user_display_name} = action.payload.data
      sessionStorage.setItem('token', token!)
      return {
        ...state, 
        isLogged: true, 
        isLoading: false, 
        userInfo: {token, id, user_email, user_nicename, user_display_name}, 
        errorMessage: ''
      }
    }),
    builder.addCase(getUserInfo.rejected, (state, action) => {
      sessionStorage.removeItem('token')
      return {...initialState, errorMessage: ''}
    })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
