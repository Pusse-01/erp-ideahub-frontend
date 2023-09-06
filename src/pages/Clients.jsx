import React, { useEffect } from "react";

import { getJobs, reset } from "../features/jobs/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import JobItem from "../components/JobItem";
import HeadCard from "../components/HeadCard";
import { Link } from "react-router-dom";
import { useState } from "react";

import folderIcon from "../resources/folder.svg";
import infoIcon from "../resources/Info.svg";
import refreshIcon from "../resources/refresh.svg";

function Clients() {
  const { jobs, isLoading, isSuccess } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    //run on unmount
    return () => {
      if (isSuccess) {
        console.log(jobs);
        //dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

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

  console.log("Before rendering JobItem", jobs); // Add this log statement to check the jobs array before mapping

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="  bg-white mt-5 w-[92%] p-5 flex items-center justify-between">
          <div className="">
            <h className=" font-medium text-xl">Manage Clients</h>
            {/* <p className=" font-normal text-base text-[#9FA1A6]">
                Lorem Ipsum is simply dummy text ...
                </p> */}
          </div>

          <div className="">
            <Link to="/new-job" className="font-medium">
              <button
                type="button"
                className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[124px]"
              >
                Add Client
                <img
                  src={require("../resources/ic_round-keyboard-arrow-right.png")}
                  className=" justify-center items-center"
                />
              </button>
            </Link>
          </div>
        </div>
        <hr />
        {/* Pending Approved Revision rejected */}

        <div className=" lg:flex items-center justify-center bg-white w-[92%] p-1 lg:p-5 lg:px-7">
          <div className="bg-white w-[92%] h-[150px] border border-gray-100 rounded-md inline-block">
            <div className="w-[30%] float-left bg-[#F0F1F3] h-full rounded-tl-md rounded-bl-md flex items-center justify-center">
              Client {1}
            </div>
            <div className="w-[70%] float-right h-full px-4">
              <div className=" p-2 ">
                <h1 className=" font-medium text-base text-gray-600">
                  Lisy Store
                </h1>
                <div className=" text-sm font-normal text-gray-400">
                  <p className="py-2">1A/Krihnarajapuram, 3 rd street sulur</p>
                  <p className="py-2"> Coimbatore - 6313403</p>
                  <p className="py-2"> 044- 653578</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" lg:flex items-center justify-center bg-white w-[92%] p-1 lg:p-5 lg:px-7">
          <div className="bg-white w-[92%] h-[150px] border border-gray-100 rounded-md inline-block">
            <div className="w-[30%] float-left bg-[#F0F1F3] h-full rounded-tl-md rounded-bl-md flex items-center justify-center">
              Client {1}
            </div>
            <div className="w-[70%] float-right h-full px-4">
              <div className=" p-2 ">
                <h1 className=" font-medium text-base text-gray-600">
                  Lisy Store
                </h1>
                <div className=" text-sm font-normal text-gray-400">
                  <p className="py-2">1A/Krihnarajapuram, 3 rd street sulur</p>
                  <p className="py-2"> Coimbatore - 6313403</p>
                  <p className="py-2"> 044- 653578</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" lg:flex items-center justify-center bg-white w-[92%] p-1 lg:p-5 lg:px-7">
          <div className="bg-white w-[92%] h-[150px] border border-gray-100 rounded-md inline-block">
            <div className="w-[30%] float-left bg-[#F0F1F3] h-full rounded-tl-md rounded-bl-md flex items-center justify-center">
              Client {1}
            </div>
            <div className="w-[70%] float-right h-full px-4">
              <div className=" p-2 ">
                <h1 className=" font-medium text-base text-gray-600">
                  Lisy Store
                </h1>
                <div className=" text-sm font-normal text-gray-400">
                  <p className="py-2">1A/Krihnarajapuram, 3 rd street sulur</p>
                  <p className="py-2"> Coimbatore - 6313403</p>
                  <p className="py-2"> 044- 653578</p>
                </div>
              </div>
            </div>
          </div>
        </div>        

      </div>
    </>
  );
}

export default Clients;
