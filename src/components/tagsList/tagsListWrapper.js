import React from "react";
import Button from "../common/button/button";
import CrossButton from "../common/button/crossButton/crossButton";
import "./tagsListWrapper.scss";

export default ({ 
  tags, 
  onTagClick, 
  isTagsListOpen, 
  onCrossClick 
}) => {
  //console.log(isTagsListOpen)
  return (
  <div className={`tags-list ${isTagsListOpen ? "": "tags-list_disabled"}`}>
    <CrossButton
      classes="btn_cross tags-list__cross-button"
      isActive={isTagsListOpen}
      onClick={onCrossClick}
    />
    {
      Object.keys(tags)
        // .reduce((acc, key) => {

        // }, [])
        .map(key => (
        <Button 
          key={key} 
          value={tags[key].tagName} 
          classes="btn tags-list__item"
          onClick={onTagClick(key)}
          variant="outline-primary"
          isActive={tags[key].isChosen}
        />))
    } 
  </div>)
}