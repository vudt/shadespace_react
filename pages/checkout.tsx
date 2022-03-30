import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import CheckoutForm from "../components/forms/checkout-form";
import { useAppSelector } from "../redux/store";
import withAuth from "../HOCs/withAuth";
import MetaTag from "../components/meta-tag";
import { useRouter } from "next/router";


const Checkout: NextPage = () => {
  const { cart } = useAppSelector(state => state)
  const router = useRouter()
  const breadcrumb = [{name: "Checkout", link: ''}]  
  if (cart.data.items.length == 0) {
    router.push('/cart')
  }

  return (
    <>
      <MetaTag title="Checkout - Shade Space" description="Checkout - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="Checkout Form" />
      <CheckoutForm />
    </>
  )
}

// export default withAuth(Checkout)({protected: true})
export default withAuth(Checkout, true)

// export async function getServerSideProps(context: any) {
//   const token = sessionStorage.getItem('token')
//   return {
//     props: {
//       token: token
//     }
//   }
// }
