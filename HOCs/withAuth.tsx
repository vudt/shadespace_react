import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { getUserInfo } from "../redux/authSlice";
import Loading from "../components/loading";
import MetaTag from "../components/meta-tag";
import { useAppDispatch, useAppSelector } from "../redux/store";

const withAuth = <T extends {}>(WrappedComponent: React.ComponentType<T>, protect: boolean = false) => {

  const componentWithAuth = (props: T) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [token, setToken] = useState<string>('');
    const {isLogged, isLoading, userInfo, errorMessage} = useAppSelector(state => state.auth)

    useEffect(() => {
      const accessToken = sessionStorage.getItem('token')
      if (protect) {
        if (!accessToken) {
          router.push('/cart')
        } else {
          dispatch(getUserInfo())
        }
      } else {
        if (accessToken && !isLogged) {
          dispatch(getUserInfo())
        } 
      }
    }, [router.query])

    useEffect(() => {
      console.log('subcribe')
      if (userInfo.token) {
        setToken(userInfo.token)
      } else if (errorMessage) {
        if (protect) router.push('/cart')
      } 
    }, [userInfo, errorMessage])

    if ((!token || isLoading) && protect) {
      return (
        <>
          <MetaTag />
          <Loading />
        </>
      )
    }

    return (
      <WrappedComponent {...(props as T)} />
    )
  }
  return componentWithAuth
}

export default withAuth;

