import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userLogin } from "../../redux/authSlice";
import { ParamsLogin } from "../../interfaces/auth";
import SPAlert from "../error-message";
import styled from "styled-components";
import { useRouter } from "next/router";

const ErrorMessage = styled.p `
  font-size: 0.8rem;
  color: red;
` 

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {isLogged, isLoading, userInfo, errorMessage} = useAppSelector(state => state.auth)
  const { register, handleSubmit, trigger, reset, formState: {errors, isSubmitting} } = useForm<ParamsLogin>();
  const { addToast, removeAllToasts } = useToasts();

  const onSubmit = handleSubmit(async(data) => {
    try {
      const result = await dispatch(userLogin(data)).unwrap()
      console.log(result)
      if (result.token) {
        router.push('/checkout')
      }
    } catch (error) {
      console.log(error)
    }
  })

  const validate_email_field = {
    required: "Please input your email",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
      message: "Invalid email address"
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}  className="form">
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
          LOGIN  {isSubmitting &&  <LoadingSpin size="18px" width="2px" primaryColor="#fff"></LoadingSpin>} 
        </button>

        { errorMessage &&  
          <SPAlert text={errorMessage} />
        }
        
      </form>
      <div className="register-now">
        <a>Register now</a>
      </div>
    </div>
  )
}

export default LoginForm

