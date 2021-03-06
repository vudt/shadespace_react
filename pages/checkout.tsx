import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import CheckoutForm from "../components/forms/checkout-form";
import { useAppSelector } from "../redux/store";
import WrapperLoading from "../components/partials/skeleton/wrapper-loading";
import LoadingFormItem from "../components/partials/skeleton/loading-form-item";
import withAuth from "../HOCs/withAuth";
import MetaTag from "../components/meta-tag";
import { useRouter } from "next/router";

const Checkout: NextPage = () => {
  const { cart } = useAppSelector(state => state)
  const {isLogged} = useAppSelector(state => state.auth)
  const router = useRouter()
  const breadcrumb = [{name: "Checkout", link: ''}]  
  const [isRedirect, setRedirect] = useState<boolean>(true)

  useEffect(() => {
    if (cart.data.items.length == 0) {
      if (isRedirect) router.push('/cart')
    }
  }, [])

  return (
    <>
      <MetaTag title="Checkout - Shade Space" description="Checkout - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="Checkout Form" />
      { isLogged ? (
        <CheckoutForm setRedirect={setRedirect} /> 
      ) : (
        <WrapperLoading>
          {[...Array(8)].map((_, i) => <LoadingFormItem key={i} /> )}
        </WrapperLoading>
      )}
    </>
  )
}

export default withAuth(Checkout, true)


