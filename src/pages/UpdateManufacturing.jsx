import React from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import pinIcon from '../resources/push-pin.svg';
import pcIcon from '../resources/pc.svg';
import checkIcon from '../resources/check-sign.svg';
import editIcon from '../resources/edit.svg';
import { toast } from 'react-toastify';
import { taskSchema, taskSchemaUpdate } from '../validationSchemas/taskValidation';
import { format, isBefore } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetJobIdsBOMExists, getJob, getJobIDs } from '../features/jobs/jobSlice';
import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { getEmployeeWithAvailibilityCheck } from '../features/tasks/taskSlice';
import productionSchema from '../validationSchemas/productionSchema';
import {
  createProduction,
  getProductionByJobNo,
  updateProduction,
  reset as productionReset,
} from '../features/productions/productionSlice';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const statuses = [
  { id: 'x1', name: 'new' },
  { id: 'x2', name: 'ongoing' },
  { id: 'x3', name: 'complete' },
];

function UpdateManufacturing() {
  const [job_no, setJob_no] = useState('');
  const [project_name, setProject_name] = useState('');
  const [main_job_id, setMain_job_id] = useState('');

  const [description, setDescription] = useState('');

  const [emp_no, setEmp_no] = useState('');
  const [taskJob_no, setTaskJobNo] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [items, setItems] = useState([]);
  const [taskIndexNo, setTaskIndexNo] = useState(null);
  const [taskStatus, setTaskStatus] = useState('new'); // Rename 'status' to avoid conflict
  const [urgent, setUrgent] = useState(false);
  const [taskID, setTaskID] = useState('');
  const [remarks, setRemarks] = useState('');

  const [tasksDataUpdated, setTasksDataUpdated] = useState(true);

  const [startDateIsRendered, setStartDateIsRendered] = useState(false);
  const [endDateIsRendered, setEndDateIsRendered] = useState(false);

  const [productionIndex_no, setProductionIndex_no] = useState('');
  const [productionStatus, setProductionStatus] = useState('');
  const [productionRemarks, setProductionRemarks] = useState('');
  const [productionDescription, setProductionDescription] = useState('');
  const [productionCreatedDate, setProductionCreatedDate] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { job, jobIDs, message: jobMessage } = useSelector((state) => state.job);

  const {
    production,
    tasksByJobNo,
    isError: productionIsError,
    isSuccess: productionIsSuccess,
    message: productionMessage,
    updateProductionIsError,
    updateProductionIsSuccess,
  } = useSelector((state) => state.production);

  const { availableEmployees, message: taskMessage } = useSelector((state) => state.task);

  const [selected, setSelected] = useState([]);

  const dayPickerStyles = {
    caption: { position: 'relative' }, // Center the caption text
    caption_label: { left: '90px', fontWeight: '500', color: '#4e5969' },
    nav_button_previous: {
      position: 'absolute',
      left: '2px',
      color: '#4e5969',
    }, // Position the previous button on the left
    nav_button_next: { color: '#4e5969' }, // Position the next button on the right
    head: { color: '#86909c' },
    nav_icon: { height: '10px' },
    row: { border: '2 px' },
    day: { color: '#272e3b' },
    // selected: {
    //   backgroundColor: 'red !important',
    //   // Add other styles as needed
    // },
  };

  useEffect(() => {
    if (updateProductionIsError) {
      toast.error(productionMessage);
    }

    if (updateProductionIsSuccess) {
      toast.success('Production Plan Added!');
      dispatch(productionReset());
      navigate('/manufacturing');
    }

    dispatch(productionReset());
  }, [dispatch, navigate, productionMessage, updateProductionIsError, updateProductionIsSuccess]);

  const handleStartDateSelect = (date) => {
    setStartDate(date);
    setStartDateIsRendered(!startDateIsRendered);
  };

  const renderStartDatePicker = (e) => {
    e.preventDefault();
    setStartDateIsRendered(!startDateIsRendered);
  };

  const handleEndDateSelect = (date) => {
    //setEmp_no(null)  //:todo
    setEndDate(date);
    setEndDateIsRendered(!endDateIsRendered);
  };

  const renderEndDatePicker = (e) => {
    e.preventDefault();
    setEndDateIsRendered(!endDateIsRendered);
  };

  useEffect(() => {
        // dispatch(getJobIDs());
        dispatch(GetJobIdsBOMExists());
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const planId = queryParams.get('planId');
    if (planId) {
      setJob_no(planId);
      dispatch(getProductionByJobNo(parseInt(planId)));
      dispatch(getJob(parseInt(planId)));
    }
  }, []);

  useEffect(() => {
    if (job) {
      setProject_name(job.project_name);
      setMain_job_id(job.main_job_id);
    }
  }, [job]);

  useEffect(() => {
    if (endDate) {
      dispatch(getEmployeeWithAvailibilityCheck({ end_date: endDate }));
    }
  }, [endDate]);

  useEffect(() => {
    if (job_no) {
      dispatch(getProductionByJobNo(job_no));
    }
  }, [job_no]);

  useEffect(() => {
    if (tasksByJobNo.length > 0) {
      setDescription(tasksByJobNo[0].production_description);
      setProductionIndex_no(tasksByJobNo[0].production_index_no);
      setProductionStatus(tasksByJobNo[0].production_status);
      setProductionCreatedDate(new Date(tasksByJobNo[0].production_created_date));
      setProductionRemarks(tasksByJobNo[0].production_remarks || '');
    }

    const tasksFromJobNo = tasksByJobNo.map((task) => {
      const formData = {
        job_no: task.job_no,
        Emp_no: task.emp_no,
        task_name: task.task_name,
        start_date: new Date(task.start_date),
        end_date: new Date(task.end_date),
        description: task.description,
        items: task.items,
        status: task.status,
        urgent: task.urgent,
        Index_no: JSON.stringify(task.index_no),
        remarks: task.remarks
      };

      const { error } = taskSchema.validate(formData);
      if (error) {
        console.log(error);
        toast.error(error.message);
        return;
      }

      const newTask = {
        taskID: uuidv4(), // You should generate a unique index
        ...formData,
      };

      return newTask;
    });

    setTasksData(tasksFromJobNo);
  }, [tasksByJobNo]);

  const options = [
    { label: 'pc', value: 'pc' },
    { label: 'pen', value: 'pen' },
    { label: 'pencil', value: 'pencil' },
  ];

  const onSubmit = () => {
    let tasksDataCopy = tasksData.map((task) => {
      const { taskID, ...rest } = task;
      return rest;
    });

    console.log(tasksDataCopy);

    const formData = {
      index_no: productionIndex_no,
      job_no: parseInt(job_no),
      status: productionStatus,
      remarks: productionRemarks,
      created_date: productionCreatedDate,
      main_job_id,
      project_name,
      description,
      tasks: tasksDataCopy,
    };

    console.log(formData);

    const { error } = productionSchema.validate(formData);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    dispatch(updateProduction(formData));
  };

  const AddTaskOnSubmit = () => {
    const formData = {
      //   job_no: parseInt(taskJob_no),
      job_no: job_no,
      Emp_no: parseInt(emp_no),
      task_name: taskName,
      start_date: startDate,
      end_date: endDate,
      description: taskDescription,
      items: items,
      status: taskStatus,
      remarks: remarks,
      urgent,
    };

    const { error } = taskSchema.validate(formData);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    const newTask = {
      taskID: uuidv4(), // You should generate a unique index
      ...formData,
    };

    setTasksData((prevTasks) => [...prevTasks, newTask]);

    setTasksDataUpdated(true); // Toggle the state to trigger re-render
  };

  const UpdateTaskOnSubmit = () => {
    const updatedTasksData = tasksData.map((task, index) => {
      if (task.taskID === taskID && !task.Index_no) {
        return {
          //   job_no: parseInt(taskJob_no),
          job_no: job_no,
          Emp_no: parseInt(emp_no),
          task_name: taskName,
          start_date: startDate,
          end_date: endDate,
          description: taskDescription,
          items: items,
          status: taskStatus,
          urgent,
          taskID: task.taskID,
          remarks: remarks
        };
      } else if (task.taskID === taskID) {
        return {
          job_no: job_no,
          Emp_no: parseInt(emp_no),
          task_name: taskName,
          start_date: startDate,
          end_date: endDate,
          description: taskDescription,
          items: items,
          status: taskStatus,
          urgent,
          Index_no: task.Index_no,
          taskID: task.taskID,
          remarks: remarks
        };
      } else {
        return task
      }
    });

    setTasksData(updatedTasksData);

    setTasksDataUpdated(true); // Toggle the state to trigger re-render
  };

  const [tasksData, setTasksData] = useState([]);

  const onDragEnd = (result) => {
    //console.log(result);
    if (!result.destination) {
      // Item was dropped outside of a valid drop target
      return;
    }
    // console.log(result.source.droppableId);
    // console.log(result.source.index);
    // console.log(result.destination.droppableId);
    // console.log(result.destination.index);
    // console.log("--------------------------");

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      //console.log("did not move");
      return;
    }

    //Create a copy of the tasks data to avoid mutating state directly
    const updatedTasks = [...tasksData];

    const foundIndex = updatedTasks.findIndex((task) => task.taskID === result.draggableId);

    if (foundIndex !== -1) {
      //console.log(`Index found at position: ${foundIndex}`);
    } else {
      //console.log(`Index not found`);
    }

    // // Remove the task from the source column
    const [movedTask] = updatedTasks.splice(foundIndex, 1);
    // console.log(movedTask);
    // console.log(updatedTasks);

    // // Update the status of the moved task
    //console.log(movedTask.status);
    //movedTask.status = result.destination.droppableId;

    switch (result.destination.droppableId) {
      case 'x1':
        movedTask.status = 'new';
        break;
      case 'x2':
        movedTask.status = 'ongoing';
        break;
      case 'x3':
        movedTask.status = 'complete';
        break;
    }

    //console.log(movedTask.status);

    // // Insert the task at the destination column
    updatedTasks.splice(0, 0, movedTask);

    // // Update the state with the new tasks data
    setTasksData(updatedTasks);
    if(result.destination.droppableId === 'x3'){
      onEditClick(result.draggableId)
    }
  };

  const onJobIDSelect = (jobID) => {
    jobIDs
      .filter((job) => job.job_no === parseInt(jobID))
      .map((job, index) => {
        setJob_no(job.job_no);
        setProject_name(job.project_name);
        setMain_job_id(job.main_job_id);
      });
  };

  const onTaskJobIDSelect = (jobID) => {
    setTaskJobNo(parseInt(jobID));
  };

  const onEditClick = (taskID) => {
    tasksData.map((task) => {
      if (task.taskID === taskID) {
        setTaskID(taskID);

        setEmp_no(task.Emp_no);
        setTaskName(task.task_name);
        setStartDate(task.start_date);
        setEndDate(task.end_date);
        setTaskDescription(task.description);

        setItems(task.items);

        const selec = task.items.map((items) => {
          return { label: items.name, value: items.name };
        });

        setSelected([...selec]);

        setTaskStatus(task.status);
        setUrgent(task.urgent);
        if (task.Index_no) {
          setTaskIndexNo(JSON.stringify(task.Index_no));
        }
        setRemarks(task.remarks)
      }
    });

    window.my_modal_2.showModal();
  };

  const setTaskItems = (selectedItems) => {
    const selItems = selectedItems.map((sel) => {
      return {
        name: sel.value,
        qty: 1,
      };
    });

    setItems([...selItems]);
    setSelected(selectedItems);
  };

  const showModalOne = () => {
    if (job_no) {
      window.my_modal_1.showModal();
    } else {
      toast.error('Select job number first');
    }
  };

  const onEmployeeIDSelect = (empID) => {
    const selectedEmployee = availableEmployees.find((employee) => employee.emp_no === parseInt(empID));

    if (selectedEmployee && selectedEmployee.has_uncompleted_tasks) {
      const isConfirmed = window.confirm('Are you sure you want to select an employee with uncompleted tasks?');

      if (isConfirmed) {
        setEmp_no(parseInt(empID));
      }
    } else {
      setEmp_no(parseInt(empID));
    }
  };

  const groupedEmployees = availableEmployees.reduce((acc, employee) => {
    if (employee.has_uncompleted_tasks) {
      if (!acc.hasUncompleted) {
        acc.hasUncompleted = [];
      }
      acc.hasUncompleted.push(employee);
    } else {
      if (!acc.noUncompleted) {
        acc.noUncompleted = [];
      }
      acc.noUncompleted.push(employee);
    }
    return acc;
  }, {});

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <h1 className="font-bold ">Project</h1>
        </div>
      </div>
      <hr />
      <div className="w-[92%] bg-white">
        <form onSubmit={onSubmit}></form>
        <div className="lg:grid grid-cols-5 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-span-5 font-medium">
            <p>Manufacturing Process</p>
          </div>
          <div className="col-span-2 col-start-1">
            <div>
              <label className=" text-xs">Project name</label>
              <input
                placeholder="Project Name"
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                type="text"
                id="project_name"
                value={project_name}
                readOnly
                // onChange={(e) => setProject_name(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2 col-start-4">
            <div>
              <label className=" text-xs">Job Number</label>
              <select
                onChange={(e) => onJobIDSelect(e.target.value)}
                value={job_no}
                className=" font-normal select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
              >
                <option value="" disabled>
                  Select a Job Number
                </option>
                {jobIDs.length > 0
                  ? jobIDs.map((jobID) => (
                      <>
                        <option key={jobID.job_no}>{jobID.job_no}</option>
                      </>
                    ))
                  : null}
              </select>
            </div>
          </div>

          <div className="col-span-5">
            <div>
              <label className=" text-xs">Description</label>
              <textarea
                className="textarea w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                placeholder="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="col-span-5 inline-block">
            <div className="float-right">
              <button className="btn btn-sm m-1 text-sm normal-case font-medium">Cancel</button>
              <button
                className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box rounded-md lg:min-w-[800px] p-1 min-h-[600px] relative">
          <div className="lg:grid grid-cols-10 gap-2 bg-white p-5 grid-rows-6">
            {/* ... */}
            <div className="col-span-5 row-span-1">
              <div>
                <label className="text-xs" htmlFor="task_name">
                  Task Name
                </label>
                <input
                  className="input input-sm py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                  type="text"
                  id="task_name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-5 row-start-2 text-xs">
              <p>
                <label className="text-xs" htmlFor="job_no">
                  Assigned to
                </label>
                <select
                  onChange={(e) => onEmployeeIDSelect(e.target.value)}
                  value={emp_no}
                  className=" font-normal select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded text-xs"
                >
                  <option disabled selected>
                    Select an Employee ID. First select an End Date
                  </option>
                  {groupedEmployees?.noUncompleted && groupedEmployees?.noUncompleted.length > 0 && (
                    <>
                      <option className=" bg-green-400 text-black" disabled>
                        Available employees
                      </option>
                      {groupedEmployees.noUncompleted.map((employee) => (
                        <option value={employee.emp_no}>
                          {employee.name} {' - '} {employee.department}
                        </option>
                      ))}
                    </>
                  )}
                  {groupedEmployees?.hasUncompleted && groupedEmployees?.hasUncompleted.length > 0 && (
                    <>
                      <option className=" bg-red-400 text-black" disabled>
                        Employees with assigned tasks
                      </option>
                      {groupedEmployees?.hasUncompleted.map((employee) => (
                        <option value={employee.emp_no}>
                          {employee.name} {' - '} {employee.department}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </p>
            </div>

            <div className="col-span-5 row-start-3 inline relative">
              <label className="cursor-pointer label text-xs">Start Date</label>

              <div className="flex flex-col ">
                <div className="mx-auto my-auto w-full sm:w-full md:w-full">
                  <div className="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                    <input
                      className=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                      disabled
                    />
                    <span className="flex items-center rounded rounded-l-none border-0 px-2 ">
                      <button onClick={renderStartDatePicker}>
                        <img src={require('../resources/cal.png')} className=" justify-center items-center" />
                      </button>
                    </span>
                  </div>
                  {startDateIsRendered && (
                    <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                      <DayPicker
                        styles={dayPickerStyles}
                        captionLayout="dropdown" // Display the caption in the middle
                        navPosition="caption" // Place the navigation buttons relative to the caption
                        mode="single"
                        selected={startDate}
                        onSelect={handleStartDateSelect}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-5 row-start-3 inline relative">
              <label className="cursor-pointer label text-xs">End Date</label>

              <div className="flex flex-col ">
                <div className="mx-auto my-auto w-full sm:w-full md:w-full">
                  <div className="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                    <input
                      className=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                      disabled
                    />
                    <span className="flex items-center rounded rounded-l-none border-0 px-2 ">
                      <button onClick={renderEndDatePicker}>
                        <img src={require('../resources/cal.png')} className=" justify-center items-center" />
                      </button>
                    </span>
                  </div>
                  {endDateIsRendered && (
                    <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                      <DayPicker
                        styles={dayPickerStyles}
                        captionLayout="dropdown" // Display the caption in the middle
                        navPosition="caption" // Place the navigation buttons relative to the caption
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndDateSelect}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-5 row-start-4">
              <div>
                <label className="text-xs" htmlFor="items">
                  Items
                </label>
                <MultiSelect
                  className="multiselect"
                  options={options}
                  value={selected}
                  onChange={(e) => setTaskItems(e)}
                  labelledBy="Select"
                />
              </div>
            </div>
            <div className="col-span-5 row-start-4">
              <div>
                <label className="text-xs" htmlFor="taskStatus">
                  Status
                </label>
                <select
                  onChange={(e) => setTaskStatus(e.target.value)}
                  value={taskStatus}
                  className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                >
                  <option value="" disabled>
                    Select Status
                  </option>

                  <option key="new" value="new">
                    New Tasks
                  </option>
                  <option key="ongoing" value="ongoing">
                    Working On
                  </option>
                  <option key="complete" value="complete">
                    completed
                  </option>
                </select>
              </div>
            </div>
            <div className="col-span-5 row-span-2 row-start-5">
              <div>
                <label className="text-xs" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="textarea py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded h-[100px]"
                  id="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            {
              taskStatus === 'complete' ? 
              <div className="col-span-5 row-span-2 row-start-5">
              <div>
                <label className="text-xs" htmlFor="description">
                  Remarks
                </label>
                <textarea
                  className="textarea py-2 w-full px-2 outline-none text-gray-600 bg-[#fafa8fa4] rounded h-[100px]"
                  id="taskRemarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </div>
            </div>
            :
            <></>
            }   
            <div className=" row-start-7">
              <label className="cursor-pointer label text-xs">Urgent</label>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-xs ml-1"
                id="urgent"
                checked={urgent}
                // onClick={(e) => setUrgent(e.target.checked)}
                onChange={(e) => setUrgent(e.target.checked)}
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-5">
            <button
              className="btn btn-sm m-1 text-sm normal-case font-medium"
              onClick={() => window.my_modal_2.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
              //   onClick={AddTaskOnSubmit}
              onClick={() => UpdateTaskOnSubmit()}
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>

      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box rounded-md lg:min-w-[800px] p-1 min-h-[600px] relative">
          <div className="lg:grid grid-cols-10 gap-2 bg-white p-5 grid-rows-6">
            {/* ... */}
            <div className="col-span-5 row-span-1">
              <div>
                <label className="text-xs" htmlFor="task_name">
                  Task Name
                </label>
                <input
                  className="input input-sm py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                  type="text"
                  id="task_name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-5 row-start-2 text-xs">
              <p>
                <label className="text-xs" htmlFor="job_no">
                  Assigned to
                </label>
                <select
                  onChange={(e) => onEmployeeIDSelect(e.target.value)}
                  value={emp_no}
                  className=" font-normal select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded text-xs"
                >
                  <option disabled selected>
                    Select an Employee ID. First select an End Date
                  </option>
                  {groupedEmployees?.noUncompleted && groupedEmployees?.noUncompleted.length > 0 && (
                    <>
                      <option className=" bg-green-400 text-black" disabled>
                        Available employees
                      </option>
                      {groupedEmployees.noUncompleted.map((employee) => (
                        <option value={employee.emp_no}>
                          {employee.name} {' - '} {employee.department}
                        </option>
                      ))}
                    </>
                  )}
                  {groupedEmployees?.hasUncompleted && groupedEmployees?.hasUncompleted.length > 0 && (
                    <>
                      <option className=" bg-red-400 text-black" disabled>
                        Employees with assigned tasks
                      </option>
                      {groupedEmployees?.hasUncompleted.map((employee) => (
                        <option value={employee.emp_no}>
                          {employee.name} {' - '} {employee.department}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </p>
            </div>

            <div className="col-span-5 row-start-3 inline relative">
              <label className="cursor-pointer label text-xs">Start Date</label>

              <div className="flex flex-col ">
                <div className="mx-auto my-auto w-full sm:w-full md:w-full">
                  <div className="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                    <input
                      className=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                      disabled
                    />
                    <span className="flex items-center rounded rounded-l-none border-0 px-2 ">
                      <button onClick={renderStartDatePicker}>
                        <img src={require('../resources/cal.png')} className=" justify-center items-center" />
                      </button>
                    </span>
                  </div>
                  {startDateIsRendered && (
                    <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                      <DayPicker
                        styles={dayPickerStyles}
                        captionLayout="dropdown" // Display the caption in the middle
                        navPosition="caption" // Place the navigation buttons relative to the caption
                        mode="single"
                        selected={startDate}
                        onSelect={handleStartDateSelect}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-5 row-start-3 inline relative">
              <label className="cursor-pointer label text-xs">End Date</label>

              <div className="flex flex-col ">
                <div className="mx-auto my-auto w-full sm:w-full md:w-full">
                  <div className="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                    <input
                      className=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                      disabled
                    />
                    <span className="flex items-center rounded rounded-l-none border-0 px-2 ">
                      <button onClick={renderEndDatePicker}>
                        <img src={require('../resources/cal.png')} className=" justify-center items-center" />
                      </button>
                    </span>
                  </div>
                  {endDateIsRendered && (
                    <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                      <DayPicker
                        styles={dayPickerStyles}
                        captionLayout="dropdown" // Display the caption in the middle
                        navPosition="caption" // Place the navigation buttons relative to the caption
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndDateSelect}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-5 row-start-4">
              <div>
                <label className="text-xs" htmlFor="items">
                  Items
                </label>
                <MultiSelect
                  className="multiselect"
                  options={options}
                  value={selected}
                  onChange={(e) => setTaskItems(e)}
                  labelledBy="Select"
                />
              </div>
            </div>
            <div className="col-span-5 row-start-4">
              <div>
                <label className="text-xs" htmlFor="taskStatus">
                  Status
                </label>
                <select
                  onChange={(e) => setTaskStatus(e.target.value)}
                  value={taskStatus}
                  className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                >
                  <option disabled value="">
                    Select Status
                  </option>

                  <option key="new" value="new">
                    New Tasks
                  </option>
                  <option key="ongoing" value="ongoing">
                    Working On
                  </option>
                  <option key="complete" value="complete">
                    completed
                  </option>
                </select>
              </div>
            </div>
            <div className="col-span-5 row-span-2 row-start-5">
              <div>
                <label className="text-xs" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="textarea py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded h-[100px]"
                  id="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            {
              taskStatus === 'complete' ? 
              <div className="col-span-5 row-span-2 row-start-5">
              <div>
                <label className="text-xs" htmlFor="description">
                  Remarks
                </label>
                <textarea
                  className="textarea py-2 w-full px-2 outline-none text-gray-600 bg-[#fafa8fa4] rounded h-[100px]"
                  id="taskRemarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </div>
            </div>
            :
            <></>
            }  
            <div className=" row-start-7">
              <label className="cursor-pointer label text-xs">Urgent</label>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-xs ml-1"
                id="urgent"
                checked={urgent}
                // onClick={(e) => setUrgent(e.target.checked)}
                onChange={(e) => setUrgent(e.target.checked)}
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-5">
            <button
              className="btn btn-sm m-1 text-sm normal-case font-medium"
              onClick={() => window.my_modal_1.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
              onClick={AddTaskOnSubmit}
              // onClick={()=>UpdateTaskOnSubmit()}
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>

      <div className="w-[92%] bg-white flex">
        {tasksDataUpdated && (
          <DragDropContext onDragEnd={onDragEnd}>
            {statuses.map((status, index) => (
              <div
                className="  min-h-[300px] w-[400px]"
                key={status.id}
                style={{
                  margin: '16px',
                  padding: '8px',
                }}
              >
                <div className=" bg-[#ededed] rounded-md text-sm font-medium flex justify-between content-between mb-2">
                  {status.name === 'new' ? (
                    <div className="flex p-1">
                      {' '}
                      <img className=" w-3 ml-2" src={pinIcon} />
                      <h3 className="px-2 text-[#5c5f62] font-semibold">New Tasks (5)</h3>
                    </div>
                  ) : status.name === 'ongoing' ? (
                    <div className="flex p-1">
                      {' '}
                      <img className=" w-3 ml-2" src={pcIcon} />
                      <h3 className="px-2 text-[#5c5f62] font-semibold">Working On (5)</h3>
                    </div>
                  ) : status.name === 'complete' ? (
                    <div className="flex p-1">
                      {' '}
                      <img className=" w-3 ml-2" src={checkIcon} />
                      <h3 className="px-2 text-[#5c5f62] font-semibold">Completed (5)</h3>
                    </div>
                  ) : null}
                  <div className="">
                    <button
                      className="btn-xs btn bg-transparent border-none text-[#5c5f62] font-semibold text-lg"
                      onClick={() => showModalOne()}
                    >
                      +
                    </button>
                    <button className="btn-xs btn bg-transparent border-none text-[#5c5f62] font-semibold text-lg">
                      ...
                    </button>
                  </div>
                </div>

                <Droppable droppableId={status.id} key={status.id} className="">
                  {(provided) => (
                    <ul className="tasks  h-full" {...provided.droppableProps} ref={provided.innerRef}>
                      {tasksData
                        .filter((task) => task.status === status.name)
                        .map((task, index) => (
                          <Draggable key={task.taskID} draggableId={task.taskID} index={index}>
                            {(provided) => (
                              <li
                                className="bg-white h-[110] shadow-[0px_0px_20px_0px_#00000003] rounded-[10px] p-1 inline-block m-1 ml-[0px] border w-full"
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                              >
                                <div className=" p-2">
                                  <div className="flex justify-between">
                                    <div className="flex flex-col  w-[90%]">
                                      <p className=" text-xs font-semibold truncate">{task.task_name}</p>
                                      <p className=" h-8 text-xs text-[#5c5f62] overflow-hidden line-clamp-2 my-1">
                                        {task.description}
                                      </p>
                                    </div>
                                    {task.end_date && isBefore(task.end_date, new Date()) && (
                                      <p className="p-1 h-fit w-fit rounded-lg font-semibold bg-red-400 text-white text-xs">
                                        Overdue
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-[#5c5f62] text-sm">
                                      {task.end_date.toLocaleDateString() + ' - ' + task.end_date.toLocaleDateString()}
                                    </p>
                                    <div onClick={() => onEditClick(task.taskID)}>
                                      <img src={editIcon} className=" w-6" />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        )}
      </div>
    </div>
  );
}

export default UpdateManufacturing;
