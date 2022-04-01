export interface AuthState {
  isLogged: boolean,
  isLoading: boolean,
  userInfo: UserInfo,
  errorMessage: string
}

export interface UserInfo {
  token: string | null,
  id: number | null,
  user_email: string | null,
  user_nicename: string | null,
  user_display_name: string | null
}

export interface ValidateAuth {
  code: string,
  message?: string,
  data: UserInfo
}

export interface ParamsLogin {
  username: string,
  password: string
}
