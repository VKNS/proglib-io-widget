import React from "react";
import TagsListWrapper from "../tagsList/tagsListWrapper";
import TextArea from "../common/textAreaWrapper/textAreaWrapper";
import InputTitles from "../../constants/inputTitles";
import CharCountWrapper from "../common/charCountWpapper/charCountWrapper";
import OptionsList from "../optionsList/optionsList";
import ErrorComponent from "../common/errorWrapper/errorComponent";
import Footer from "../footer/footer";
import "./formWrapper.scss";


const FormWrapper = ({
  state, 
  onTextAreaChange, 
  onTagClick, 
  onOptionClick, 
  onPhotoInputChange, 
  onSaveButtonClick,
  onCrossClick,
  onKeyPress,
  onDelete,
  optionIsDelitable
}) => {
  const {tagsError, headerError, optionsError} = state;
  return (
    <div className="form-wrapper">
      <form>
        <div className="form">
          <TagsListWrapper 
            tags={state.tagsList} 
            onTagClick={onTagClick}
            isTagsListOpen={state.isTagsListOpen}
            onCrossClick={onCrossClick}
          />
          {tagsError && (<ErrorComponent value={tagsError}/>)}
          <TextArea
            value={state.headerInputValue}
            InputClasses={"text-area__input_header"}
            inputTitle={InputTitles.header} 
            onChange={onTextAreaChange(InputTitles.header)}
            childrenClasses={"text-area__counter"}
            placeHolder="Заголовок"
          >
            <CharCountWrapper value={state.headerInputChars}/>
          </TextArea>
          {headerError && 
          (<ErrorComponent 
            value={headerError} 
            classes="alert-custom_position_upper"
          />)}
          <TextArea
            value={state.themeInputValue}
            inputTitle={InputTitles.theme} 
            onChange={onTextAreaChange(InputTitles.theme)}
            childrenClasses={"text-area__counter"}
            placeHolder="Что вы хотите обсудить?"
          >
            <CharCountWrapper value={state.themeInputChars}/>
          </TextArea>
          <TextArea
            value={state.questionInput}
            inputTitle={InputTitles.question} 
            onChange={onTextAreaChange(InputTitles.question)}
            placeHolder="Задайте вопрос"
          />
          <OptionsList 
            options={state.options}
            onChange={onTextAreaChange}
            onClick={onOptionClick}
            type={InputTitles.option}
            onKeyPress={onKeyPress}
            onDelete={onDelete}
            optionIsDelitable={optionIsDelitable}
          />
          {optionsError && (<ErrorComponent value={optionsError} classes="alert-custom_position_upper"/>)}
          <Footer 
            onPhotoInputChange={onPhotoInputChange}
            onSaveButtonClick={onSaveButtonClick}
          />
        </div>
      </form>
    </div>
  )
}

export default FormWrapper;