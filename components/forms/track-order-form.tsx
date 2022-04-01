import React, { useState } from "react";
import { useForm } from "react-hook-form";
import pageAPI from "../../services/page";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import { Order as IOrder}  from "../../interfaces/order";
import { Order} from "../../models/order";
import moment from 'moment'


interface FormData {
  order_number: string 
}

interface ISearchResult {
  data: IOrder | null
}

const TrackOrderForm = () => {
  const { register, handleSubmit, trigger, formState: {errors, isSubmitting} } = useForm<FormData>();
  const [result, setResult] = useState<ISearchResult>({data: null})
  const { addToast } = useToasts();

  const onSubmit = handleSubmit(async(data) => {
    const response = await pageAPI.request(`api/app/track_your_order/?order_number=${data.order_number}`);
    if (response.data) {
      const formatData = JSON.parse(response.data)
      setResult({data: formatData.order})
    } else {
      setResult({data: null})
      addToast(`No order found with the ID equal to ${data.order_number}`, { appearance: 'error', autoDismiss: true });
    }
  })

  const renderResult = (order: IOrder) => {
    const orderModel = new Order(order)
    const countSwatches = orderModel.countSwatches()
    const countProducts = orderModel.countProduct()
    const headingColumnText = ['ORDER NUMBER', 'STATUS', 'SWATCHES', 'PRODUCTS', 'TOTAL', 'DATE']

    return (
      <div className="search-result">
        <div className="wrap-result">
          <div className="order-body">
            <div className="order_line_item">
              { headingColumnText.map(text => (<div className="line_column border_b">{text}</div>)) }
            </div>
            <div className="order_line_item border_b">
              <div className="line_column">{order.order_number}</div>
              <div className="line_column">{order.status}</div>
              <div className="line_column"><span className="circle_item">{ countSwatches }</span></div>
              <div className="line_column"><span className="circle_item">{ countProducts }</span></div>
              <div className="line_column price">S${order.total}</div>
              <div className="line_column">{ moment(order.created_at).format('MM/DD/YYYY') }</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container page-desc">
      <form onSubmit={onSubmit}  className="form">
        <div className="form-group">
          <label>Your order number</label>
          <input {...register("order_number", {required: "Please input order number"})} className="form-control" />
        </div>
        <button type="submit" className="btn btn-default">
          {isSubmitting ? (
            <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>
          ) : (
            'GO'
          )}
        </button>
      </form>
      { result.data && renderResult(result.data) }
    </div>
  )
}

export default TrackOrderForm