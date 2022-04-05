import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import pageAPI from "../../services/page";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import withAuth from "../../HOCs/withAuth";
import HelperService from "../../services/helper";
import lodash from "lodash"

interface FormData {
  "your-name": string, 
  "your-email": string,
  "your-message": string
}

const ContactForm = () => {
  const { register, handleSubmit, trigger, reset, formState: {errors, isSubmitting, submitCount} } = useForm<FormData>();
  const { addToast, removeAllToasts } = useToasts();

  const onSubmit = handleSubmit(async(data) => {
    removeAllToasts()
    const formData = new FormData()
    lodash.forEach(data, function(value, key) {
      formData.append(key, value)
    })

    const response: {status: string, message: string} = await pageAPI.request("wp-json/contact-form-7/v1/contact-forms/21858/feedback", {
      method: "POST",
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData
    });

    if (response.status == 'mail_sent') {
      addToast(response.message, { appearance: 'success', autoDismiss: true })
      reset();
    } else if (response.status == 'validation_failed') {
      addToast(response.message, { appearance: 'error', autoDismiss: true })
    }
  })

  useEffect(() => {
    removeAllToasts()
    // show error
    if (errors) {
      lodash.forEach(errors, (item) => {
        if (item?.message) {
          addToast(item.message, {appearance: "error", autoDismiss: true})
          return false
        }
      })
    }
  }, [submitCount]);

  const triggerValidate = () => {  
    trigger(["your-name", "your-email", "your-message"])
  }

  return (
    <div className="container page-desc">
      <form onSubmit={onSubmit}  className="form">
        <div className="form-group">
          <label>Your name</label>
          <input {...register("your-name", HelperService.validate_text_field('Your name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Your email</label>
          <input {...register("your-email", HelperService.validate_email_field)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Your message</label>
          <textarea {...register("your-message", HelperService.validate_text_field('Your message'))} className="form-control h-75" />
        </div>
        <button type="submit" disabled={isSubmitting} onClick={triggerValidate} className="btn btn-default">
          { isSubmitting ? (
            <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>
          ) : (
            'SEND'
          )}
        </button>
      </form>
    </div>
  )
}

export default withAuth(ContactForm)