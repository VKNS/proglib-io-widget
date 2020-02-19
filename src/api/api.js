import axios from "axios";


const postFormData = (url, formData) => {
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
  }
  axios.post(url, formData, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export default postFormData;