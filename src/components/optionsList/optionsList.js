import React from "react";
import Input from "../common/Input/input"

const OptionsList = ({
  options, 
  onClick, 
  onChange, 
  type, 
  onKeyPress, 
  onDelete,
  optionIsDelitable
}) => {
  const optionsKeys = Object.keys(options);
  return (
    <div className={`options-list`}>
      {optionsKeys.map((key, id) => (
        <Input 
          key={key}
          onClick={onClick(key)}
          onChange={onChange(type, key)}
          value={options[key]}
          placeHolder={`Вариант #${id + 1}`}
          onKeyPress={onKeyPress(key)}
          onButtonClick={onDelete(key)}
          isActive={optionIsDelitable(key, options)}
        />
      ))}
    </div>
  )
} 

export default OptionsList;