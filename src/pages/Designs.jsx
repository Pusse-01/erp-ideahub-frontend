import React, { useEffect } from 'react';

import { getDesigns, reset } from '../features/designs/designSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import DesignItem from '../components/DesignItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { toast } from 'react-toastify';

function Designs() {
  const { designs, isLoading, isSuccess, deleteDesignIsSuccess, deleteDesignIsError, message } = useSelector(
    (state) => state.design
  );

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('any');
  const [daysCount, setDaysCount] = useState(30);

  useEffect(() => {
    //run on unmount
    return () => {
      if (isSuccess) {
        console.log(designs);
        //dispatch(reset());
      }
    };
  }, []);

  useEffect(() => {
    if (deleteDesignIsError) {
      toast.error(message);
    }
    if (deleteDesignIsSuccess) {
      toast.success('Design Deleted!');
      dispatch(
        getDesigns({
          stateFilter: activeTab,
          daysCount: daysCount,
        })
      );
    }
    dispatch(reset());
  }, [deleteDesignIsError, deleteDesignIsSuccess]);

  useEffect(() => {
    dispatch(
      getDesigns({
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

  console.log('Before rendering DesignItem', designs); // Add this log statement to check the designs array before mapping

  return (
    <>
      <div className="drawer-content-custom f9">
        {/* <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          <HeadCard icon={folderIcon} value={designCountAll} heading={'Total Designs'}/>
          <HeadCard icon={infoIcon} value={designCountRevision} heading={'In Revision'}/>
          <HeadCard icon={refreshIcon} value={designCount} heading={'Design count'}/>
        </div> */}
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Designs</h>
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
              Pending
            </a>
            <a
              id="Approved"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Approved' ? 'active-tab' : ''
              }`}
            >
              Approved
            </a>
            <a
              id="Revision"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Revision' ? 'active-tab' : ''
              }`}
            >
              In Review
            </a>
            <a
              id="Completed"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Completed' ? 'active-tab' : ''
              }`}
            >
              Completed
            </a>
            <a
              id="Rejected"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Rejected' ? 'active-tab' : ''
              }`}
            >
              Rejected
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white w-[92%] p-1 lg:p-5">
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

          <Link to="/new-design" className="font-medium">
            <button
              type="button"
              className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[162px]"
            >
              Create Design
              <img
                src={require('../resources/ic_round-keyboard-arrow-right.png')}
                className=" justify-center items-center"
              />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-14 grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          <div className="col-start-2 col-span-2 ">Order ID</div>
          <div className="col-start-4 col-span-2">Project Name</div>
          <div className="col-start-6 col-span-2  ">Customer Name</div>
          <div className="col-start-8 col-span-2 ">Status</div>
          <div className="col-start-10 col-span-2 ">Design Version</div>
          <div className="col-start-12 col-span-2 ">Last Update</div>
          <div className="col-start-14 col-span-1 "></div>
          <hr className="col-span-14 mx-3 my-3" />
        </div>

        {/* grid-flow-row */}
        <div className="grid grid-cols-14 bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          {/* {<DesignItem key={designs.data[0]._id} design={designs.data[0]} />} */}

          {designs.length > 0
            ? designs.map((design) => (
                <>
                  <DesignItem key={design._id} design={design} />
                  <hr className="col-span-12 mx-3 my-3" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default Designs;
