import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import HeadCard from '../components/HeadCard';
import { useState } from 'react';
import { format } from 'date-fns';
import {
  getDepartmentmangersCount,
  getEmployeeCount,
  getEmployees,
  createEmployee,
  getDepartments,
  reset as employeeReset,
} from '../features/employees/employeeSlice';

import folderIcon from '../resources/folder.svg';
import infoIcon from '../resources/Info.svg';
import refreshIcon from '../resources/refresh.svg';
import EmployeeItem from '../components/EmployeeItem';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-toastify';
import { getAllTasks } from '../features/tasks/taskSlice';

function Labourers() {
  const {
    employeeCount,
    departmentmangersCount,
    isLoading: employeeIsLoading,
    isSuccess: employeeIsSuccess,
    message,
  } = useSelector((state) => state.employee);

  const {
    tasks,
    isLoading: taskIsLoading,
    isSuccess: taskIsSuccess,
    message: taskMessage,
  } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const [tasksArr, setTasksArr] = useState([]);

  useEffect(() => {
    //run on unmount
    return () => {
      if (employeeIsSuccess) {
        dispatch(employeeReset);
      }
    };
  }, []);

  useEffect(() => {
    dispatch(getDepartmentmangersCount());
    dispatch(getEmployeeCount());
    dispatch(getDepartments());
    dispatch(getAllTasks());
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const result = [];

      // Create a map to group tasks by emp_no, emp_name, and department_id
      const taskMap = new Map();

      tasks.forEach((item) => {
        const { emp_no, emp_name, department_id } = item;
        const key = `${emp_no}`;

        if (!taskMap.has(key)) {
          taskMap.set(key, {
            emp_no,
            emp_name,
            department_id,
            tasks: [],
          });
        }

        taskMap.get(key).tasks.push({
          index_no: item.index_no,
          job_no: item.job_no,
          task_name: item.task_name,
          start_date: item.start_date,
          end_date: item.end_date,
          description: item.description,
          status: item.status,
          urgent: item.urgent,
          remarks: item.remarks,
          project_name: item.project_name,
        });
      });
      result.push(...taskMap.values());
      setTasksArr(result);

    }
  }, [tasks]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  if (employeeIsLoading) {
    console.log('employee loading');
    return <Spinner />;
  }

  const showStatus = (status) => {
    switch (status) {
      case 'ongoing':
        return (
          <div className=" rounded p-1 bg-[#FBF5C4] text-[#8B5401] w-[80px] inline-block text-xs lg:text-sm text-center ">
            Ongoing
          </div>
        );
      case 'new':
        return (
          <div className=" rounded p-1 bg-[#fbc4ea] text-[#1b140a] w-[80px] inline-block text-xs lg:text-sm text-center ">
            New
          </div>
        );
      case 'complete':
        return (
          <div className=" rounded p-1 bg-[#97FAB8] text-[#14AE5C] w-[80px] text-xs lg:text-sm inline-block text-center">
            Complete
          </div>
        );
      case 'Revision':
        return (
          <div className=" rounded p-1 bg-[#fa9797] text-[#000000] w-[80px] text-xs lg:text-sm inline-block text-center">
            Revision
          </div>
        );
    }
  };

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          <HeadCard icon={folderIcon} value={employeeCount} heading={'Total Labourers'} />
          <HeadCard icon={infoIcon} value={departmentmangersCount} heading={'Managers'} />
          <HeadCard icon={refreshIcon} value={3} heading={'Departments'} />
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h1 className="font-bold text-2xl">Labourers</h1>
        </div>
        <hr />
        {/* Pending Approved Revision rejected */}
        <div className=" inline-block bg-white w-[92%] p-2 lg:p-5 ">
          <div className="tabs">
            <a
              id="Jobs"
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] active-tab`}
            >
              Labourers
            </a>
          </div>
        </div>

        {/* <div className=" lg:flex items-center justify-center bg-white w-[92%] p-1 lg:p-5 lg:px-7">
          <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] min-h-0 h-[40px] m-1 w-[310px] lg:w-full">
            <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
              <button>
                <img src={require('../resources/charm_search.png')} className=" justify-center items-center" />
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
        </div>    */}

        <div className=" inline-block bg-white w-[92%] p-2 lg:p-5 ">
          <div className="collapse-title text-sm font-medium grid grid-cols-3  h-11 bg-slate-100 border">
            <div className="col-span-1">No</div>
            <div className="col-span-1">Name</div>
            <div className="col-span-1">Department</div>
          </div>
          {tasksArr &&
            tasksArr.length > 0 &&
            tasksArr.map((employee, index) => (
              <div key={employee.id} className="collapse collapse-arrow rounded-none shadow-md ">
                <input
                  className=" w-full"
                  type="radio"
                  name="my-accordion-2"
                  checked={index === activeIndex}
                  onChange={() => handleAccordionClick(index)}
                />
                <div className="collapse-title text-sm font-medium grid grid-cols-3  h-11 bg-slate-50">
                  <div className="col-span-1">{employee.emp_no}</div>
                  <div className="col-span-1">{employee.emp_name}</div>
                  <div className="col-span-1">{employee.department_id}</div>
                </div>

                <div className="collapse-content">
                  {/* <hr /> */}
                  {employee &&
                    employee.tasks &&
                    employee.tasks.map((file, index) => {
                      {
                        return index === 0 ? (
                          <>
                            <div  key={index} className="p-2">
                              <div  className="grid grid-cols-11 text-sm">
                                <div className="col-span-1 flex  justify-center ">Job No</div>
                                <div className="col-span-2 flex  justify-center">Project Name</div>
                                <div className="col-span-1 flex  justify-center">Task No</div>
                                <div className="col-span-2 flex  justify-center">Task Name</div>
                                <div className="col-span-2 flex  justify-center">Start Date</div>
                                <div className="col-span-2 flex  justify-center">End Date</div>
                                <div className="col-span-1 flex  justify-center">Status</div>
                              </div>
                            </div>

                            <hr />
                          </>
                        ) : (
                          ''
                        );
                      }
                    })}

                  {employee &&
                    employee.tasks &&
                    employee.tasks.map((task, index) => (
                      <>
                        <div className="p-2" key={task.index_no}>
                          <div key={index} className="grid grid-cols-11 text-sm">
                            <div className="col-span-1 flex items-center justify-center ">{task.job_no}</div>
                            <div className="col-span-2 flex items-center justify-center truncate">
                              {task.project_name}
                            </div>
                            <div className="col-span-1 flex items-center justify-center">{task.index_no}</div>
                            <div className="col-span-2 flex items-center justify-center truncate">{task.task_name}</div>
                            <div className="col-span-2 flex items-center justify-center">
                              {task && task.start_date ? format(new Date(task.start_date), 'dd MMMM yyyy') : ''}
                            </div>
                            <div className="col-span-2 flex items-center justify-center">
                              {task && task.end_date ? format(new Date(task.end_date), 'dd MMMM yyyy') : ''}
                            </div>
                            <div className="col-span-1 flex items-center justify-center">{showStatus(task.status)}</div>
                          </div>
                        </div>

                        <hr />
                      </>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Labourers;
