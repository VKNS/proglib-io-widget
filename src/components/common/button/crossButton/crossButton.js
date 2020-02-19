import React from "react";
import Button from "../button";
import PlusIcon from "../../icons/plusIcon";

const CrossButton = ({ 
  onClick, 
  isShown=true,
  classes="", 
  isActive=false
}) => (
    <Button 
      classes={`btn ${classes}`}
      isActive={isActive}
      variant="outline-secondary"
      isShown={isShown}
      onClick={onClick}
    >
      <div className={isActive ? "btn_active": ""}>
        <PlusIcon />  
      </div>
      
    </Button>
)

export default CrossButton;
