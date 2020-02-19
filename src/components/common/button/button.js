import React from "react";
import { Button } from "react-bootstrap"
import "./button.scss";

const MyButton = ({ 
  value, 
  onClick, 
  classes="", 
  variant="", 
  isActive=false,
  children 
}) => {
  
  return (<Button 
            className={`btn ${classes}`}
            onClick={onClick}
            variant={variant}
            active={isActive}
            size="sm"
          >
            {value}
            {children}
          </Button>)
}

export default MyButton;