import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pageAPI from "../../services/page";
import withAuth from "../../HOCs/withAuth";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import lodash from "lodash"

interface FormData {
  first_name: string,
  last_name: string,
  company_name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  postal_code: string
}

const CheckoutForm = () => {
  const { register, handleSubmit, trigger, reset, formState: {errors, isSubmitting} } = useForm<FormData>();
  const { addToast, removeAllToasts } = useToasts();

  const onSubmit = handleSubmit(async(data) => {
    console.log(data)
  })

  const validate_text_field = (name: string) => {
    return {
      required: `${name} is required`, 
      minLength: { 
        value: 2, 
        message: `${name} must have at least 2 characters.`
      }
    }
  }

  const validate_email_field = {
    required: "Please input your email",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
      message: "Invalid email address"
    }
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  const triggerValidate = () => {  
    removeAllToasts()
    if (lodash.isEmpty(errors)) {
      return false
    }
    lodash.forEach(errors, (item) => {
      if (item?.message) {
        addToast(item.message, {appearance: "error", autoDismiss: true})
        return false
      }
    })
  }

  return (
    <div className="container page-desc">
      <form onSubmit={onSubmit}  className="form">
        <div className="form-group">
          <label>First name *</label>
          <input {...register("first_name", validate_text_field('First name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Last name *</label>
          <input {...register("last_name", validate_text_field('Last name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Company name *</label>
          <input {...register("company_name", validate_text_field('Company name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email address *</label>
          <input {...register("email", validate_email_field)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input {...register("phone", validate_text_field('Phone'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Address *</label>
          <input {...register("address", validate_text_field('Address'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Town / City *</label>
          <input {...register("address", validate_text_field('Town / City'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Postcode / Zip *</label>
          <input {...register("address", validate_text_field('Postcode / Zip'))} className="form-control" />
        </div>
        <button type="submit" disabled={isSubmitting} onClick={triggerValidate} className="btn btn-default">
          SUBMIT ORDER  {isSubmitting &&  <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>} 
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm
