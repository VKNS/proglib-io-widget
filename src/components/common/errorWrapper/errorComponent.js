import React from "react";
import { Alert } from "react-bootstrap";
import "./errorComponent.scss";

const ErrorComponent = ({value, classes=""}) => {
  return (
    <Alert variant={"danger"} className={`alert-custom ${classes}`}>
      {value}
    </Alert>
  )
} 
  


export default ErrorComponent;