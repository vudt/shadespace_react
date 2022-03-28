import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pageAPI from "../../services/page";
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from "react-loading-spin";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userLogin, logout } from "../../redux/authSlice";
import SPAlert from "../error-message";
import styled from "styled-components";
import lodash from "lodash"


interface FormData {
  username: string,
  password: string
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {isLogged, isLoading, userInfo, errorMessage} = useAppSelector(state => state.auth)
  const { register, handleSubmit, trigger, reset, formState: {errors, isSubmitting} } = useForm<FormData>();
  const { addToast, removeAllToasts } = useToasts();


  console.log(userInfo)
  console.log(errorMessage)

  const onSubmit = handleSubmit(async(data) => {
    dispatch(userLogin(data))
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

const ErrorMessage = styled.p `
  font-size: 0.8rem;
  color: red;
` 