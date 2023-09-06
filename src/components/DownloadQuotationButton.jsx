import React from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/pdf`;

const DownloadQuotationPDFButton = ({ Inquiry_id, index_no, token }) => {

  const body = {
    Inquiry_id: Inquiry_id,
    index_no: index_no
  }

  const handleDownload = async () => {
    try {
      const response = await axios.post(API_URL + '/CreateQuotationPDF', body, {
        responseType: 'blob', // Tell Axios to expect a binary response
        Authorization: `Bearer ${token}`
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Quotation.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};

export default DownloadQuotationPDFButton;
