import React, { useEffect } from 'react';

import {
  getEnquiryCountAll,
  getEnquiryCountRevision,
  getEnquiryCount,
  getEnquiries,
  reset,
} from '../features/enquiries/enquirySlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import EnquiryItem from '../components/EnquiryItem';
import HeadCard from '../components/HeadCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import folderIcon from '../resources/folder.svg';
import infoIcon from '../resources/Info.svg';
import refreshIcon from '../resources/refresh.svg';
import { toast } from 'react-toastify';
import EnquiryItemDesign from '../components/EnquiryItemDesign';
import { getDesigns } from '../features/designs/designSlice';

function DesignDashboardEnquiries() {
  const {
    enquiries,
    isLoading,
    isSuccess,
    enquiryCount,
    enquiryCountRevision,
    enquiryCountAll,
    deleteEnquiryIsSuccess,
    deleteEnquiryIsError,
    message,
  } = useSelector((state) => state.enquiry);

  const {
    // job,
    isLoading: designIsLoading,
    // isSuccess: designIsSuccess,
    designs,
  } = useSelector((state) => state.design);

  const dispatch = useDispatch();

  const [enquiryWithDesigns, setEnquiryWithDesigns] = useState([]);

  const [activeTab, setActiveTab] = useState('any');
  const [daysCount, setDaysCount] = useState(30);

  useEffect(() => {
    dispatch(getEnquiryCountAll());
    dispatch(getEnquiryCountRevision());
    dispatch(getEnquiryCount());

    //run on unmount
    return () => {
      if (isSuccess) {
        console.log(enquiries);
        //dispatch(reset());
      }
    };
  }, []);

  useEffect(() => {
    if (deleteEnquiryIsError) {
      toast.error(message);
    }
    if (deleteEnquiryIsSuccess) {
      toast.success('Enquiry Deleted!');
      dispatch(
        getEnquiries({
          stateFilter: activeTab,
          daysCount: daysCount,
        })
      );
      dispatch(getEnquiryCountAll());
      dispatch(getEnquiryCountRevision());
      dispatch(getEnquiryCount());
    }
    dispatch(reset());
  }, [deleteEnquiryIsError, deleteEnquiryIsSuccess]);

  useEffect(() => {
    if (activeTab === 'designs') {
      dispatch(
        getDesigns({
          stateFilter: 'any',
          daysCount: daysCount,
        })
      );
    } else {
      dispatch(
        getEnquiries({
          stateFilter: activeTab,
          daysCount: daysCount,
        })
      );
    }
  }, [activeTab, daysCount]);

  useEffect(() => {
    if (designs && designs.length > 0) {
      const newArray = [];

      const seenInquiryNos = new Set();

      for (const obj of designs) {
        if (!seenInquiryNos.has(obj.inquiry_no)) {
          seenInquiryNos.add(obj.inquiry_no);
          newArray.push({
            project_name: obj.project_name,
            client_name: obj.client_name,
            status: obj.status,
            brief: obj.brief,
            inquiry_no: obj.inquiry_no,
            index_no: obj.inquiry_no,
          });
        }
      }

      setEnquiryWithDesigns(newArray);
    }

    //console.log(newArray);
  }, [designs]);

  if (isLoading) {
    return <Spinner />;
  }

  const clickedDateRange = (e) => {
    setDaysCount(e.target.id);
  };

  const clickedTab = (e) => {
    setActiveTab(e.target.id);
  };

  console.log('Before rendering EnquiryItem', enquiries); // Add this log statement to check the enquiries array before mapping

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          <HeadCard icon={folderIcon} value={enquiryCountAll} heading={'Total Enquiries'} />
          <HeadCard icon={infoIcon} value={enquiryCountRevision} heading={'In Revision'} />
          <HeadCard icon={refreshIcon} value={enquiryCount} heading={'Enquiry count'} />
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Job Inquiries</h>
          <p className=" font-normal text-base text-[#9FA1A6]">You Have requests awaiting your approval</p>
        </div>
        <hr />
        {/* Pending Approved Revision rejected */}
        <div className=" inline-block bg-white w-[92%] p-2 lg:p-5 ">
          <div className="tabs">
            <a
              id="designs"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'designs' ? 'active-tab' : ''
              }`}
            >
              Designs
            </a>
            <a
              id="any"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'any' ? 'active-tab' : ''
              }`}
            >
              Total Requests
            </a>
            <a
              id="Approved"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Approved' ? 'active-tab' : ''
              }`}
            >
              Approved Requests
            </a>
            <a
              id="Pending"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'Pending' ? 'active-tab' : ''
              }`}
            >
              Pending Requests
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

          <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] min-h-0 h-[40px] m-1 w-[310px]">
            <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
              <button>
                <img src={require('../resources/charm_search.png')} className=" justify-center items-center" />
              </button>
            </span>
            <input
              class=" py-2 lg:w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded text-sm  min-w-[120px]"
              type="text"
              placeholder="Search or type a command (Ctrl + G)"
              // value={project_start ? project_start.toISOString().slice(0, 10) : null}
              // onChange={handleProject_startDateSelect}
            />
          </form>

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

        <div className="grid grid-cols-9  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          <div className=" col-span-1 flex items-center"></div>
          <div className=" col-span-1 flex items-center">No</div>
          {/* <div className=" col-span-2 ">Client name</div> */}
          <div className=" col-span-2 flex items-center m-[-2px]">Project name</div>
          <div className=" col-span-2 flex items-center ">Status</div>
          <div className=" col-span-2 flex items-center pl-1">Brief</div>
          <hr className=" col-span-9 mx-3 my-3" />
        </div>

        <div className="grid grid-cols-9  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          {/* {<EnquiryItem key={enquiries.data[0]._id} enquiry={enquiries.data[0]} />} */}

          {activeTab === 'designs' ? (
            <>
              {enquiryWithDesigns && enquiryWithDesigns.length > 0
                ? enquiryWithDesigns.map((enquiry) => (
                    <>
                      <EnquiryItemDesign key={enquiry._id} enquiry={enquiry} />
                      <hr className="col-span-9 mx-3 my-3" />
                    </>
                  ))
                : null}
            </>
          ) : (
            <>
              {enquiries.length > 0
                ? enquiries.map((enquiry) => (
                    <>
                      <EnquiryItemDesign key={enquiry._id} enquiry={enquiry} />
                      <hr className="col-span-9 mx-3 my-3" />
                    </>
                  ))
                : null}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DesignDashboardEnquiries;
