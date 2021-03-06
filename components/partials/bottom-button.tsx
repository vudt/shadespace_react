import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface PropsButton {
  title: string,
  link: string
}

const BottomButton = (props: PropsButton) => {
  const router = useRouter()
  return (
    <div className="section">
      <div className="container">
        <div className="back-buttons">
          <a onClick={() => router.back()} className="mobile-btn inline medium back-btn ui-link">Back</a>
          <Link href={props.link}><a className="mobile-btn inline medium right ui-link">{props.title}</a></Link>
        </div>
      </div>
    </div>
  )
}

BottomButton.defaultProps = {
  title: "Home",
  link: process.env.HOME_URL
}

export default BottomButton