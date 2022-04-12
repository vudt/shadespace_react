import React, { useEffect } from "react";
import type { NextPage } from 'next'
import { useAppSelector } from "../../redux/store";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import withAuth from "../../HOCs/withAuth";
import pageAPI from '../../services/page'
import MetaTag from "../../components/meta-tag";
import BottomButton from "../../components/partials/bottom-button";
import Loading from '../../components/loading';
import { Order as IOrder } from "../../interfaces/order";
import LoopOrder from "../../components/partials/loop-order";
import SPAlert from "../../components/error-message";
import useFetchData from "../../hooks/fetch-data";

const OrderHistory: NextPage = () => {
  const breadcrumb = [{name: "Orders", link: ''}]  
  const headingColumnText = ['ORDER NUMBER', 'STATUS', 'SWATCHES', 'PRODUCTS', 'TOTAL', 'DATE']
  const {userInfo} = useAppSelector(state => state.auth)
  const response = useFetchData<IOrder[]>('')

  useEffect(() => {
    if (userInfo.token) {
      response.setConfig({headers: {'Authorization': userInfo.token}})
      response.executeFetch('api/app/order_history/')
    }
  }, [userInfo])

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <Loading />
    if (response.state.data.length === 0) return <SPAlert text="You don't have any order yet." />
    return <LoopOrder columns={headingColumnText} orders={response.state.data} />
  }

  return (
    <>
      <MetaTag title="Order History - Shade Space" description="Order History - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="My Orders" />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export default withAuth(OrderHistory, true)