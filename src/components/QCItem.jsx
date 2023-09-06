import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deleteQC } from "../features/qcs/qcSlice";

function QCItem({ qc }) {

  const dispatch = useDispatch()

//   const handleDeleteQC = () =>{
//     console.log("delete qc ran "+qc.qc_no)
//     dispatch(deleteQC(parseInt(qc.qc_no) ))
//   }

const showStatus = (status) => {
    switch (status) {
      case "ongoing":
        return (
          <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] w-[80px] inline-block text-xs lg:text-sm text-center ">
            Ongoing
          </div>
        );
      case "new":
        return (
          <div className=" rounded p-2 bg-[#fbc4ea] text-[#1b140a] w-[80px] inline-block text-xs lg:text-sm text-center ">
            New
          </div>
        );
      case "complete":
        return (
          <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] w-[80px] text-xs lg:text-sm inline-block text-center">
            Complete
          </div>
        );
    }
  };

  return (
    <>
      <div className="col-start-2 flex items-center ">{qc.index_no}</div>
      <div className="col-start-3 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">{qc.task_name}</div>
      <div className="col-start-5 col-span-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">{qc.description}</div>
      <div className="col-start-7 col-span-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis"> {qc.emp_no}</div>
      <div className="col-start-9 col-span-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">{qc.remarks[0]['remarks']}</div> {/*TODO */}
      <div className="col-start-11 col-span-2 pl-1">{showStatus(qc.remarks[0]['status'])}</div>

      {/* {location.pathname && location.pathname === '/qcs' ? <div className="col-start-12 col-span-1">
        <div className="dropdown dropdown-end  ">
          <label tabIndex={0} className=" m-1 text-3xl">
            ...
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <Link to={`/qc/${qc.qc_no}/add-subtask-enquiry`} className="">
                Add sub task
              </Link>
            </li>
            <li>
            <Link to={`/qc/${qc.qc_no}/edit`} className="">
                Edit
              </Link>
            </li>
            <li>
            <div onClick={handleDeleteQC}>Delete</div>
                
              
            </li>
          </ul>
        </div>
      </div> : <></>
      } */}
      {/* <Link to={`/qc/${qc._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
    </>
  );
}

export default QCItem;
