import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { getJob, GetJobIdsProductionExists } from '../features/jobs/jobSlice';
import { getTasksByJobNo } from '../features/tasks/taskSlice';
//import { purchasingSchema } from "../validationSchemas/PurchasingSchema";
import {
  createPurchasing,
  reset as PurchasingReset,
  UpdaterequestStatus,
} from '../features/purchasing/purchasingSlice';
import {
  GetrequestsCountOdered,
  GetrequestsCountPending,
  getPurchasings,
} from '../features/purchasing/purchasingSlice';

function UpdatePurchasing() {
  const { user } = useSelector((state) => state.auth);

  //   const {
  //     tasks,
  //     isLoading: taskIsLoading,
  //     isSuccess: taskIsSuccess,
  //     isError: taskIsError,
  //   } = useSelector((state) => state.task);

  //   const {
  //     job,
  //     jobIDs,
  //     isLoading: jobIsLoading,
  //     isSuccess: jobIsSuccess,
  //     message: jobMessage,
  //   } = useSelector((state) => state.job);

  const {
    bom,
    bomIDs,
    isLoading: bomIsLoading,
    isSuccess: bomIsSuccess,
    message: bomMessage,
  } = useSelector((state) => state.BOM);

  const {
    purchasing,
    purchasings,
    createPurchasingIsError,
    createPurchasingIsSuccess,
    updatePurchasingIsSuccess,
    updatePurchasingIsError,
    message: purchasingMessage,
  } = useSelector((state) => state.purchasing);

  const { bomId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const { jobId } = useParams();

  const [project_name, setProject_name] = useState('');
  const [job_no, setJob_no] = useState(11);
  const [description, setDescription] = useState('');

  const [initTaskItems, setInitTaskItems] = useState([]);
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    if (createPurchasingIsError) {
      toast.error(purchasingMessage);
    }

    if (createPurchasingIsSuccess) {
      toast.success('Purchasing Added!');
      dispatch(PurchasingReset());
      navigate('/purchasings');
    }

    dispatch(PurchasingReset());
  }, [dispatch, navigate, purchasingMessage, createPurchasingIsError, createPurchasingIsSuccess]);

  useEffect(() => {
    if (updatePurchasingIsError) {
      toast.error(purchasingMessage);
    }

    if (updatePurchasingIsSuccess) {
      toast.success('Purchasing Status Updated!');
    }
    dispatch(PurchasingReset());
  }, [updatePurchasingIsError, updatePurchasingIsSuccess]);

  useEffect(() => {
    dispatch(
      getPurchasings({
        stateFilter: 'any',
        cursor: 1000,
        daysCount: 180,
      })
    );
  }, []);

  //   useEffect(() => {
  //     if (job_no) {
  //       dispatch(getJob(job_no))
  //       dispatch(getTasksByJobNo(job_no));
  //     }
  //   }, [job_no]);

  //   useEffect(() => {
  //     if (job) {
  //       setProject_name(job.project_name)
  //     }
  //   }, [job]);

  useEffect(() => {
    if (purchasings && purchasings.length > 0) {
      setTaskItems([...purchasings]);
      setInitTaskItems([...purchasings]);
    }
  }, [purchasings]);

  const onSubmit = (e) => {
    // e.preventDefault();
    // const purchasingTasks = taskItems.map((task,index)=>{
    //   if(task.remarks || (task.status !== initTaskItems[index].status) ){
    //     return {
    //       task_id:task.index_no,
    //       remarks:task.remarks || '',
    //       status: task.status
    //     }
    //   }
    // })
    // const filteredArray = purchasingTasks.filter((element) => element !== undefined);
    // const finalPurchasingObj = {
    //   job_no,
    //   project_name,
    //   created_date: new Date().toISOString(),
    //   description,
    //   status: 'Pending', //TODO
    //   tasks:filteredArray
    // }
    // console.log(finalPurchasingObj)
    // const { error } = purchasingSchema.validate(finalPurchasingObj); // Corrected variable name and input data
    // if (error) {
    //   console.log(error);
    //   toast.error(error.message);
    //   return null;
    // }
    // dispatch(createPurchasing(finalPurchasingObj));
  };

  const onJobNoSelect = (job_no) => {
    if (job_no) {
      setJob_no(parseInt(job_no));
    }
  };

  useEffect(() => {
    dispatch(GetJobIdsProductionExists());
  }, []);

  //   if (taskIsLoading) {
  //     return <Spinner />;
  //   }

  const showStatus = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] w-[80px] inline-block text-xs lg:text-sm text-center ">
            Pending
          </div>
        );
      case 'Ordered':
        return (
          <div className=" rounded p-2 bg-[#fbc4ea] text-[#1b140a] w-[80px] inline-block text-xs lg:text-sm text-center ">
            Ordered
          </div>
        );
      case 'Completed':
        return (
          <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] w-[80px] text-xs lg:text-sm inline-block text-center">
            Completed
          </div>
        );
    }
  };

  // Define the possible task statuses
  const taskStatuses = ['Pending', 'Ordered', 'Completed'];

  // Function to filter out the current status
  const filterStatuses = (currentStatus) => {
    return taskStatuses.filter((status) => status !== currentStatus);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTaskItems = taskItems.map((task, index) => {
      if (task.index_no === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTaskItems(updatedTaskItems);

    dispatch(UpdaterequestStatus({ index_no: taskId, status: newStatus }));
  };

  const handleRemarks = (taskID, value) => {
    const updatedTaskItems = taskItems.map((task, index) => {
      if (task.index_no === taskID) {
        return { ...task, remarks: value };
      }
      return task;
    });
    setTaskItems(updatedTaskItems);
  };

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <h1 className="font-bold ">Purchasing</h1>
          <p className="text-xs">You can check the product here...</p>
        </div>
      </div>
      <hr />
      <div className="w-[92%] bg-white">
        <form onSubmit={onSubmit}></form>
        <div className="lg:grid grid-cols-2 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-span-2 font-medium">
            <p>Purchasing</p>
          </div>

          {/* <div className="col-span-1 ">
            <p>
              <label className=" text-xs" htmlFor="">
                Project name
              </label>
              <input
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                type="text"
                id="project_name"
                value={project_name}
                readOnly
                //onChange={(e) => setProject_name(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-1 ">
            <p>
              <label className=" text-xs" htmlFor="">
                Job ID
              </label>
              <label className=" text-xs text-[#FF0000]" htmlFor="">
                *
              </label>
              <select
                onChange={(e) => onJobNoSelect(e.target.value)}
                //onChange={(e) => onEnquiryIDSelect(e.target.value)}
                value={job_no}
                className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
              >
                <option value=''>Select a Job No</option>
                {bomIDs && bomIDs.length > 0
                  ? bomIDs.map((job_no, index) => (
                      <>
                        <option key={job_no}>{job_no.job_no}</option>
                      </>
                    ))
                  : ""}
              </select>
            </p>
          </div>
          <div className="col-span-2">
            <p className="h-[100px]">
              <label className=" text-xs" htmlFor="">
                Description
              </label>
              <textarea
                className="textarea w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                placeholder="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </p>
          </div> */}

          {/* <div className="col-span-2 inline-block">
            <div className="float-right">
              <button className="btn btn-sm m-1 text-sm normal-case font-medium">
                Cancel
              </button>
              <button
                className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div> */}
        </div>

        <div className=" lg:grid grid-cols-12 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10 ml-4">
          <div className="col-span-12 ">
            <p className=" font-semibold text-xl pb-4">Items</p>
          </div>
          <div className="col-start-1  ">No</div>
          <div className="col-start-2 col-span-2 ">Category</div>
          <div className="col-start-4 col-span-2  ">Description</div>
          <div className="col-start-6 col-span-2  ">Last Purchased Price</div>
          <div className="col-start-8 col-span-2  ">Amount</div>
          <div className="col-start-10 col-span-2">Status</div>
          <div className="col-start-12 col-span-1  "></div>
          <hr className="col-span-12 mx-3 my-3" />

          {taskItems && taskItems.length > 0
            ? taskItems.map((task, index) => (
                <>
                  <div className="col-start-1 items-center ">{task.index_no}</div>
                  <div className="col-start-2 col-span-1  overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {task.category}
                  </div>
                  <div className="col-start-4 col-span-2  overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {task.description}
                  </div>
                  <div className="col-start-6 col-span-2 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                    {task.last_purchased_price}
                  </div>
                  <div className="col-start-8 col-span-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {task.amount}
                  </div>
                  <div className="col-start-10 col-span-2    ">{showStatus(task.status)}</div>
                  <div className="col-start-12 col-span-1 justify-center items-center flex">
                    <div className="dropdown dropdown-end  ">
                      <label tabIndex={0} className=" m-1 text-3xl ">
                        ...
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                        {filterStatuses(task.status).map((newStatus, index) => (
                          <button
                            className="btn btn-xs m-1 p-0"
                            key={newStatus}
                            onClick={() => {
                              handleStatusChange(task.index_no, newStatus);
                            }}
                          >
                            {newStatus}
                          </button>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <hr className=" col-span-12 p-2" />
                </>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default UpdatePurchasing;
