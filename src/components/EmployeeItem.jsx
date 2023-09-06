import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../features/employees/employeeSlice";

function EmployeeItem({ employee }) {
  console.log(employee);

  const dispatch = useDispatch()

  const handleDeleteEmployee = () =>{
    console.log("delete Employee ran "+employee.emp_no)
    dispatch(deleteEmployee(parseInt(employee.emp_no) ))
  }

 const showDepartment = () =>{
  switch(employee.department_id){
    //set colors according to department
    case '1' : return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Design</div>
    case '2' : return <div className=" rounded p-2 bg-[#dafbc4] text-[#8B5401] inline-block text-xs lg:text-sm">Quotation</div>
    case '3' : return <div className=" rounded p-2 bg-[#d7c4fb] text-[#8B5401] inline-block text-xs lg:text-sm">BOM</div>
    case '4' : return <div className=" rounded p-2 bg-[#fbc4c7] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>
    case '5' : return <div className=" rounded p-2 bg-[#97e6fa] text-[#8B5401] text-xs lg:text-sm inline-block">Complete</div>
  }
 }
  

  return (
    <>
      <div className="col-start-1  "></div>
      <div className="col-start-2  ">{employee.emp_no}</div>
      <div className="col-start-3 col-span-2  ">{employee.name}</div>
      <div className="col-start-5 col-span-2 ">{employee.role}</div> 
      <div className="col-start-7 col-span-2  "> {showDepartment()}</div>
      {/* <div className="col-start-9 col-span-2  ">{employee.brief}</div> */}
      <div className="col-start-9 col-span-1 ">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" m-1 text-3xl">
          ...
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
            <Link to={`/employee/${employee.emp_no}/edit`} className="">
                Edit
              </Link>
            </li>
            <li>
            <div onClick={handleDeleteEmployee}>Delete</div>
            </li>
          </ul>
        </div>
      </div>
      {/* <Link to={`/job/${job._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
    </>
  );
}

export default EmployeeItem;
