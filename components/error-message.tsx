import React from "react";
import styled from "styled-components";

const SPAlert = (props: {text: string}) => {
  return (
    <Alert>{ props.text }</Alert>
  )
}

export default SPAlert

const Alert = styled.div `
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  width: 95%;
  margin: 4% auto;
  padding-top: 10px;
  padding-bottom: 10px;
`