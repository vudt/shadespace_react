import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";
import { useRouter } from "next/router";
import { useAppDispatch } from "../redux/store";
import { closeNav } from "../redux/navigationSlice";

const Layout = (pageProps: any) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    document.body.classList.add('cbp-spmenu-push')
    const handleRouteChange = (url: string) => {
      dispatch(closeNav(false))
    }
    router.events.on('routeChangeStart', handleRouteChange)

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