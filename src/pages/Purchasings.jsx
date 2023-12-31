import React, { useEffect } from 'react';

//import { getPurchasingCountAll, getPurchasingCountRevision, getPurchasingCount, getPurchasings, reset } from "../features/purchasings/purchasingSlice";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import PurchasingItem from '../components/PurchasingItem';
import HeadCard from '../components/HeadCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import folderIcon from '../resources/folder.svg';
import infoIcon from '../resources/Info.svg';
import refreshIcon from '../resources/refresh.svg';
import { toast } from 'react-toastify';
import {
  GetrequestsCountOdered,
  GetrequestsCountPending,
  getPurchasings,
  reset as purchasingReset,
} from '../features/purchasing/purchasingSlice';
import BOMItem from '../components/BOMItem';
import {
  getBOMCountCompleted,
  getBOMCountPending,
  getBOMCountNotArrived,
  getBOMs,
  reset,
} from '../features/boms/BOMSlice';

function Purchasings() {
  const {
    purchasings,
    isLoading,
    isSuccess,
    requestsCountOrdered,
    requestsCountPending,
    deletePurchasingIsSuccess,
    deletePurchasingIsError,
    message,
  } = useSelector((state) => state.purchasing);

  const {
    BOMs,
    isLoading: bomIsLoading,
    isSuccess: bomIsSuccess,
    isError: bomIsError,
    BOMCountCompleted,
    BOMCountPending,
    BOMCountNotArrived,
  } = useSelector((state) => state.BOM);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('any');
  const [daysCount, setDaysCount] = useState(30);

  useEffect(() => {
    dispatch(GetrequestsCountOdered());
    dispatch(GetrequestsCountPending());

    //run on unmount
    return () => {
      if (isSuccess) {
        console.log(purchasings);
        dispatch(reset());
      }
    };
  }, []);

  useEffect(() => {
    if (deletePurchasingIsError) {
      toast.error(message);
    }
    if (deletePurchasingIsSuccess) {
      toast.success('Purchasing Deleted!');
      dispatch(
        getPurchasings({
          stateFilter: activeTab,
          cursor: 10,
          daysCount: daysCount,
        })
      );
    }
    //dispatch(reset())
  }, [deletePurchasingIsError, deletePurchasingIsSuccess]);

  useEffect(() => {
    dispatch(
      getBOMs({
        stateFilter: activeTab,
        daysCount: daysCount,
      })
    );
  }, [activeTab, daysCount]);

  if (isLoading) {
    return <Spinner />;
  }

  const clickedDateRange = (e) => {
    setDaysCount(e.target.id);
  };

  const clickedTab = (e) => {
    setActiveTab(e.target.id);
  };

  //   console.log("Before rendering PurchasingItem", purchasings); // Add this log statement to check the purchasings array before mapping

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          {/* <HeadCard icon={folderIcon} value={purchasingCountAll} heading={'Total Purchasings'}/> */}
          <HeadCard icon={infoIcon} value={requestsCountOrdered} heading={'In Revision'} />
          <HeadCard icon={refreshIcon} value={requestsCountPending} heading={'Purchasing count'} />
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Purchasings</h>
        </div>
        <hr />
        {/* Pending Approved Revision rejected */}
        <div className=" inline-block bg-white w-[92%] p-2 lg:p-5 ">
          <div className="tabs">
            <a
              id="any"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'any' ? 'active-tab' : ''
              }`}
            >
              All
            </a>
            <a
              id="Pending"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Pending' ? 'active-tab' : ''
              }`}
            >
              Pending Purchasing
            </a>
            <a
              id="Purchased"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'In Production' ? 'active-tab' : ''
              }`}
            >
              Purchased
            </a>
            <a
              id="In Purchasing"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Completed' ? 'active-tab' : ''
              }`}
            >
              In Purchasing
            </a>
          </div>
        </div>

        <div className=" lg:flex items-center justify-start bg-white w-[92%] p-1 lg:p-5">
          <div className="dropdown dropdown-bottom dropdown-end m-1">
            <label tabIndex={0} className="btn min-h-[40px] h-[40px] min-w-[180px] m-0 ">
              <img src={require('../resources/call.png')} className=" justify-center items-center" />
              {daysCount !== '-1' ? `last ${daysCount} days` : 'All'}
              <img src={require('../resources/darrow.png')} className=" justify-center items-center" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-40 ">
              <li>
                <a id="30" onClick={clickedDateRange}>
                  Last 30 days
                </a>
              </li>
              <li>
                <a id="60" onClick={clickedDateRange}>
                  Last 60 days
                </a>
              </li>
              <li>
                <a id="90" onClick={clickedDateRange}>
                  Last 90 days
                </a>
              </li>
              <li>
                <a id="-1" onClick={clickedDateRange}>
                  All
                </a>
              </li>
            </ul>
          </div>

          {/* <Link to="/new-purchasing" className="font-medium">
            <button
              type="button"
              className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[162px]"
            >
              Create Purchasing
              <img
                src={require("../resources/ic_round-keyboard-arrow-right.png")}
                className=" justify-center items-center"
              />
            </button>
          </Link> */}
        </div>

        <div className="grid grid-cols-11  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          <div className="col-start-2 ">No</div>
          <div className="col-start-3 col-span-2 ">Job Title</div>
          <div className="col-start-5 col-span-2 m-[-2px]">Description</div>
          <div className="col-start-7 col-span-2 ">Purchasing Status</div>
          <div className="col-start-9 col-span-2 pl-1">BOM Files</div>
          <hr className="col-span-11 mx-3 my-3" />
        </div>

        <div className="grid grid-cols-11  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          {BOMs.length > 0
            ? BOMs.map((BOM) => (
                <>
                  <BOMItem key={BOM._id} BOM={BOM} />
                  <hr className="col-span-11 mx-3 my-3" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default Purchasings;
