import React from "react";
import "./charCountWrapper.scss"

const CharCountWrapper = ({ 
  value, 
  classNames 
}) => (
  <div className={`char-counter ${classNames}`}>
    {value}
  </div>
)

export default CharCountWrapper;