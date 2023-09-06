import React from "react";
import { Link } from "react-router-dom";

function BOMItem({ BOM }) {
  console.log(BOM);

 const showStatus = () =>{
  switch(BOM.purchase_status){
    case 'Pending Purchase' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Pending</div>
    case 'Approved' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Approved</div>
    case 'Revision' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Revision</div>
    case 'Rejected' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>
    case 'Completed' : return <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] text-xs lg:text-sm inline-block">Complete</div>
  }
 }
  
 const handleDownload = () => {
  const fileName = "sh_1687235834581.xlsx";
  const filePath = require(`../resources/${fileName}`);
  const link = document.createElement("a");
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <>
      <div className="col-start-1  "></div>
      <div className="col-start-2  ">{BOM.job_no}</div>
      <div className="col-start-3 col-span-2  ">{BOM.main_job_id}</div>
      <div className="col-start-5 col-span-2  ">{BOM.description}</div>
      <div className="col-start-7 col-span-2  "> {showStatus()}</div>
      <div className="col-start-9 col-span-2">
        <button className="btn btn-sm" onClick={handleDownload}>Download File</button>
      </div>
    </>
  );
}

export default BOMItem;
