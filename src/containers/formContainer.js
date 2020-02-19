import React, { Component } from "react";

import FormWrapper from "../components/formwrapper/formWrapper";
import tagsList1 from "../data/tags";
import inputTitles from "../constants/inputTitles";
import {ErrorsList, ErrorNames} from "../constants/errorText";
import postFormData from "../api/api";


export default class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsList: this.constructTags(tagsList1),
      isTagsListOpen: false,
      headerInputValue: "",
      headerInputChars: 0,
      themeInputValue: "",
      themeInputChars: 0,
      questionInput: "",
      options: {
        1: "" 
      },
      tagsError: "",
      headerError: "", 
      optionsError: "",
      photos: {}
    }
  }

  setHeaderValue = (value, length) => {
    this.headerIsValid(length);
    this.setState({
      headerInputValue: value,
      headerInputChars: length
    })
  }

  setThemeValue = (value, length) => {
    this.setState({
      themeInputValue: value,
      themeInputChars: length
    })
  }

  setQuestionValue = value => {
    this.setState({
      questionInput: value,
    })
  }

  setOptionsValue = id => value => {
    const newOptions = this.state.options;
    newOptions[id] = value;
    this.optionsListIsValid(newOptions);

    this.setState({
      options: newOptions
    })
  }
  
  constructTags = tagsList => tagsList.reduce((acc, tag, index) => {
    acc[index] = { tagName: tag, isChosen: false };
    return acc 
  }, {})

  countInputChars = str => str.length;

  onTextAreaChange = (type, id) => event => {
    event.preventDefault()
    const value = event.target.value;
    const length = this.countInputChars(value);
    switch(type) {
      case inputTitles.header:
        this.setHeaderValue(value, length);
        break;
      case inputTitles.theme:
        this.setThemeValue(value, length);
        break;
      case inputTitles.question:
        this.setQuestionValue(value);
        break;
      case inputTitles.option:
        this.setOptionsValue(id)(value);
        break;
      default:
        break;
    }
  }

  onTagClick = id => event => {
    event.preventDefault();
    const tagsList = this.state.tagsList;
    tagsList[id].isChosen = !tagsList[id].isChosen;
    this.tagsListIsValid(tagsList);
    this.setState({
      tagsList: tagsList
    })
  }

  newOptionIsNeeded = (id, options) => {
    const keys = Object.keys(options);
    const length = keys.length;
    const lastKey = keys[length - 1];
    return lastKey === id;
  }

  onOptionClick = id => event => {
    event.preventDefault();
    const options = this.state.options;
    if (this.newOptionIsNeeded(id, options)) {
      this.setOptionsValue(+id + 1)("");
    }
    return;
  }

  onPhotoInputChange = event => {
    const photos = event.target.files;
    const newFiles = Object.keys(photos).reduce((acc, key) => {
      acc[photos[key].name] = photos[key]
      return acc
    }, {})
    this.setState({
      photos: {
        ...this.state.photos, 
        ...newFiles
      } 
    })
  }

  constructFormData = () => {
    const {
      tagsList,
      headerInputValue,
      themeInputValue,
      questionInput,
      options,
      photos
    } = this.state;
    const formData = new FormData();

    formData.append("header", headerInputValue);
    if (themeInputValue) {
      formData.append("theme", themeInputValue);
    }
    if (questionInput) {
      formData.append("question", questionInput);
    }
    Object.keys(tagsList).forEach(key => {
      if(tagsList[key].isChosen) {
        formData.append("tags[]", tagsList[key].tagName);
      }
    })
    Object.keys(options).forEach(key => {
      if (options[key]) {
        formData.append("options[]", options[key]);
      }
    })
    Object.keys(photos).forEach(key => {
      formData.append("photos[]", photos[key]);
    })

    return formData;
  }

  sendData = () => {
    const url = "/qwe"
    const formData = this.constructFormData(); 
    postFormData(url, formData);
  }

  setError = (type, valid=false) => {
    switch(type) {
      case ErrorNames.noTags: 
        if (valid) {
          this.setState({
            tagsError: "",
          })
        } else {
          this.setState({
            tagsError: ErrorsList[ErrorNames.noTags],
          })
        }
        break;
      case ErrorNames.noHeader:
        if (valid) {
          this.setState({
            headerError: "",
          })
        } else {
          this.setState({
            headerError: ErrorsList[ErrorNames.noHeader], 
          })
        }
        break;
      case ErrorNames.moreOptions:
        if (valid) {
          this.setState({
            optionsError: "",
          })
        } else {
          this.setState({
            optionsError: ErrorsList[ErrorNames.moreOptions],
          })
        }
        break;
      default:
        return;
    }
  }

  headerIsValid = headerLength => {
    const validity = headerLength > 0;
    if (!validity) {
      this.setError(ErrorNames.noHeader);
    } else {
      this.setError(ErrorNames.noHeader, true);
    }
    return validity;
  };

  tagsListIsValid = tagsList => {
    const validity = Object.keys(tagsList)
      .some(key => tagsList[key].isChosen === true);
    if (!validity) {
      this.setError(ErrorNames.noTags);
    } else {
      this.setError(ErrorNames.noTags, true);
    }
    return validity;
  } 
  
  optionsListIsValid = options => {
    const validity1 = Object.keys(options).length >= 2;
    const validity2 = validity1 && Object.keys(options)
      .slice(0,2)
      .every(key=>options[key].length > 0)

    if (!validity2) {
      this.setError(ErrorNames.moreOptions);
    } else {
      this.setError(ErrorNames.moreOptions, true);
    }
    return validity2;
  } 

  isDataValid = (headerInputChars, tagsList, options) => {
    const isTagsValid = this.tagsListIsValid(tagsList);
    const isHeaderValid = this.headerIsValid(headerInputChars);
    const isOptionsValid = this.optionsListIsValid(options);
    return isTagsValid && isHeaderValid && isOptionsValid
  }

  onSaveButtonClick = event => {
    event.preventDefault();
    const {headerInputChars, tagsList, options} = this.state;
    if (!this.isDataValid(headerInputChars, tagsList, options)) {
      return;
    }
    this.sendData();
  }

  onCrossClick = () => {
    this.setState({
      isTagsListOpen: !this.state.isTagsListOpen
    })
  }

  onKeyPress = id => event => {
    const neededId = `${+id+1 }`;
    if (event.key === "Enter" && this.newOptionIsNeeded(neededId, this.state.options)) {
      this.setOptionsValue(+id + 2)("");
    }
  }

  optionIsDelitable = (id, options) => !this.newOptionIsNeeded(id, options) && options[id].length > 0

  onDelete = id => () => {
    const options = this.state.options;
    if (this.optionIsDelitable(id, options)) {
      delete options[id];
      this.optionsListIsValid(options);
      this.setState({
        options: options
      })
    }
  }

  render() {
    //console.log(this.state.photos)
    return (
      <FormWrapper 
        state={this.state}
        onTextAreaChange={this.onTextAreaChange}
        onTagClick={this.onTagClick}
        onOptionClick={this.onOptionClick}
        onPhotoInputChange={this.onPhotoInputChange}
        onSaveButtonClick={this.onSaveButtonClick}
        onCrossClick={this.onCrossClick}
        onKeyPress={this.onKeyPress}
        onDelete={this.onDelete}
        optionIsDelitable={this.optionIsDelitable}
      />
    )
  }

}