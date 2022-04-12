import React from "react";
import { useForm } from "react-hook-form";
import HelperService from "../../services/helper";
import { useToasts } from "react-toast-notifications";
import LoadingSpin from "react-loading-spin";
import pageAPI from "../../services/page"
import lodash from "lodash"

interface FormData {
  email: string
}

const NewsletterForm = () => {
  const { register, handleSubmit, reset, formState: {isSubmitting} } = useForm<FormData>();
  const { addToast, removeAllToasts } = useToasts();

  const onSubmit = handleSubmit(async(data) => {
    removeAllToasts()
    const formData = new FormData()
    lodash.forEach(data, function(value, key) {
      formData.append(key, value)
    })

    const response: {status: string, message: string} = await pageAPI.request("wp-json/contact-form-7/v1/contact-forms/4275/feedback", {
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

  return (
    <div className="frm-news-letter">
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input {...register("email", HelperService.validate_email_field)} className="form-control" />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-default">
          { isSubmitting ? (
            <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  )
}

export default NewsletterForm