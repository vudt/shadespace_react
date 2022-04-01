import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userLogin, clearError } from "../../redux/authSlice";
import { ParamsLogin } from "../../interfaces/auth";
import styled from "styled-components";
import { useRouter } from "next/router";

const ErrorMessage = styled.p `
  font-size: 0.8rem;
  color: red;
` 

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {errorMessage, isLogged} = useAppSelector(state => state.auth)
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<ParamsLogin>();
  const { addToast, removeAllToasts } = useToasts();

  const onSubmit = handleSubmit(async(data) => {
    try {
      dispatch(clearError())
      const result = await dispatch(userLogin(data)).unwrap()
      if (result.token) {
        router.push('/checkout')
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    removeAllToasts()
    if (errorMessage) {
      let text = errorMessage
      addToast(text, { appearance: 'error', autoDismiss: true })
    }
  }, [errorMessage])

  const validate_email_field = {
    required: "Please input your email",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
      message: "Invalid email address"
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="text" {...register("username", validate_email_field)} className="form-control" />
          { errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage> }
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password", {required: "Please input your password"})} className="form-control" />
          { errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage> }
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-default">
          {(isSubmitting || isLogged) ? (<LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>) : ('LOGIN')} 
        </button>
      </form>
      <div className="register-now">
        <a>Register now</a>
      </div>
    </div>
  )
}

export default LoginForm

