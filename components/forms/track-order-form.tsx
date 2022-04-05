import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import { Order as IOrder}  from "../../interfaces/order";
import LoopOrder from "../partials/loop-order";
import useFetchData from "../../hooks/fetch-data";


interface FormData {
  order_number: string 
}

const TrackOrderForm = () => {
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormData>();
  const { removeAllToasts } = useToasts();
  const response = useFetchData<IOrder>('')
  const headingColumnText = ['ORDER NUMBER', 'STATUS', 'SWATCHES', 'PRODUCTS', 'TOTAL', 'DATE']

  const onSubmit = handleSubmit(async(data) => {
    removeAllToasts()
    response.executeFetch(`api/app/track_your_order/?order_number=${data.order_number}`)
  })

  return (
    <div className="container page-desc">
      <form onSubmit={onSubmit}  className="form">
        <div className="form-group">
          <label>Your order number</label>
          <input {...register("order_number", {required: "Please input order number"})} className={`form-control ${errors.order_number ? 'input--error' : ''}`} />
        </div>
        <button type="submit" className="btn btn-default">
          {(isSubmitting || response.state.isFetching) ? (
            <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>
          ) : (
            'GO'
          )}
        </button>
      </form>
      { response.state.data && <LoopOrder columns={headingColumnText} orders={[response.state.data]} /> }
    </div>
  )
}

export default TrackOrderForm