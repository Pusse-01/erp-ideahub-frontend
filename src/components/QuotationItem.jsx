import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { deleteQuotation } from "../features/quotations/quotationSlice";

import { format } from "date-fns";
import { useEffect } from "react";
import { downloadQuotation, reset } from "../features/pdf/pdfSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function QuotationItem({ quotation }) {
  console.log(quotation);

  const dispatch = useDispatch()


  const { isLoading, isSuccess, downloadPDFIsError, downloadPDFIsSuccess , message} = useSelector((state) => state.pdf);

  useEffect(()=>{

    // if(downloadPDFIsError){
    //   toast.error('PDF Download Error')
    // }

    // if(downloadPDFIsSuccess){
    //   toast.success('PDF Download Success')
    // }

    dispatch(reset())

  },[downloadPDFIsError, downloadPDFIsSuccess])

const handleDownload = () => {
  dispatch(downloadQuotation({
    "Inquiry_id": quotation.inquiry_id,
    "index_no": quotation.index_no
  }));

  };

 const showStatus = () =>{
  switch(quotation.status){
    case 'Pending' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Pending</div>
    case 'Approved' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Approved</div>
    case 'Revision' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Revision</div>
    case 'Rejected' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>
    case 'Completed' : return <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] text-xs lg:text-sm inline-block">Complete</div>
  }
 }
  

  return (
    <>
      <div className="col-start-1 flex items-center ">{}</div>
      <div className="col-start-2 col-span-2 flex items-center ">{quotation.client_name }</div>
      <div className="col-start-4 col-span-2 flex items-center">{showStatus()}</div>
      <div className="col-start-6 col-span-2 flex items-center ">{quotation.index_no}</div>
      <div className="col-start-8 col-span-2 flex items-center ">
      <button className="btn btn-sm" onClick={()=>handleDownload()}>Quotation PDF</button>
      </div>
      <div className="col-start-10 col-span-2 flex items-center "> {quotation.created_date ? format(new Date(quotation.created_date), 'yyyy-MM-dd')
   : ''}</div>
    </>
  );
}

export default QuotationItem;
