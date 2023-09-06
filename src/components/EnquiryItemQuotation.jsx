import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEnquiry } from "../features/enquiries/enquirySlice";

function EnquiryItemQuotation({ enquiry }) {
  console.log(enquiry);

  const dispatch = useDispatch()

  const handleDeleteEnquiry = () =>{
    console.log("delete enquiry ran "+enquiry.index_no)
    dispatch(deleteEnquiry(parseInt(enquiry.index_no) ))
  }

 const showStatus = () =>{
  switch(enquiry.status){
    case 'Pending' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Pending</div>
    case 'Approved' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Approved</div>
    case 'Revision' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Revision</div>
    case 'Rejected' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>
    case 'Completed' : return <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] text-xs lg:text-sm inline-block">Complete</div>
  }
 }
  

  return (
    <>
      <div className="col-span-1 flex items-center "></div>
      <div className="col-start-2 col-span-1 flex items-center ">{enquiry.index_no}</div>
      {/* <div className="col-span-2 flex items-center">{enquiry.client_name}</div> */}
      <div className="col-span-2 flex items-center ">{enquiry.project_name}</div>
      <div className="col-span-2 flex items-center "> {showStatus()}</div>
      <div className="col-span-2 flex items-center ">{enquiry.brief}</div>
      <div className="col-span-1 ">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" m-1 text-3xl">
          ...
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
            <Link to={`/quotation/${enquiry.index_no}/view`} className="">
                View
              </Link>
            </li>
            {/* <li>
            <Link to={`/enquiry/${enquiry.index_no}/edit`} className="">
                Edit
              </Link>
            </li> */}
            {/* <li>
            <div onClick={handleDeleteEnquiry}>Delete</div>
            </li> */}
          </ul>
        </div>
      </div>
      {/* <Link to={`/enquiry/${enquiry._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
    </>
  );
}

export default EnquiryItemQuotation;
