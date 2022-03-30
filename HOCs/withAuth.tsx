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
          console.log('getUserInfo')
          dispatch(getUserInfo())
        }
      } else {
        if (accessToken && !isLogged) {
          console.log('getUserInfo')
          dispatch(getUserInfo())
        } 
      }
    }, [router.query])

    useEffect(() => {
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

// export default function withAuth<T>(WrappedComponent: React.FC<T>, params: {protected: boolean})  {

//   const componentWithAuth = <P extends object>(props: P) => {
//     const router = useRouter()
//     const dispatch = useAppDispatch()
//     const [token, setToken] = useState<string>('');
//     const {isLogged, isLoading, userInfo, errorMessage} = useAppSelector(state => state.auth)

//     console.log('state token: ' + token)
 

//     useEffect(() => {
//       const accessToken = sessionStorage.getItem('token')
//       if (params.protected) {
//         if (!accessToken) {
//           router.push('/cart')
//         } else {
//           console.log('getUserInfo')
//           dispatch(getUserInfo())
//         }
//       } else {
//         if (accessToken && !isLogged) {
//           console.log('getUserInfo')
//           dispatch(getUserInfo())
//         } 
//       }
//     }, [router.query])

//     useEffect(() => {
//       if (userInfo.token) {
//         setToken(userInfo.token)
//       } else if (errorMessage) {
//         if (params.protected) router.push('/cart')
//       }
//     }, [userInfo, errorMessage])

//     if ((!token || isLoading) && params.protected) {
//       return (
//         <>
//           <MetaTag />
//           <Loading />
//         </>
//       )
//     }

//     return (
//       <WrappedComponent {...(props as T)} />
//     )
//   }
//   return componentWithAuth
// }



