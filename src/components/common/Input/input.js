import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

import CrossButton from "../button/crossButton/crossButton";

const Input = ({
  onClick, 
  onChange, 
  value,
  placeHolder,
  onKeyPress,
  onButtonClick,
  isActive
}) => {
  return (
  <InputGroup className="mb-3" onClick={onClick} onKeyPress={onKeyPress}>
    <FormControl onChange={onChange} value={value} placeholder={placeHolder}/>
    <InputGroup.Append>
      <CrossButton 
        classes={"btn btn_cross-option"} 
        onClick={onButtonClick} 
        isActive={isActive}
      />
    </InputGroup.Append>
  </InputGroup>
  )
} 
export default Input;