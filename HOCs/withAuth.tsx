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
    const [prevent, setPrevent] = useState<boolean>(true);
    const {isLogged, isLoading, userInfo} = useAppSelector(state => state.auth)

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
        if (isLogged) {
          setPrevent(false)
        } else {
          router.push('/cart')
        }
      }
    }, [isLogged])

    if ((isLoading || prevent) && protect) {
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


