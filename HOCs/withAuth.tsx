import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { getUserInfo } from "../redux/authSlice";
import 'nprogress/nprogress.css'
import { useAppDispatch, useAppSelector } from "../redux/store";

const withAuth = <T extends {}>(WrappedComponent: React.ComponentType<T>, protect: boolean = false) => {

  const componentWithAuth = (props: T) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {isLogged, errorMessage, userInfo} = useAppSelector(state => state.auth)

    useEffect(() => {
      const accessToken = sessionStorage.getItem('token')
      if (protect) {
        if (!accessToken) {
          router.push('/cart')
        } else if(accessToken !== userInfo.token){
          dispatch(getUserInfo())
        }
      } else if (accessToken && !isLogged) {
        dispatch(getUserInfo())
      }
    }, [router.query])

    useEffect(() => {
      if (protect) {
        if (errorMessage) {
          router.push('/cart')
        }
      }
    }, [errorMessage])

    return (
      <WrappedComponent {...(props as T)} />
    )
  }
  return componentWithAuth
}

export default withAuth;


