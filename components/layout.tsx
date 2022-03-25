import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { toggleNav, closeNav } from "../redux/navigationSlice";

const Layout = (pageProps: any) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { active } = useAppSelector(state => state.navigation)
  
  useEffect(() => {
    document.body.classList.add('cbp-spmenu-push')
    const handleRouteChange = (url: string) => {
      dispatch(closeNav(false))
    }
    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return(
    <>
      <Navigation />
      <div className="wrapper">
        <Header />
        <div className="main">{ pageProps.children }</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout;