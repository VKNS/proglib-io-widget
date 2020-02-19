import React from "react";
import Button from "../common/button/button";
import PhotoUploader from "../common/uploadInput/PhotoUploader";
import "./footer.scss";


const Footer = ({
  onSaveButtonClick, 
  onPhotoInputChange
}) => (
  <div className="footer">
    <PhotoUploader 
      onChange={onPhotoInputChange}
    />
    <Button 
      value={"Сохранить"}
      onClick={onSaveButtonClick}
      classes={"btn_save"}
      variant="primary"
    />
  </div>
)

export default Footer;