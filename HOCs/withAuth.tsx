import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { getUserInfo } from "../redux/authSlice";
import Loading from "../components/loading";
import MetaTag from "../components/meta-tag";
import 'nprogress/nprogress.css'
import nProgress from "nprogress";
import { useAppDispatch, useAppSelector } from "../redux/store";

const withAuth = <T extends {}>(WrappedComponent: React.ComponentType<T>, protect: boolean = false) => {

  const componentWithAuth = (props: T) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [prevent, setPrevent] = useState<boolean>(true);
    const {isLogged, isLoading, errorMessage, userInfo} = useAppSelector(state => state.auth)
    
    useEffect(() => {
     
      // (async () => {
      //   const accessToken = sessionStorage.getItem('token')

      //   if (protect) {
      //     nProgress.configure({showSpinner: false}).start()
      //     if (!accessToken) {
      //       router.push('/cart')
      //     } else if(accessToken !== userInfo.token){
      //       const result = await dispatch(getUserInfo()).unwrap()
      //       if (result.data) {
      //         nProgress.done()
      //         setPrevent(false)
      //       }
      //       console.log(result.data)
      //     }
      //   } else if (accessToken && !isLogged) {
      //     dispatch(getUserInfo())
      //   }
      // })()

      const accessToken = sessionStorage.getItem('token')
      if (protect) {
        nProgress.configure({showSpinner: false}).start()
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
          nProgress.done()
          setPrevent(false)
        } else if (errorMessage) {
          router.push('/cart')
        }
      }
    }, [isLogged, errorMessage])

    if ((isLoading || prevent) && protect) {
      console.log(isLoading)
      console.log(prevent)
      return (
        <>
          <MetaTag />
          {/* <Loading /> */}
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


