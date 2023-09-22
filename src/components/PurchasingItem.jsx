import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
//import { deletePurchasing } from "../features/purchasings/purchasingSlice";

function PurchasingItem({ purchasing }) {
  console.log(purchasing);

  const dispatch = useDispatch();

  //   const handleDeletePurchasing = () =>{
  //     console.log("delete purchasing ran "+purchasing.index_no)
  //     dispatch(deletePurchasing(parseInt(purchasing.index_no) ))
  //   }

  const showStatus = () => {
    switch (purchasing.status) {
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
      <div className="col-start-1 flex items-center "></div>
      <div className="col-start-2 col-span-2 flex items-center ">{purchasing.item}</div>
      <div className="col-start-4 col-span-2 flex items-center">{showStatus()}</div>
      <div className="col-start-6 col-span-2 flex items-center ">{purchasing.description}</div>
      <div className="col-start-8 col-span-2 flex items-center "> {purchasing.remarks}</div>
      <div className="col-start-10 col-span-2 flex items-center ">{purchasing.arriving_date}</div>
      {/* <div className="col-start-11 col-span-1 ">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" m-1 text-3xl">
          ...
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
            <Link to={`/purchasing/${purchasing.index_no}/edit`} className="">
                Edit
              </Link>
            </li>
            <li>
            <div onClick={handleDeletePurchasing}>Delete</div>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <Link to={`/purchasing/${purchasing._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
    </>
  );
}

export default PurchasingItem;
