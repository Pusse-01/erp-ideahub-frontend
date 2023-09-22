import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteJob } from '../features/jobs/jobSlice';

function JobItem({ job }) {
  console.log(job);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleDeleteJob = () => {
    console.log('delete job ran ' + job.job_no);
    dispatch(deleteJob(parseInt(job.job_no)));
  };

  const showStatus = () => {
    switch (job.status) {
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
      <div className="col-start-2 flex items-center ">{job.job_no}</div>
      <div className="col-start-3 col-span-1 flex items-center ">{job.main_job_id.slice(38)}</div>
      <div className="col-start-4 col-span-2 flex items-center ">{job.project_name}</div>
      <div className="col-start-6 col-span-2 flex items-center "> {job.description}</div>
      {(location.pathname && location.pathname === '/jobs-view') || '/jobs-view-design' ? (
        <div className="col-start-8 col-span-2 flex items-center ">{job.stage}</div>
      ) : (
        <div className="col-start-8 col-span-2 flex items-center ">{showStatus()}</div>
      )}
      {/* <div className="col-start-8 col-span-2 flex items-center ">{showStatus()}</div> */}
      <div className="col-start-10 col-span-2 pl-1">{job.brief}</div>

      {location.pathname && location.pathname === '/jobs' ? (
        <div className="col-start-12 col-span-1">
          <div className="dropdown dropdown-end  ">
            <label tabIndex={0} className=" m-1 text-3xl">
              ...
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <li>
                <Link to={`/job/${job.job_no}/add-subtask-enquiry`} className="">
                  Add sub task
                </Link>
              </li>
              <li>
                <Link to={`/job/${job.job_no}/edit`} className="">
                  Edit
                </Link>
              </li>
              <li>
                <div onClick={handleDeleteJob}>Delete</div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

      {location.pathname && location.pathname === '/manufacturing' ? (
        <div className="col-start-12 col-span-1">
          <div className="dropdown dropdown-end  ">
            <label tabIndex={0} className=" m-1 text-3xl">
              ...
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              {job.stage && job.stage === 'Job' ? (
                <li>
                  <Link to={`/new-manufacturing?planId=${job.job_no}`} className="">
                    Add a plan
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {job.stage && job.stage === 'Manufacturing' ? (
                <li>
                  <Link to={`/update-manufacturing?planId=${job.job_no}`} className="">
                    Edit a plan
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

      {location.pathname && location.pathname === '/jobs-view-design' ? (
        <div className="col-start-12 col-span-1">
          <div className="dropdown dropdown-end  ">
            <label tabIndex={0} className=" m-1 text-3xl">
              ...
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <li>
                <Link to={`/job/${job.job_no}/add-subtask-enquiry`} className="">
                  Add sub task
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* <Link to={`/job/${job._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
    </>
  );
}

export default JobItem;
