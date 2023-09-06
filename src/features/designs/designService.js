import axios from "axios";
import API_BASE_URL from "../../config";
const API_URL = `${API_BASE_URL}/design`;

//create a new design
const createDesign = async (designData, files, token) => {
  console.log(designData);
  // Create a new FormData object to include both files and data
  const formData = new FormData();

  //Append files to the FormData object
  files.forEach((file, index) => {
    formData.append(index, file); // Change the key if needed
  });

  formData.append("sitemeaurements", designData.sitemeaurements);
  formData.append("description", designData.description);
  formData.append("files", JSON.stringify(designData.files));
  formData.append("inquiry_no", designData.inquiry_no);
  formData.append("vname", designData.vname);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  };

  const response = await axios.post(
    API_URL + "/createDesign",
    formData,
    config
  );
  console.log("feee");
  return response.data;
};

//create a new design
const updateDesign = async (designData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "/updateEmplyee",
    designData,
    config
  );

  return response.data;
};

//get user designs
const getDesigns = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/getDesigns", filters, config);
  console.log(response.data);

  return response.data.data;
};

//get user design
const getDesign = async (enquiryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/getDesign/" + enquiryId, config);

  return response.data.data;
};

//get user design
const getItemsFromDesign = async (enquiryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/ItemsfromDesign/" + enquiryId, config);

  return response.data.data;
};

//get user design
const deleteDesign = async (designId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "/deleteDesign/" + designId,
    config
  );

  return response.data;
};

const designService = {
  createDesign,
  getDesigns,
  getDesign,
  updateDesign,
  deleteDesign,
  getItemsFromDesign
};

export default designService;
