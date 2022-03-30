import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/authSlice";
import { closeNav } from "../redux/navigationSlice";
import { fetchNavigation } from "../redux/navigationSlice";
import Link from "next/link";

const Navigation = () => {
  const {active, data} = useAppSelector(state => state.navigation)
  const {userInfo} = useAppSelector(state => state.auth)
  const [displayName, setDisplayName] = useState<string>('')
  const [classMenu, setClassMenu] = useState('')
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (data.length > 0) return 
    dispatch(fetchNavigation())
  }, [])

  useEffect(() => {
    setDisplayName(userInfo.user_display_name!)
  }, [userInfo])

  useEffect(() => {
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
    // dispatch(closeNav(false))
  }

  if (data.length == 0) return null

  return(
    <>
      <nav className={`cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right ${ classMenu }`} id="cbp-spmenu-s2">
        <h3 className="menu-header">
          {displayName ? (
            <>
              <span>Hi, {displayName}</span>
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