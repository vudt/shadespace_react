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
    user_email: null,
    user_nicename: null,
    user_display_name: null
  },
  errorMessage: ''
}

export const userLogin = createAsyncThunk<UserInfo, ParamsLogin, {rejectValue: ValidationErrors}>(
  'user/login',
  async(params, thunkApi) => {
    const headers = { "Content-Type": "application/x-www-form-urlencoded" }
    console.log(qs.stringify(params)) 
    const response = await pageApi.request("wp-json/jwt-auth/v1/token", {method: 'POST', data: qs.stringify(params), headers: headers})
    if (response.error) {
      return thunkApi.rejectWithValue({message: 'Username or password is not correct.'})
    } 
    return response
  }
)

export const getUserInfo = createAsyncThunk<ValidateAuth, void, {rejectValue: ValidationErrors}>(
  'user/getUserInfo',
  async(_: void, thunkApi) => {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2hhZGVzcGFjZS5jb20uc2ciLCJpYXQiOjE2NDg0NDk2ODYsIm5iZiI6MTY0ODQ0OTY4NiwiZXhwIjoxNjQ5MDU0NDg2LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxMDIwIn19fQ.TxLsJM52K43swZmWG7C-wADpVT6Quh3du-_T0oSngLM'
    const token = sessionStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}`}
    const response = await pageApi.request("wp-json/jwt-auth/v1/token/validate", {method: 'POST', headers: headers})
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
      // state.isLogged = true 
      // state.isLoading = true 
      // state.userInfo = action.payload
      // state.errorMessage = ''
    }),
    builder.addCase(userLogin.rejected, (state, action) => {
      sessionStorage.removeItem('token')
      return {...initialState, errorMessage: action.payload?.message!}
      // state.isLogged = false
      // state.isLoading = false
      // state.errorMessage = action.payload?.message!
    })
    builder.addCase(getUserInfo.pending, (state, _) => {
      state.isLogged = false
      state.isLoading = true
    }),
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const {token, user_email, user_nicename, user_display_name} = action.payload.data
      // console.log(token)
      // console.log(user_email)
      // console.log(user_nicename)
      // console.log(user_display_name)
      sessionStorage.setItem('token', token!)
      return {
        ...state, 
        isLogged: true, 
        isLoading: false, 
        userInfo: {token, user_email, user_nicename, user_display_name}, 
        errorMessage: ''
      }
    }),
    builder.addCase(getUserInfo.rejected, (state, action) => {
      sessionStorage.removeItem('token')
      return {...initialState, errorMessage: action.payload?.message!}
      // state.isLogged = false 
      // state.isLoading = false 
      // state.userInfo = initUserInfo
      // state.errorMessage =  action.payload?.message!
     
    })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
