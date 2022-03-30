import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import LoopCartItem from "../components/partials/loop-cart-item";
import { useAppSelector } from "../redux/store";
import withAuth from "../HOCs/withAuth";
import MetaTag from "../components/meta-tag";
import BottomButton from "../components/partials/bottom-button";

const Cart: NextPage = () => {
  const { cart } = useAppSelector(state => state)
  const breadcrumb = [{name: "Cart", link: ''}]
  
  return (
    <>
      <MetaTag title="Cart - Shade Space" description="Cart - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <LoopCartItem cart={cart.data} />
      <BottomButton />
    </>
  )
}
export default withAuth(Cart)
// export default withAuth(Cart)({protected: false})
