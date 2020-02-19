import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./photoUploader.scss";

const PhotoUploader = ({
  onChange
}) => {
    return (
      <InputGroup className="photo-uploader">
        <FormControl 
          aria-label="Small" 
          aria-describedby="inputGroup-sizing-default" 
          type="file" 
          name="photo" 
          multiple
          accept="image/*,image/jpeg" 
          onChange={onChange}
          className="form-control"
        />
      </InputGroup>
    )
  } 


export default PhotoUploader;