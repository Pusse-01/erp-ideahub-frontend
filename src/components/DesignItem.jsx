import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDesign } from '../features/designs/designSlice';

function DesignItem({ design }) {
  console.log(design);

  const dispatch = useDispatch();

  const handleDeleteDesign = () => {
    console.log('delete design ran ' + design.index_no);
    dispatch(deleteDesign(parseInt(design.index_no)));
  };

  const showStatus = () => {
    switch (design.status) {
      case 'Pending':
        return (
          <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Pending</div>
        );
      case 'Approved':
        return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Approved</div>;
      case 'Revision':
        return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Revision</div>;
      case 'Rejected':
        return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>;
      case 'Completed':
        return <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] text-xs lg:text-sm inline-block">Complete</div>;
    }
  };

  return (
    <>
      <div className="col-start-2 col-span-2 flex items-center">{design.inquiry_no}</div>
      <div className="col-start-4 col-span-2 flex items-center">{design.project_name}</div>
      <div className="col-start-6 col-span-2 flex items-center">{design.client_name}</div>
      <div className="col-start-8 col-span-2 flex items-center">{showStatus()}</div>      
      <div className="col-start-10 col-span-2 flex items-center">{design.vname}</div>
      <div className="col-start-12 col-span-2 flex items-center">Last Update</div>
      <div className="col-start-14 col-span-1 ">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" m-1 text-3xl">
            ...
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
            <li>
              <Link to={`/design/${design.inquiry_no}/view`} className="">
                View
              </Link>
            </li>
            <li>
              <div onClick={handleDeleteDesign}>Delete</div>
            </li>
          </ul>
        </div>
      </div>
      {/* <Link to={`/design/${design._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
    </>
  );
}

export default DesignItem;
