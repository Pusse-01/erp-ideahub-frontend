import React, { useEffect } from 'react';

import { getJobCountAll, getJobCountProduction, getJobCountRevision, getJobs, reset } from '../features/jobs/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import JobItem from '../components/JobItem';
import HeadCard from '../components/HeadCard';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import folderIcon from '../resources/folder.svg';
import infoIcon from '../resources/Info.svg';
import refreshIcon from '../resources/refresh.svg';
import { toast } from 'react-toastify';

function Jobs() {
  const {
    jobs,
    isLoading,
    isSuccess,
    jobCount,
    jobCountRevision,
    jobCountProduction,
    deleteJobIsSuccess,
    deleteJobIsError,
    message,
  } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const location = useLocation();

  const [activeTab, setActiveTab] = useState('any');
  const [daysCount, setDaysCount] = useState(30);

  useEffect(() => {
    //console.log(location)
    dispatch(getJobCountAll());
    dispatch(getJobCountRevision());
    dispatch(getJobCountProduction());

    //run on unmount
    return () => {
      if (isSuccess) {
        console.log(jobs);
        //dispatch(reset());
      }
    };
  }, []);

  useEffect(() => {
    dispatch(
      getJobs({
        // "date": "1999-07-28",
        stateFilter: activeTab,
        // "cursor":10,
        daysCount: daysCount,
      })
    );
  }, [activeTab, daysCount]);

  useEffect(() => {
    if (deleteJobIsError) {
      toast.error(message);
    }
    if (deleteJobIsSuccess) {
      toast.success('Job Deleted!');
      dispatch(
        getJobs({
          stateFilter: activeTab,
          daysCount: daysCount,
        })
      );
      dispatch(getJobCountAll());
      dispatch(getJobCountRevision());
      dispatch(getJobCountProduction());
    }
    dispatch(reset());
  }, [deleteJobIsError, deleteJobIsSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  const clickedDateRange = (e) => {
    setDaysCount(e.target.id);
  };

  const clickedTab = (e) => {
    setActiveTab(e.target.id);
  };

  console.log('Before rendering JobItem', jobs); // Add this log statement to check the jobs array before mapping

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          <HeadCard icon={folderIcon} value={jobCount} heading={'Total Projects'} />
          <HeadCard icon={infoIcon} value={jobCountRevision} heading={'In Revision'} />
          <HeadCard icon={refreshIcon} value={jobCountProduction} heading={'In Production'} />
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Projects</h>
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
              id="In Production"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === 'In Production' ? 'active-tab' : ''
              }`}
            >
              In Manufacturing
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

          {location.pathname && location.pathname === '/jobs' ? (
            <Link to="/new-job" className="font-medium">
              <button
                type="button"
                className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[128px]"
              >
                Create Job
                <img
                  src={require('../resources/ic_round-keyboard-arrow-right.png')}
                  className=" justify-center items-center"
                />
              </button>
            </Link>
          ) : (
            <></>
          )}

          {location.pathname && location.pathname === '/manufacturing' ? (
            <Link to="/new-manufacturing" className="font-medium">
              <button
                type="button"
                className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[128px]"
              >
                Manufacturing
                <img
                  src={require('../resources/ic_round-keyboard-arrow-right.png')}
                  className=" justify-center items-center"
                />
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>

        <div className="grid grid-cols-11 grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm font-bold text-gray-500">
          {/* <div className="col-start-1 "></div> */}
          {/* <div className="col-start-2 ">No.</div> */}
          <div className="col-start-2 col-span-1 ">Job No.</div>
          <div className="col-start-3 col-span-2 ">Project Name</div>
          <div className="col-start-5 col-span-2 m-[-2px]">Description</div>
          {/* <div className="col-start-8 col-span-2 ">Production Status</div> */}
          {location.pathname && location.pathname === '/jobs' ? (
            <div className="col-start-7 col-span-2 ">Production Status</div>
          ) : (
            <></>
          )}
          {location.pathname && location.pathname === '/jobs-view' ? (
            <div className="col-start-7 col-span-2 ">Stage</div>
          ) : (
            <></>
          )}
          <div className="col-start-9 col-span-2 pl-1">Remarks</div>
          <hr className="col-span-11 mx-3 my-3" />
        </div>

        <div className="grid grid-cols-11  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm">
          {jobs.length > 0
            ? jobs.map((job) => (
                <>
                  <JobItem key={job._id} job={job} />
                  <hr className="col-span-12 mx-3 my-3" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default Jobs;
