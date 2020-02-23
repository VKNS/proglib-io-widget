import React from "react";
import Button from "../../common/button/button";
import PhotoUploader from "../../common/uploadInput/PhotoUploader";


const Footer = ({
  onSaveButtonClick, 
  onPhotoInputChange
}) => (
  <div className="form__footer">
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