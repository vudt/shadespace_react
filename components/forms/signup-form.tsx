import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import LoadingSpin from "react-loading-spin";
import { userSignup, clearError } from "../../redux/authSlice";
import HelperService from "../../services/helper";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ParamsSignup } from "../../interfaces/auth";
import { useRouter } from "next/router";
import lodash from "lodash"

interface TypeProps {
  setShowModalLogin: (value: boolean) => void,
  setShowModalSignup: (value: boolean) => void
}

interface FormData extends ParamsSignup {
  confirm_password: string
}

const SignupForm = (props: TypeProps) => {
  const {isLogged, isLoading, errorMessage} = useAppSelector(state => state.auth)
  const { watch, register, handleSubmit, trigger, formState: {errors, isSubmitting, submitCount} } = useForm<FormData>();
  const { addToast, removeAllToasts } = useToasts();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = handleSubmit(async(data) => {
    removeAllToasts()
    dispatch(clearError())
    const key = "confirm_password"
    const { [key]: exclude, ...formatData } = data
    const result = await dispatch(userSignup(formatData)).unwrap()
    if (result.token) {
      router.push('/checkout')
    }
  })

  useEffect(() => {
    // show error from server
    if (errorMessage) {
      addToast(errorMessage, { appearance: 'error', autoDismiss: true })
      dispatch(clearError())
    }
  }, [errorMessage])
  
  useEffect(() => {
    // show error from client
    if (!errorMessage && !lodash.isEmpty(errors)) {
      removeAllToasts()
      lodash.forEach(errors, (item) => {
        if (item?.message) {
          addToast(item.message, {appearance: "error", autoDismiss: true})
          return false
        }
      })
    }
  }, [submitCount, errorMessage])

  const triggerValidate = () => {  
    trigger(["first_name", "last_name", "email", "password", "confirm_password"])
  }

  const transitionPage = () => {
    props.setShowModalLogin(true)
    props.setShowModalSignup(false)
  }
  
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" {...register("first_name", HelperService.validate_text_field('First Name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" {...register("last_name", HelperService.validate_text_field('Last Name'))} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email", HelperService.validate_email_field)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password", HelperService.validate_password_field)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register("confirm_password", {validate: (value) => HelperService.validate_confirm_password(value, watch('password'))})} className="form-control" />
        </div>
        <button type="submit" disabled={isSubmitting} onClick={triggerValidate} className="btn btn-default">
          {(isSubmitting || isLoading) ? (<LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>) : ('Signup')} 
        </button>
      </form>
      <div className="register-now">
        <a onClick={transitionPage}>Login now</a>
      </div>
    </div>
  )
}

export default SignupForm