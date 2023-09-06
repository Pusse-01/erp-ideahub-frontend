import React, { useEffect } from "react";

import { getJobs, reset } from "../features/jobs/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import JobItem from "../components/JobItem";
import HeadCard from "../components/HeadCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  getDepartmentmangersCount,
  getEmployeeCount,
  getEmployees,
  createEmployee,
  getDepartments,
  reset as employeeReset
} from "../features/employees/employeeSlice";

import folderIcon from "../resources/folder.svg";
import infoIcon from "../resources/Info.svg";
import refreshIcon from "../resources/refresh.svg";

import profileIcon from "../resources/profile-svgrepo-com.svg";
import EmployeeItem from "../components/EmployeeItem";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "react-toastify";

function Employees() {
  const { jobs, isLoading, isSuccess } = useSelector((state) => state.job);
  const {
    employees,
    employeeCount,
    departmentmangersCount,
    departments,
    isLoading: employeeIsLoading,
    isSuccess: employeeIsSuccess,
    createEmployeeIsError,
    createEmployeeIsSuccess,
    deleteEmployeeIsSuccess,
    deleteEmployeeIsError,
     message
  } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("");

  const [name, setName] = useState("");
  const [role, setRole] = useState(null);
  const [department_ID, setDepartment_ID] = useState();
  const [shift_timing_start, setShift_timing_start] = useState("");
  const [shift_timing_end, setShift_timing_end] = useState("");
  const [dep_manager, setDep_manager] = useState(false);
  const [photo_url, setPhoto_url] = useState("");

  const [joinDate, setJoinDate] = useState(null);
  const [joinDateIsRendered, setJoinDateIsRendered] = useState(false);

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

  const renderJoinDatePicker = (e) => {
    e.preventDefault();
    setJoinDateIsRendered(!joinDateIsRendered);
  };

  const handleJoinDateSelect = (date) => {
    setJoinDate(date);
    setJoinDateIsRendered(!joinDateIsRendered);
  };

  useEffect(() => {
    //run on unmount
    return () => {
      if (isSuccess) {
        console.log(jobs);
        //dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getEmployees({ DepFilter: "any" }));
    dispatch(getDepartmentmangersCount());
    dispatch(getEmployeeCount());
    dispatch(getDepartments());
  }, []);

  useEffect(() => {
    if (createEmployeeIsError) {
      toast.error(message);
    }

    if (createEmployeeIsSuccess) {
      toast.success('Employee Added!')
      closeMyModal()
      dispatch(getEmployees({ DepFilter: "any" }));
    }
  }, [createEmployeeIsError, dispatch, createEmployeeIsSuccess, message]);

  useEffect(()=>{
    if(deleteEmployeeIsError){
      toast.error(message)
    }
    if(deleteEmployeeIsSuccess){
      toast.success("Employee Deleted!")
      dispatch(getEmployees({ DepFilter: "any" })); 
    dispatch(getDepartmentmangersCount());
    dispatch(getEmployeeCount());
    dispatch(getDepartments());
    }
    dispatch(employeeReset())
  }, [deleteEmployeeIsError, deleteEmployeeIsSuccess])

  //   useEffect(() => {
  //     dispatch(getJobs({
  //       // "date": "1999-07-28",
  //       "stateFilter": 'any',
  //       "cursor":6
  //     }));
  //     setActiveTab('jobs')
  //   }, [dispatch]);



  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    //console.log(client_name)
    e.preventDefault();

    dispatch(
      createEmployee({
        role,
        name,
        department_ID,
        shift_timing_start,
        shift_timing_end,
        join_date: joinDate,
        dep_manager,
        photo_url:
          "https://robohash.org/49bac6f3e27e9ea18cf2459b8b9c2209?set=set2&bgset=&size=200x200",
      })
    );
  };

  console.log("Before rendering JobItem", jobs); // Add this log statement to check the jobs array before mapping

  const onDepartmentSelect = (department_ID) => {
    setDepartment_ID(department_ID);
  };

  const closeMyModal = () => {
    if (window.my_modal_3) {
      window.my_modal_3.close();
    }
  };

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          <HeadCard
            icon={folderIcon}
            value={employeeCount}
            heading={"Total Employees"}
          />
          <HeadCard
            icon={infoIcon}
            value={departmentmangersCount}
            heading={"Managers"}
          />
          <HeadCard icon={refreshIcon} value={3} heading={"Departments"} />
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Employees</h>
        </div>
        <hr />
        {/* Pending Approved Revision rejected */}
        <div className=" inline-block bg-white w-[92%] p-2 lg:p-5 ">
          <div className="tabs">
            <a
              id="Jobs"
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] active-tab`}
            >
              Employee
            </a>
          </div>
        </div>

        <div className=" lg:flex items-center justify-center bg-white w-[92%] p-1 lg:p-5 lg:px-7">
          <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] min-h-0 h-[40px] m-1 w-[310px] lg:w-full">
            <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
              <button>
                <img
                  src={require("../resources/charm_search.png")}
                  className=" justify-center items-center"
                />
              </button>
            </span>
            <input
              class=" py-2 lg:w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded text-sm  min-w-[280px]"
              type="text"
              placeholder="Search or type a command (Ctrl + G)"
              // value={project_start ? project_start.toISOString().slice(0, 10) : null}
              // onChange={handleProject_startDateSelect}
            />
          </form>

          {/* <Link to="/new-job" className="font-medium">
            
          </Link> */}

          <button
            type="button"
            className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[160px]"
            onClick={() => window.my_modal_3.showModal()}
          >
            Add Employee
            <img
              src={require("../resources/ic_round-keyboard-arrow-right.png")}
              className=" justify-center items-center"
            />
          </button>

          {/* <button className="btn" onClick={()=>window.my_modal_3.showModal()}>open modal</button> */}
          <dialog id="my_modal_3" className="modal">
            <form
              method="dialog"
              className="modal-box rounded-md lg:min-w-[800px] p-1 min-h-[600px] relative"
            >
              <div className="lg:grid grid-cols-10 gap-2 bg-white p-5 ">
                <div className="col-span-5">
                  <h3 className=" float-left font-medium text-2xl">
                    Employee Profile
                  </h3>
                </div>
                <div className="col-span-5 row-span-2">
                  <div className="p-2 bg-[#e4e4e4] w-60 mb-1 float-right grid grid-cols-3">
                    <div className="rounded-full p-2 col-span-1">
                      <img className=" w-16 h-16" src={profileIcon} />
                    </div>
                    <div className=" flex flex-col text-xs col-span-2 pt-4">
                      {name && (
                        <p className="font-light">
                          {name.length > 20 ? name.substring(1,20) : name }
                        </p>
                      )} 
                      {department_ID && (
                        <p className="font-light">
                          {department_ID === '1' ? 'Design' : 
                          department_ID === '2' ? 'Quotation' : 
                          department_ID === '3' ? 'BOM' : ''}
                        </p>
                      )}
                      {role && (
                        <p className="font-light">
                          {role === 1 ? 'Admin' : 
                          role === 2? 'Design Manager' : 
                          role === 3 ? 'Quotation Manager' :
                          role === 4 ? 'BOM Manager' : ''}
                        </p>
                      )}
                      
                    </div>
                  </div>
                </div>

                <div className="col-span-5 ">
                  <p>
                    <label className=" text-xs" for="">
                      Name
                    </label>
                    <input
                      className="input input-sm input-bordered w-full pt-1"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </p>
                </div>
                <div className=" row-start-3 col-span-4">
                  <p>
                    <label className=" text-xs" for="">
                      Department
                    </label>
                    <select
                      onChange={(e) => onDepartmentSelect(e.target.value)}
                      value={department_ID}
                      className="select select-sm select-bordered font-normal text-sm w-full"
                    >
                      <option disabled selected>
                        Select a department
                      </option>
                      {departments.length > 0
                        ? departments.map((department) => (
                            <>
                              <option
                                key={department.dep_id}
                                value={department.dep_id}
                              >
                                {department.name}
                              </option>
                            </>
                          ))
                        : null}
                    </select>
                  </p>
                </div>
                <div className=" row-start-3 col-start-7 col-span-4">
                  <p>
                    <label className=" text-xs" for="">
                      Access Role
                    </label>
                    <select
                      onChange={(e) => setRole(parseInt(e.target.value))}
                      value={role}
                      className="select select-sm select-bordered font-normal text-sm w-full"
                    >
                      <option disabled selected>
                        Select an Access Role
                      </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      {/* todo */}
                      {/* {enquiryIDs.length > 0
                        ? enquiryIDs.map((enquiryID) => (
                            <>
                              <option>{enquiryID.index_no}</option>
                            </>
                          ))
                        : null} */}
                    </select>
                  </p>
                </div>
                <div className="row-start-4  row-span-1 col-start-1 col-span-4">
                  <p>
                    <label className=" text-xs" for="">
                      Joining Date
                    </label>
                    <div class="flex flex-col">
                      <div class="mx-auto my-auto w-full sm:w-full md:w-full relative">
                        <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                          <input
                            class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={
                              joinDate ? format(joinDate, "yyyy-MM-dd") : ""
                            }
                            disabled
                          />
                          <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                            <button onClick={renderJoinDatePicker}>
                              <img
                                src={require("../resources/cal.png")}
                                className=" justify-center items-center"
                              />
                            </button>
                          </span>
                        </form>
                        {joinDateIsRendered && (
                          <div className=" border-2 rounded block top-[100%] absolute z-100 bg-white p-2">
                            <DayPicker
                              styles={dayPickerStyles}
                              captionLayout="dropdown" // Display the caption in the middle
                              navPosition="caption" // Place the navigation buttons relative to the caption
                              mode="single"
                              selected={joinDate}
                              onSelect={handleJoinDateSelect}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </p>
                </div>
                <div className=" flex row-start-5 row-span-1 col-start-1 col-span-4 ">
                  <div className="float-left w-1/2 pr-1">
                    <p>
                      <label className=" text-xs" for="">
                        Shift Timing
                      </label>
                      <input
                        className="input input-sm input-bordered w-full"
                        type="time"
                        onChange={(e) => setShift_timing_start(e.target.value)}
                        value={shift_timing_start}
                        id="shift_timing_start"
                      />
                    </p>
                  </div>
                  <div className="float-right w-1/2 flex pl-1">
                    <input
                      className="input input-sm input-bordered w-full self-end"
                      type="time"
                      id="shift_timing_end"
                      onChange={(e) => setShift_timing_end(e.target.value)}
                      value={shift_timing_end}
                    />
                  </div>
                </div>
                <div className="row-start-4 row-span-2 col-start-7 col-span-4">
                  <p className="h-[100px]">
                    <label className=" text-xs" for="">
                      Description
                    </label>
                    <textarea
                      class="textarea textarea-bordered w-full min-h-full"
                      placeholder="Description"
                      id="description"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </p>
                </div>
                <div className="row-start-6 row-span-2 col-start-1 col-span-10">
                  <p>
                    <label className=" text-xs" for="">
                      Remarks
                    </label>
                    <textarea
                      class="textarea textarea-bordered w-full"
                      placeholder="Remarks"
                      id="remarks"
                      // value={remarks}
                      // onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 p-5">
                  <button className="btn btn-sm m-1 text-sm normal-case font-medium" onClick={() => window.my_modal_3.close()}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
            </form>
          </dialog>
        </div>

        <div className="grid grid-cols-11  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          <div className="col-start-1 "></div>
          <div className="col-start-2 ">ID</div>
          <div className="col-start-3 col-span-2 ">Name</div>
          <div className="col-start-5 col-span-2 m-[-2px]">Role Number</div>
          <div className="col-start-7 col-span-2 ">Department</div>
          <div className="col-start-9 col-span-2 pl-1"></div>
          <div className="col-start-11 col-span-2 pl-1"></div>
          <hr className="col-span-11 mx-3 my-3" />

          {employees.length > 0
            ? employees.map((employee) => (
                <>
                  <EmployeeItem key={employee._id} employee={employee} />
                  <hr className="col-span-10 mx-3 my-3" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default Employees;
