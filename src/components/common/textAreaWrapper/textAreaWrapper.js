import React from "react";
import { Form } from "react-bootstrap";
import "./textAreaWrapper.scss";

const TextArea = ({ 
  value, 
  InputClasses="", 
  wrapperClasses="", 
  inputTitle, 
  onChange, 
  children,
  childrenClasses,
  placeHolder,
  rows=1
}) => {
  return (<Form.Group className={`text-area  ${wrapperClasses}`} >
            <Form.Label
              htmlFor={inputTitle} 
              className={`text-area__label`}
            >
              {inputTitle}
            </Form.Label>
            <Form.Control 
              as="textarea" 
              className={`text-area__input ${InputClasses}`}
              id={inputTitle} 
              onChange={onChange}
              value={value}
              placeholder={placeHolder}
              rows={rows}
            />
            <div className={childrenClasses}>
              {children}
            </div>
          </Form.Group>)}

export default TextArea;

