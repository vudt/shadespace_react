import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/authSlice";
import { fetchNavigation } from "../redux/navigationSlice";
import { closeNav } from "../redux/navigationSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const {active, data} = useAppSelector(state => state.navigation)
  const {userInfo} = useAppSelector(state => state.auth)
  const [displayName, setDisplayName] = useState<string>('')
  const [classMenu, setClassMenu] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const ref = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    dispatch(fetchNavigation())

    const checkIfClickOutside = (e: any) => {
      console.log(ref.current)
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch(closeNav(false))
      }
    }
    document.addEventListener("mousedown", checkIfClickOutside)
  }, [])

  useEffect(() => {
    setDisplayName(userInfo.user_display_name!)
  }, [userInfo])

  useEffect(() => {
    // handle open-close menu
    if (active) {
      setTimeout(function(){
        setClassMenu('cbp-spmenu-open')
      }, 150)
      document.body.classList.add('cbp-spmenu-push-toleft')
    } else {
      document.body.classList.remove('cbp-spmenu-push-toleft')
      setClassMenu('')
    }
  }, [active])

  const logOut = () => {
    dispatch(logout())
    router.push(router.pathname)
  }

  if (data.length == 0) return null

  return(
    <>
      <nav ref={ref} className={`cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right ${ classMenu }`} id="cbp-spmenu-s2">
        <h3 className="menu-header">
          {displayName ? (
            <>
              <Link href='/order-history'><span>Hi, {displayName}</span></Link>
              <span onClick={() => logOut()}>Logout</span>
            </>
          ): (
            'Menu'
          )}
        </h3>
        { data.map((item, index) => {
          let link_url: string = `/${item.template}/${item.id}`
          if (item.template == 'portfolio' || item.template == 'customer-service' ||item.template == 'free-swatches') {
            link_url = `/${item.template}`
          }
          return(
            <Link key={index} href={link_url}>
              <a key={index} className="menu-item">{item.name}</a>
            </Link>
          )
        }) }
      </nav>
    </>
  )
}

export default Navigation