import axios from 'axios';
import download from 'downloadjs';
import API_BASE_URL from '../../config';
const API_URL = `${API_BASE_URL}/pdf`;

const DownloadQuotationPDF = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: 'arraybuffer', // Tell Axios to expect a binary response
    },
  };

  const response = await axios.post(API_URL + '/CreateQuotationPDF', data, config);

  const pdf = response.data.pdfBase64;
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement('a');
  const fileName = 'quotation_' + data.index_no + '.pdf';
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

const CreateBOMPDF = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: 'arraybuffer', // Tell Axios to expect a binary response
    },
  };

  const response = await axios.post(API_URL + '/CreateBOMPDF', data, config);

  const pdf = response.data.pdfBase64;
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement('a');
  const fileName = 'bom_' + data.index_no + '.pdf';
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

const CreateQSCostingPDF = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: 'arraybuffer', // Tell Axios to expect a binary response
    },
  };

  const response = await axios.post(API_URL + '/CreateQSCostPDF', data, config);

  const pdf = response.data.pdfBase64;
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement('a');
  const fileName = 'qscosting_' + data.index_no + '.pdf';
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

const pdfService = {
  DownloadQuotationPDF,
  CreateBOMPDF,
  CreateQSCostingPDF,
};

export default pdfService;
