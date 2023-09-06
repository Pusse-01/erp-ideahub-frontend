import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {reset, 
  getDepartments,
  getEmployee,
  updateEmployee,
} from "../features/employees/employeeSlice";

import { toast } from "react-toastify";

import profileIcon from "../resources/profile-svgrepo-com.svg";


import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function UpdateEmployee() {
  const { jobs, isLoading, isSuccess } = useSelector((state) => state.job);
  const {
    employee,
    departments,
    isLoading: employeeIsLoading,
    isSuccess: employeeIsSuccess,
    createEmployeeIsError,
    createEmployeeIsSuccess,
    message: employeeMessage
  } = useSelector((state) => state.employee);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {employeeId} = useParams()

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
    if (createEmployeeIsError) {
      toast.error(employeeMessage);
    }

    if (createEmployeeIsSuccess) {
      toast.success('Employee Updated!')
      dispatch(reset());
      navigate("/employees");
    }
  }, [createEmployeeIsError, dispatch, createEmployeeIsSuccess, employeeMessage]);

  useEffect(() => {
    dispatch(getEmployee(employeeId))
    dispatch(getDepartments());
  }, []);

  useEffect(() => {
    if(employee){
        setRole(employee.role)
        setName(employee.name)
        setDepartment_ID(employee.department_id)
        setShift_timing_start(employee.shift_timing_start)
        setShift_timing_end(employee.shift_timing_end)

        if(employee.join_date){
            setJoinDate( new Date(employee.join_date), 'yyyy-MM-dd' )
        }
        
        setDep_manager(employee.dep_manager)
        setPhoto_url(employee.photo_url)
    }
  }, [employee]);

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
      updateEmployee({
        role,
        name,
        department_ID,
        shift_timing_start,
        shift_timing_end,
        join_date: joinDate,
        dep_manager,
        photo_url:
          "https://robohash.org/49bac6f3e27e9ea18cf2459b8b9c2209?set=set2&bgset=&size=200x200",
          emp_no: employeeId
      })
    );
  };

  const onDepartmentSelect = (department_ID) => {
    setDepartment_ID(department_ID);
  };

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className=" lg:flex items-center justify-center bg-white w-[92%] p-1 lg:p-5 lg:px-7 m-9">
          <div className="lg:grid grid-cols-10 gap-2 bg-white p-5 ">
            <div className="col-span-5">
              <h3 className=" float-left font-medium text-2xl">
                Edit Employee Profile
              </h3>
            </div>
            <div className="col-span-5 row-span-2">
              <div className=" float-right flex justify-center items-center p-2 bg-[#e4e4e4] w-40 mb-1">
                <div className="  rounded-full float-left p-2">
                  <img className=" w-16 h-16" src={profileIcon} />
                </div>
                <div className="flex space flex-col text-xs ">
                  <p className=" font-medium">{name}</p>
                  <p className=" font-light">{}</p>
                  <p className=" font-light">{}</p>
                  {/* todo */}
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
                        value={joinDate ? format(joinDate, "yyyy-MM-dd") : ""}
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
            <div className=" row-start-8 col-span-10 inline-block">
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
      </div>
    </>
  );
}

export default UpdateEmployee;
