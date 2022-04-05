import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userLogin, clearError } from "../../redux/authSlice";
import { ParamsLogin } from "../../interfaces/auth";
import HelperService from "../../services/helper";
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
    removeAllToasts()
    dispatch(clearError())
    const result = await dispatch(userLogin(data)).unwrap()
    if (result.token) {
      router.push('/checkout')
    }
  })

  useEffect(() => {
    removeAllToasts()
    // show error login
    if (errorMessage) {
      addToast(errorMessage, { appearance: 'error', autoDismiss: true })
    }
  }, [errorMessage])

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="text" {...register("username", HelperService.validate_email_field)} className="form-control" />
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

