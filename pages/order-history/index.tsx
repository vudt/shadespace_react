import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import { useAppSelector } from "../../redux/store";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import withAuth from "../../HOCs/withAuth";
import MetaTag from "../../components/meta-tag";
import pageAPI from "../../services/page";
import BottomButton from "../../components/partials/bottom-button";
import { Order as IOrder } from "../../interfaces/order";
import { Order } from "../../models/order";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import SPAlert from "../../components/error-message";
import LoadingSpin from "react-loading-spin";
import moment from 'moment'
import useFetchData from "../../hooks/fetch-data";

const OrderHistory: NextPage = () => {
  const breadcrumb = [{name: "Orders", link: ''}]  
  const {userInfo} = useAppSelector(state => state.auth)
  const [orders, setOrders] = useState<IOrder[] | null>(null)
  const router = useRouter()
  const { addToast } = useToasts()
  const headingColumnText = ['ORDER NUMBER', 'STATUS', 'SWATCHES', 'PRODUCTS', 'TOTAL', 'DATE']

  const response = useFetchData('api/app/order_history', {headers: {'Authorization': userInfo.token}})
  console.log(response.state)


  useEffect(() => {
    (async () => {
      const response = await pageAPI.request('api/app/order_history', {headers: {'Authorization': userInfo.token}})
      if (response.error) {
        addToast('There has been a critical error on this website…arn more about troubleshooting WordPress.', { appearance: 'error', autoDismiss: false });
      } else {
        const data = JSON.parse(response.data)
        setOrders(data.orders)
      } 
    })()
  },[router.query])

  const loopOrder = () => {
    return orders?.map((order) => {
      const orderModel = new Order(order)
      return (
        <div className="order_line_item border_b">
          <div className="line_column">{order.id}</div>
          <div className="line_column">{order.status}</div>
          <div className="line_column"><span className="circle_item">{orderModel.countSwatches()}</span></div>
          <div className="line_column"><span className="circle_item">{orderModel.countProduct()}</span></div>
          <div className="line_column price">S${order.total}</div>
          <div className="line_column">{ moment(order.created_at).format('MM/DD/YYYY') }</div>
        </div>
      )
    })
  }

  const DisplayContent = () => {
    
  }

  if (!orders) {
    return (
      <>
        <MetaTag title="Order History - Shade Space" description="Order History - Shade Space" />
        <BreadCrumb breadcrumb={breadcrumb} />
        <PageContent title="My Orders" />
        <section>
          <div className="container page-desc" style={{textAlign: "center"}}>
            <LoadingSpin />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <MetaTag title="Order History - Shade Space" description="Order History - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="My Orders" />

      {orders.length > 0 ? (
        <div className="search-result">
          <div className="wrap-result">
            <div className="order-body">
              <div className="order_line_item">
                { headingColumnText.map(text => (<div className="line_column border_b">{text}</div>)) }
              </div>
              { loopOrder() } 
            </div>
          </div>
        </div>
      ) : (
        <SPAlert text="You don't have any orders yet."></SPAlert>
      )}

      <BottomButton />
    </>
  )
}

export default withAuth(OrderHistory, true)