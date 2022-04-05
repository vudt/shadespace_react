import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pageAPI from "../../services/page";
import OrderService from "../../services/order";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { emptyCart } from "../../redux/cartSlice";
import { useToasts } from 'react-toast-notifications';
import HelperService from "../../services/helper";
import LoadingSpin from "react-loading-spin";
import Modal from 'react-modal';
import Link from "next/link";
import lodash from "lodash"
import { useRouter } from "next/router";

const customStyles = {
  content: {
    width: '75%',
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px'
  },
};

Modal.setAppElement('#__next');

interface FormData {
  first_name: string,
  last_name: string,
  company_name: string,
  email: string,
  phone: string,
  address_1: string,
  country: string,
  postcode: string
}

interface TypeProps {
  setRedirect:(value: boolean) => void
}

const CheckoutForm = (props: TypeProps) => {
  const { register, handleSubmit, trigger, reset, formState: {errors, isSubmitting, submitCount} } = useForm<FormData>();
  const {cart} = useAppSelector(state => state)
  const {userInfo} = useAppSelector(state => state.auth)
  const [showModal, setShowModal] = useState<boolean>(false)
  const { addToast, removeAllToasts } = useToasts()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSubmit = handleSubmit(async(data) => {
    removeAllToasts()
    const paramsOrder = OrderService.prepareParam(cart.data, userInfo, data)
    if (paramsOrder) {
      const response = await pageAPI.request("api/app/create_order", {
        method: 'POST', 
        data: paramsOrder, 
        headers: {'Authorization': userInfo.token}
      })

      if (response.error) {
        addToast('There has been a critical error on this website…arn more about troubleshooting WordPress.', { appearance: 'error', autoDismiss: true });
        return false
      }

      props.setRedirect(false)
      reset()
      dispatch(emptyCart())
      setShowModal(true)
    }
  })

  useEffect(() => {
    removeAllToasts()
    // show error
    console.log(errors)
    if (errors) {
      lodash.forEach(errors, (item) => {
        if (item?.message) {
          addToast(item.message, {appearance: "error", autoDismiss: true})
          return false
        }
      })
    }
  }, [submitCount])

  const triggerValidate = () => {  
    trigger([
      "first_name", 
      "last_name", 
      "company_name", 
      "email", 
      "phone", 
      "address_1", 
      "country", 
      "postcode"
    ])
  }

  function closeModal() {
    router.push('/free-swatches')
  }

  return (
    <div className="container page-desc">
      <form onSubmit={onSubmit}  className="form">
        <div className="form-group">
          <label>First name *</label>
          <input {...register("first_name", HelperService.validate_text_field('First name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Last name *</label>
          <input {...register("last_name", HelperService.validate_text_field('Last name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Company name *</label>
          <input {...register("company_name", HelperService.validate_text_field('Company name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email address *</label>
          <input {...register("email", HelperService.validate_email_field)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input {...register("phone", HelperService.validate_phone_field('Phone'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Address *</label>
          <input {...register("address_1", HelperService.validate_text_field('Address'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Town / City *</label>
          <input {...register("country", HelperService.validate_text_field('Town / City'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Postcode / Zip *</label>
          <input {...register("postcode", HelperService.validate_text_field('Postcode / Zip'))} className="form-control" />
        </div>
        <button type="submit" disabled={isSubmitting} onClick={triggerValidate} className="btn btn-default">
          { isSubmitting ? (
            <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>
          ) : (
            'SUBMIT ORDER ' 
          ) }
        </button>
      </form>
      
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Thank you for your order"
      >
          <h3 style={{textAlign: "center"}}>THANK YOU FOR YOUR ORDER</h3>
          <div className="form">
            <Link href="/free-swatches">
              <button className="btn btn-default">Continue Shopping</button>
            </Link>
          </div>
      </Modal>

    </div>
  )
}

export default CheckoutForm
