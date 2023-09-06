import React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import pinIcon from "../resources/push-pin.svg";
import pcIcon from "../resources/pc.svg";
import checkIcon from "../resources/check-sign.svg";
import profileIcon from "../resources/profile-svgrepo-com.svg";
import { toast } from "react-toastify";
import {
  taskSchema,
  taskSchemaUpdate,
} from "../validationSchemas/taskValidation";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getJobIDs } from "../features/jobs/jobSlice";
import { useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { getEmployeeWithAvailibilityCheck } from "../features/tasks/taskSlice";
import productionSchema from "../validationSchemas/productionSchema";
import { createProduction } from "../features/productions/productionSlice";

const statuses = [
  { id: "x1", name: "new" },
  { id: "x2", name: "ongoing" },
  { id: "x3", name: "complete" },
];

function NewManufacturing() {
  const [job_no, setJob_no] = useState("");
  const [project_name, setProject_name] = useState("");
  const [main_job_id, setMain_job_id] = useState("");

  const [description, setDescription] = useState("");

  const [emp_no, setEmp_no] = useState(12);
  const [taskJob_no, setTaskJobNo] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [items, setItems] = useState([
    { name: "pc", qty: 1 },
    { name: "pen", qty: 1 },
  ]);
  const [taskStatus, setTaskStatus] = useState("new"); // Rename 'status' to avoid conflict
  const [urgent, setUrgent] = useState(false);

  const [tasksDataUpdated, setTasksDataUpdated] = useState(true);

  const [startDateIsRendered, setStartDateIsRendered] = useState(false);
  const [endDateIsRendered, setEndDateIsRendered] = useState(false);

  const dispatch = useDispatch();

  const { jobIDs, message: jobMessage } = useSelector((state) => state.job);

  const { availableEmployees, message: taskMessage } = useSelector(
    (state) => state.task
  );

  const [selected, setSelected] = useState([]);

  const dayPickerStyles = {
    caption: { position: "relative" }, // Center the caption text
    caption_label: { left: "90px", fontWeight: "500", color: "#4e5969" },
    nav_button_previous: {
      position: "absolute",
      left: "2px",
      color: "#4e5969",
    }, // Position the previous button on the left
    nav_button_next: { color: "#4e5969" }, // Position the next button on the right
    head: { color: "#86909c" },
    nav_icon: { height: "10px" },
    row: { border: "2 px" },
    day: { color: "#272e3b" },
    // selected: {
    //   backgroundColor: 'red !important',
    //   // Add other styles as needed
    // },
  };

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
    dispatch(getJobIDs());
  }, []);

  useEffect(() => {
    if(endDate){
      dispatch(getEmployeeWithAvailibilityCheck({ end_date: endDate }));
    }
    
  }, [endDate]);

  useEffect(() => {
    console.log(jobIDs);
  }, [jobIDs]);

  const options = [
    { label: "Hammer", value: "Hammer" },
    { label: "Hand saw", value: "Hand saw" },
    { label: "Wood Glue", value: "Wood Glue" },
  ];

  const onSubmit = () => {
    const formData = {
      job_no: parseInt(job_no),
      main_job_id,
      project_name,
      description,
      tasks: tasksData
    };

    console.log(formData)

    const { error } = productionSchema.validate(formData);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    dispatch(createProduction(formData))

  };

  const AddTaskOnSubmit = () => {
    const formData = {
      job_no: parseInt(taskJob_no),
      Emp_no: parseInt(emp_no),
      task_name: taskName,
      start_date: startDate,
      end_date: endDate,
      description: taskDescription,
      items: items, 
      status: taskStatus,
      urgent,
    };

    const { error } = taskSchema.validate(formData);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    const newTask = {
      Index_no: (tasksData.length + 1).toString(), // You should generate a unique index
      ...formData,
    };

    setTasksData((prevTasks) => [...prevTasks, newTask]);

    setTasksDataUpdated(true); // Toggle the state to trigger re-render
  };

  const [tasksData, setTasksData] = useState([]);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      // Item was dropped outside of a valid drop target
      return;
    }
    console.log(result.source.droppableId);
    console.log(result.source.index);
    console.log(result.destination.droppableId);
    console.log(result.destination.index);
    console.log("--------------------------");

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      //console.log("did not move");
      return;
    }

    //Create a copy of the tasks data to avoid mutating state directly
    const updatedTasks = [...tasksData];

    const foundIndex = updatedTasks.findIndex(
      (task) => task.Index_no === result.draggableId
    );

    if (foundIndex !== -1) {
      console.log(`Index found at position: ${foundIndex}`);
    } else {
      console.log(`Index not found`);
    }

    // // Remove the task from the source column
    const [movedTask] = updatedTasks.splice(foundIndex, 1);
    console.log(movedTask);
    console.log(updatedTasks);

    // // Update the status of the moved task
    console.log(movedTask.status);
    //movedTask.status = result.destination.droppableId;

    switch (result.destination.droppableId) {
      case "x1":
        movedTask.status = "new";
        break;
      case "x2":
        movedTask.status = "ongoing";
        break;
      case "x3":
        movedTask.status = "complete";
        break;
    }

    console.log(movedTask.status);

    // // Insert the task at the destination column
    updatedTasks.splice(0, 0, movedTask);

    // // Update the state with the new tasks data
     setTasksData(updatedTasks);
  };

  const onJobIDSelect = (jobID) => {

    jobIDs.filter((job)=> job.job_no === parseInt(jobID)).map((job, index)=>{
      setJob_no(job.job_no);
      setProject_name(job.project_name);
      setMain_job_id(job.main_job_id  );
    })
  };

  const onTaskJobIDSelect = (jobID) => {
    setTaskJobNo(parseInt(jobID));
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
          <p className="text-xs">
            You are viewing every Project that's made so far...
          </p>
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
            <p>
              <label className=" text-xs">Project name</label>
              <input
                placeholder="Project Name"
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                type="text"
                id="project_name"
                value={project_name}
                // onChange={(e) => setProject_name(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-2 col-start-4">
            <p>
              <label className=" text-xs">Job Number</label>
              <select
                  onChange={(e) => onJobIDSelect(e.target.value)}
                  value={job_no}
                  className=" font-normal select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                >
                  <option disabled selected>
                    Select a Job Number
                  </option>
                  {jobIDs.length > 0
                    ? jobIDs.map((jobID) => (
                        <>
                          <option >{jobID.job_no}</option>
                        </>
                      ))
                    : null}
                </select>
            </p>
          </div>

          <div className="col-span-5">
            <p>
              <label className=" text-xs">Description</label>
              <textarea
                className="textarea w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                placeholder="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className="col-span-5 inline-block">
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
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <form
          method="dialog"
          className="modal-box rounded-md lg:min-w-[800px] p-1 min-h-[600px] relative"
        >
          <div className="lg:grid grid-cols-10 gap-2 bg-white p-5 grid-rows-6">
            {/* ... */}
            <div className="col-span-5 row-span-1">
              <p>
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
              </p>
            </div>
            {/* <div className="col-span-5">
              <p>
                <label className="text-xs" htmlFor="job_no">
                  Job Number
                </label>
                <select
                  onChange={(e) => onTaskJobIDSelect(e.target.value)}
                  value={taskJob_no}
                  className=" font-normal select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                >
                  <option disabled selected>
                    Select a Job ID
                  </option>
                  {jobIDs.length > 0
                    ? jobIDs.map((jobID) => (
                        <>
                          <option>{jobID.job_no}</option>
                        </>
                      ))
                    : null}
                </select>
              </p>
            </div> */}
            <div className="col-span-5 row-start-2">
              <p>
                <label className="text-xs" htmlFor="job_no">
                  Assigned to
                </label>
                <select
                  onChange={(e) => onEmployeeIDSelect(e.target.value)}
                  value={emp_no}
                  className=" font-normal select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                >
                  <option disabled selected>
                    Select an Employee ID. First select an End Date
                  </option>
                  {groupedEmployees.hasUncompleted && groupedEmployees.hasUncompleted.length > 0 && (
                      <>
                        <option className=" bg-green-400 text-black" disabled>Employees with Completed Tasks</option>
                        {groupedEmployees.hasUncompleted.map((employee) => (
                          <option className=" bg-green-200" key={employee.emp_no}>{employee.emp_no}</option>
                        ))}
                      </>
                    )}
                  {groupedEmployees.noUncompleted && groupedEmployees.noUncompleted.length > 0 && (
                      <>
                        <option className=" bg-red-400 text-black" disabled>Employees with Uncompleted Tasks</option>
                        {groupedEmployees.noUncompleted.map((employee) => (
                          <option className=" bg-red-200" key={employee.emp_no}>{employee.emp_no}</option>
                        ))}
                      </>
                    )}
                </select>
              </p>
            </div>

            <div className="col-span-5 row-start-3 inline relative">
              <label class="cursor-pointer label text-xs">Start Date</label>

              <div class="flex flex-col ">
                <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                  <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                    <input
                      class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                      disabled
                    />
                    <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                      <button onClick={renderStartDatePicker}>
                        <img
                          src={require("../resources/cal.png")}
                          className=" justify-center items-center"
                        />
                      </button>
                    </span>
                  </form>
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
              <label class="cursor-pointer label text-xs">End Date</label>

              <div class="flex flex-col ">
                <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                  <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                    <input
                      class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                      disabled
                    />
                    <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                      <button onClick={renderEndDatePicker}>
                        <img
                          src={require("../resources/cal.png")}
                          className=" justify-center items-center"
                        />
                      </button>
                    </span>
                  </form>
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
              <p>
                <label className="text-xs" htmlFor="items">
                  Items
                </label>
                {/* Assuming items is an array */}
                {/* <select
            className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
            type="select"
            id="items"
            // value={items}
            //onChange={(e) => setItems((prevItems)=>[...prevItems], e.target.value)}
          >
            <option value={'name: "dog", qty: 1'}>Tool 1</option>
            <option value={'name: "cat", qty: 1'}>Tool 2</option>
            <option value={'name: "elephant", qty: 1'}>Tool 3</option>
          </select> */}

                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                  className="multiselect"
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </p>
            </div>
            <div className="col-span-5 row-start-4">
              <p>
                <label className="text-xs" htmlFor="taskStatus">
                  Status
                </label>
                <select
                  onChange={(e) => setTaskStatus(e.target.value)}
                  value={taskStatus}
                  className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                >
                  <option disabled selected>
                    Select Status
                  </option>

                  <option value="new">New Tasks</option>
                  <option value="ongoing">Working On</option>
                  <option value="complete">completed</option>
                </select>
              </p>
            </div>
            <div className="col-span-5 row-span-2 row-start-5">
              <p>
                <label className="text-xs" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="textarea py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded h-[100px]"
                  id="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
              </p>
            </div>
            <div className=" row-start-7">
              <label class="cursor-pointer label text-xs">Urgent</label>
              <input
                type="checkbox"
                class="toggle toggle-primary toggle-xs ml-1"
                id="urgent"
                checked={urgent}
                onClick={(e) => setUrgent(e.target.checked)}
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
                  margin: "16px",
                  padding: "8px",
                }}
              >
                <div className=" bg-[#ededed] rounded-md text-sm font-medium flex justify-between content-between mb-2">
                  {status.name === "new" ? (
                    <div className="flex p-1">
                      {" "}
                      <img className=" w-3 ml-2" src={pinIcon} />
                      <h3 className="px-2 text-[#5c5f62] font-semibold">
                        New Tasks (5)
                      </h3>
                    </div>
                  ) : status.name === "ongoing" ? (
                    <div className="flex p-1">
                      {" "}
                      <img className=" w-3 ml-2" src={pcIcon} />
                      <h3 className="px-2 text-[#5c5f62] font-semibold">
                        Working On (5)
                      </h3>
                    </div>
                  ) : status.name === "complete" ? (
                    <div className="flex p-1">
                      {" "}
                      <img className=" w-3 ml-2" src={checkIcon} />
                      <h3 className="px-2 text-[#5c5f62] font-semibold">
                        Completed (5)
                      </h3>
                    </div>
                  ) : null}
                  <div className="">
                    <button
                      className="btn-xs btn bg-transparent border-none text-[#5c5f62] font-semibold text-lg"
                      onClick={() => window.my_modal_1.showModal()}
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
                    <ul
                      className="tasks  h-full"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {tasksData
                        .filter((task) => task.status === status.name)
                        .map((task, index) => (
                          <Draggable
                            key={task.Index_no}
                            draggableId={task.Index_no}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="bg-white h-[110] shadow-[0px_0px_20px_0px_#00000003] rounded-[10px] p-1 inline-block m-1 ml-[0px] border w-full"
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                              >
                                <div>
                                  <div className="flex justify-start items-start">
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      className=" mt-1 m-2"
                                    />
                                    <div className="flex flex-col  w-[90%]">
                                      <p className=" text-xs font-semibold truncate">
                                        {task.task_name}
                                        {/* {task.task_name.length && task.task_name.length > 50 ? task.task_name.substring(0,49) : task.task_name } */}
                                      </p>
                                      <p className=" text-xs text-[#5c5f62] truncate">
                                        {task.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex">
                                  <img className=" w-7 m-3" src={profileIcon} />
                                  <p className="my-3 text-[#5c5f62]">
                                    {task.end_date.toLocaleDateString()}
                                  </p>
                                  <p></p>
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

export default NewManufacturing;
