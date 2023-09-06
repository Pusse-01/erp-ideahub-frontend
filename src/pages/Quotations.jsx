import React, { useEffect } from "react";

//import { getQuotationCountAll, getQuotationCountRevision, getQuotationCount, getQuotations, reset } from "../features/quotations/quotationSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import QuotationItem from "../components/QuotationItem";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { getQuotations, reset } from "../features/quotations/quotationSlice";

function Quotations() {
     const { quotations, isLoading, isSuccess, quotationCount, quotationCountRevision, quotationCountAll, deleteQuotationIsSuccess, deleteQuotationIsError, message} = useSelector((state) => state.quotation);

    const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("any");
  const [daysCount, setDaysCount] = useState(30);

    useEffect(() => {

      dispatch(getQuotations({
        "stateFilter": activeTab,
        "daysCount": daysCount
      }));

      //run on unmount
      return () => {
        if (isSuccess) {
          console.log(quotations);
          //dispatch(reset());
        }
      };
    }, []);

        useEffect(() => {
      dispatch(getQuotations({
        "stateFilter": activeTab,
        "daysCount": daysCount
      }));
    }, [activeTab, daysCount]);

    useEffect(()=>{
      if(deleteQuotationIsError){
        toast.error(message)
      }
      if(deleteQuotationIsSuccess){
        toast.success("Quotation Deleted!")
        dispatch(getQuotations({
          "stateFilter": activeTab,
          "cursor":10,
          "daysCount": daysCount
        }));
      }
      dispatch(reset())
    }, [deleteQuotationIsError, deleteQuotationIsSuccess])

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  const clickedDateRange = (e) => {
    setDaysCount(e.target.id);
  };

  const clickedTab = (e) => {
    setActiveTab(e.target.id);
  };

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Quotations</h>
          <p className=" font-normal text-base text-[#9FA1A6]">
            You Have requests awaiting your approval
          </p>
        </div>
        <hr />
        {/* Pending Approved Revision rejected */}
        <div className=" inline-block bg-white w-[92%] p-2 lg:p-5 ">
          <div className="tabs">
            <a
              id="any"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === "any" ? "active-tab" : ""
              }`}
            >
              All
            </a>
            <a
              id="Pending"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === "Pending" ? "active-tab" : ""
              }`}
            >
              Pending Jobs
            </a>
            <a
              id="In Production"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === "In Production" ? "active-tab" : ""
              }`}
            >
              Started Jobs
            </a>
            
            <a
              id="Completed"
              onClick={clickedTab}
              className={`tab tab-bordered text-black hover:text-[#5c4ec9] hover:border-[#5c4ec9] ${
                activeTab === "Completed" ? "active-tab" : ""
              }`}
            >
              Completed Jobs
            </a>
          </div>
        </div>

        <div className=" lg:flex items-center justify-start bg-white w-[92%] p-1 lg:p-5">
          <div className="dropdown dropdown-bottom dropdown-end m-1">
            <label
              tabIndex={0}
              className="btn min-h-[40px] h-[40px] min-w-[180px] m-0 "
            >
              <img
                src={require("../resources/call.png")}
                className=" justify-center items-center"
              />
              {daysCount !== "-1" ? `last ${daysCount} days` : "All"}
              <img
                src={require("../resources/darrow.png")}
                className=" justify-center items-center"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-40 "
            >
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

          <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] min-h-0 h-[40px] m-1 w-[310px]">
            <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
              <button>
                <img
                  src={require("../resources/charm_search.png")}
                  className=" justify-center items-center"
                />
              </button>
            </span>
            <input
              class=" py-2 lg:w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded text-sm  min-w-[120px]"
              type="text"
              placeholder="Search or type a command (Ctrl + G)"
            />
          </form>

          <Link to="/new-quotation" className="font-medium">
            <button
              type="button"
              className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[162px]"
            >
              Create Quotation
              <img
                src={require("../resources/ic_round-keyboard-arrow-right.png")}
                className=" justify-center items-center"
              />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-11  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
        <div className="col-start-1 flex items-center ">{}</div>
      <div className="col-start-2 col-span-2 flex items-center ">Customer Name</div>
      <div className="col-start-4 col-span-2 flex items-center">Status</div>
      <div className="col-start-6 col-span-2 flex items-center ">Order ID</div>
      <div className="col-start-8 col-span-2 flex items-center ">Quotations</div>
      <div className="col-start-10 col-span-2 flex items-center ">Started Date</div>
          <hr className="col-span-11 mx-3 my-3" />
        </div>

        <div className="grid grid-cols-11  grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base">
          {/* {<QuotationItem key={quotations.data[0]._id} quotation={quotations.data[0]} />} */}

          {quotations.length > 0
            ? quotations.map((quotation) => (
                <>
                  <QuotationItem
                    key={quotation._id}
                    quotation={quotation}
                  />
                  <hr className="col-span-10 mx-3 my-3" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default Quotations;
