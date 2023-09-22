import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteQC } from '../features/qcs/qcSlice';

function QCItem({ qc }) {
  const dispatch = useDispatch();
  const location = useLocation();

  //   const handleDeleteQC = () =>{
  //     console.log("delete qc ran "+qc.qc_no)
  //     dispatch(deleteQC(parseInt(qc.qc_no) ))
  //   }

  const showStatus = (status) => {
    switch (status) {
      case 'ongoing':
        return (
          <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] w-[80px] inline-block text-xs lg:text-sm text-center ">
            Ongoing
          </div>
        );
      case 'new':
        return (
          <div className=" rounded p-2 bg-[#fbc4ea] text-[#1b140a] w-[80px] inline-block text-xs lg:text-sm text-center ">
            New
          </div>
        );
      case 'complete':
        return (
          <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] w-[80px] text-xs lg:text-sm inline-block text-center">
            Complete
          </div>
        );
      case 'Revision':
        return (
          <div className=" rounded p-2 bg-[#fa9797] text-[#000000] w-[80px] text-xs lg:text-sm inline-block text-center">
            Revision
          </div>
        );
    }
  };

  return (
    <>
      <div className="col-start-1 flex items-center ">{qc.index_no}</div>
      <div className="col-start-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {qc.job_no}
      </div>
      <div className="col-start-3 col-span-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {qc.project_name}
      </div>
      <div className="col-start-5 col-span-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {' '}
        {qc.description}
      </div>
      <div className="col-start-7 col-span-2 flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {showStatus(qc.status)}
      </div>{' '}
      {/*TODO */}
      {location.pathname && location.pathname === '/qcs' ? (
        <div className="col-start-9 col-span-1">
          <div className="dropdown dropdown-end  ">
            <label tabIndex={0} className=" m-1 text-3xl">
              ...
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <li>
                <Link to={`/view-qc?qcId=${qc.index_no}`} className="">
                  View Items
                </Link>
              </li>
              {/* <li>
            <Link to={`/qc/${qc.qc_no}/edit`} className="">
                Edit
              </Link>
            </li> */}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default QCItem;
