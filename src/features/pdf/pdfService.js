import axios from "axios";
import download from "downloadjs";
import API_BASE_URL from "../../config";
const API_URL = `${API_BASE_URL}/pdf`;

const DownloadQuotationPDF = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: 'arraybuffer', // Tell Axios to expect a binary response
    },
  };

  const response = await axios.post(
    API_URL + "/CreateQuotationPDF",
    data,
    config
  );

  const pdf = response.data.pdfBase64
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "abc.pdf";
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();

  //   console.log(response.headers)
  //   const blob = new Blob([response.data], { type: "application/pdf" });

  //   // Check for Content-Disposition header and extract filename
  // const contentDisposition = response.headers["content-disposition"];
  // if (contentDisposition) {
  //   const filenameMatch = contentDisposition.match(/filename="(.*?)"/);
  //   if (filenameMatch && filenameMatch[1]) {
  //     blob.name = filenameMatch[1];
  //   }
  // }

  //   window.open(URL.createObjectURL(blob));

};

const pdfService = {
  DownloadQuotationPDF,
};

export default pdfService;
