import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, createEnquiry, getEnquiryIDs, getEnquiryByID } from "../features/enquiries/enquirySlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { createJob, getJob, createSubTask, reset as jobReset } from "../features/jobs/jobSlice";

function NewJobSubTask() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message, enquiryIDs, enquiry } = useSelector(
    (state) => state.enquiry
  );

  const {
    createJobIsSuccess, 
    createJobIsError, 
    message: jobMessage,
    isLoading: jobIsLoading,
    isSuccess: jobIsSuccess,
    job,
  } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();

  //in frontend

  const [main_job_id, setMain_job_id] = useState("");

  const [client_name, setClient_name] = useState("");
  const [project_name, setProject_name] = useState("");
  const [site_visit, setSite_visit] = useState(false);
  const [inquiry_number, setInquiry_number] = useState("");
  
  const [priority_level, setPriority_level] = useState("1");
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("Pending");
  const [description, setDescription] = useState("This is a sample description");

  const [project_start, setProject_start] = useState(null);
  const [projectStartIsRendered, setProjectStartIsRendered] = useState(false);

  const [manufacturing_start, setManufacturing_start] = useState(null);
  const [manufacturing_startIsRendered, setManufacturing_startIsRendered] =
    useState(false);

  const [Purchasing_completion, setPurchasing_completion] = useState(null);
  const [Purchasing_completionIsRendered, setPurchasing_completionIsRendered] =
    useState(false);

  const [bom_completion, setBom_completion] = useState(null);
  const [bom_completionIsRendered, setBom_completionIsRendered] =
    useState(false);

  const [manufacturing_end, setManufacturing_end] = useState(null);
  const [manufacturing_endIsRendered, setManufacturing_endIsRendered] =
    useState(false);

  const [internal_QC, setInternal_QC] = useState(null);
  const [internal_QCIsRendered, setInternal_QCIsRendered] = useState(false);

  const [installation_process, setInstallation_process] = useState(null);
  const [installation_processIsRendered, setInstallation_processIsRendered] =
    useState(false);

  const [external_QC, setExternal_QC] = useState(null);
  const [external_QCIsRendered, setExternal_QCIsRendered] = useState(false);

  const [project_end, setProject_end] = useState(null);
  const [project_endIsRendered, setProject_endIsRendered] = useState(false);

  const [completion, setCompletion] = useState(null);
  const [completionIsRendered, setCompletionIsRendered] = useState(false);

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

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    else if (createJobIsError) {
      toast.error(jobMessage);
    }

    if (createJobIsSuccess) {
      toast.success('Job Added!')
      dispatch(jobReset());
      navigate("/jobs");
    }

    dispatch(jobReset());
  }, [createJobIsError, dispatch, createJobIsSuccess, navigate, jobMessage]);

  useEffect(()=>{
    console.log('first')
    dispatch(getEnquiryIDs())
    dispatch(getJob(jobId));
  },[])

  useEffect(() => {
    // This useEffect will run whenever the Redux state 'enquiry' is updated
    
      // If client_name and project_name are available in the Redux state,
      // update the local component state accordingly
      setClient_name(enquiry.client_name);
      setProject_name(enquiry.project_name);
      setSite_visit(enquiry.site_visit)
    
  }, [enquiry]);

  useEffect(() => {
    setMain_job_id(job.main_job_id)
  }, [job]);

  const onSubmit = (e) => {
    // console.log(client_name);
    e.preventDefault();
    dispatch(
      createSubTask({
        inquiry_number,
        main_job_id,
        priority_level,
        //status set to pending
        status,
        brief,
        project_start,
        manufacturing_start,
        internal_QC,
        project_end,
        bom_completion,
        manufacturing_end,
        installation_process,
        completion,
        Purchasing_completion,
        external_QC,
        description,
        //details
        
        // client_name,
        // project_name,
        // contactNo,
        // IHT_Member,
        // Brief,
        // site_visit,
        // sub_task,
        // status,
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleProject_startDateSelect = (date) => {
    setProject_start(date);
    setProjectStartIsRendered(!projectStartIsRendered);
    // if (date.length >= 10) {
    //   setProject_start(date);
    //   if (projectStartIsRendered) {
    //     setProjectStartIsRendered(!projectStartIsRendered);
    //   }
    // }
  };

  const renderProjectStartDatePicker = (e) => {
    e.preventDefault();
    setProjectStartIsRendered(!projectStartIsRendered);
  };

  const handleManufacturing_startDateSelect = (date) => {
    setManufacturing_start(date);
    setManufacturing_startIsRendered(!manufacturing_startIsRendered);
  };

  const renderManufacturing_startDatePicker = (e) => {
    e.preventDefault();
    setManufacturing_startIsRendered(!manufacturing_startIsRendered);
  };

  const handlePurchasing_completionDateSelect = (date) => {
    setPurchasing_completion(date);
    setPurchasing_completionIsRendered(!Purchasing_completionIsRendered);
  };

  const renderPurchasing_completionDatePicker = (e) => {
    e.preventDefault();
    setPurchasing_completionIsRendered(!Purchasing_completionIsRendered);
  };

  const handleBom_completionDateSelect = (date) => {
    setBom_completion(date);
    setBom_completionIsRendered(!bom_completionIsRendered);
  };

  const renderBom_completionDatePicker = (e) => {
    e.preventDefault();
    setBom_completionIsRendered(!bom_completionIsRendered);
  };

  const handleManufacturing_endDateSelect = (date) => {
    setManufacturing_end(date);
    setManufacturing_endIsRendered(!manufacturing_endIsRendered);
  };

  const renderManufacturing_endDatePicker = (e) => {
    e.preventDefault();
    setManufacturing_endIsRendered(!manufacturing_endIsRendered);
  };

  const handleInternal_QCDateSelect = (date) => {
    setInternal_QC(date);
    setInternal_QCIsRendered(!internal_QCIsRendered);
  };

  const renderInternal_QCDatePicker = (e) => {
    e.preventDefault();
    setInternal_QCIsRendered(!internal_QCIsRendered);
  };

  const handleInstallation_processDateSelect = (date) => {
    setInstallation_process(date);
    setInstallation_processIsRendered(!installation_processIsRendered);
  };

  const renderInstallation_processDatePicker = (e) => {
    e.preventDefault();
    setInstallation_processIsRendered(!installation_processIsRendered);
  };

  const handleExternal_QCDateSelect = (date) => {
    setExternal_QC(date);
    setExternal_QCIsRendered(!external_QCIsRendered);
  };

  const renderExternal_QCDatePicker = (e) => {
    e.preventDefault();
    setExternal_QCIsRendered(!external_QCIsRendered);
  };

  const handleProject_endDateSelect = (date) => {
    setProject_end(date);
    setProject_endIsRendered(!project_endIsRendered);
  };

  const renderProject_endDatePicker = (e) => {
    e.preventDefault();
    setProject_endIsRendered(!project_endIsRendered);
  };

  const handleCompletionDateSelect = (date) => {
    setCompletion(date);
    setCompletionIsRendered(!completionIsRendered);
  };

  const renderCompletionDatePicker = (e) => {
    e.preventDefault();
    setCompletionIsRendered(!completionIsRendered);
  };

  const onEnquiryIDSelect = (enquiryID) =>{
    setInquiry_number(parseInt(enquiryID))
    dispatch(getEnquiryByID(enquiryID))
    
  }

 


  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <h1 className="font-bold ">Job Number</h1>
          <p className="text-xs">
            You are viewing every Job Number that's made so far...
          </p>
        </div>
        {/* <div className="float-right">
          <button className="btn btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] ">Create Job</button>
        </div> */}
      </div>
      <hr />
      <div className="w-[92%] bg-white">
        <form onSubmit={onSubmit}></form>
        <div className="lg:grid grid-cols-6 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-span-6 font-medium">
            <p>Add a job</p>
          </div>
          <div className="col-span-3 ">
            <p>
              <label className=" text-xs" for="">
                Client Name
              </label>
              <input
                className="input input-sm input-bordered w-full"
                type="text"
                id="client_name"
                value={client_name}
                disabled
                // onChange={(e) => setClient_name(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-3 ">
            <p>
              <label className=" text-xs" for="">
                Main job Number
              </label>
              <input
                className="input input-sm input-bordered w-full text-xs"
                type="text"
                id="main_job_id"
                value={main_job_id}
                onChange={(e) => setMain_job_id(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-3 ">
            <p>
              <label className=" text-xs" for="">
                Project Name
              </label>
              <input
                className="input input-sm input-bordered w-full"
                type="text"
                id="project_name"
                value={project_name}
                disabled
                // onChange={(e) => setIHT_Member(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-3 ">
            <p>
              <label className=" text-xs" for="">
                Job ID
              </label>
              <select onChange={(e) => onEnquiryIDSelect(e.target.value)} value={enquiry.index_no} className="select select-sm select-bordered font-normal text-sm w-full">
              <option disabled selected >Select an enquiry ID</option>
                {enquiryIDs.length > 0
                    ? enquiryIDs.map((enquiryID) => (
                        <>
                          <option >{enquiryID.index_no}</option>
                        </>
                      ))
              : null}
                {/* <option>Who shot first?</option>
                <option>Han Solo</option>
                <option>Greedo</option> */}
              </select>
  
              {/* <input
                className="input input-sm input-bordered w-full"
                type="text"
              /> */}
            </p>
          </div>
          <div className="col-span-6">
            <p>
              <label className=" text-xs" for="">
                Brief
              </label>
              <textarea
                class="textarea textarea-bordered w-full"
                placeholder="Brief"
                id="Brief"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className="col-span-3">
            <label class="cursor-pointer label text-xs">
              Site visit required
            </label>
            <input
              type="checkbox"
              class="toggle toggle-primary toggle-xs ml-1"
              id="site_visit"
              checked={site_visit}
              disabled
              // onClick={(e) => setSite_visit(e.target.checked)}
            />
          </div>
          <div className="col-span-6 inline-block">
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
          <div className="col-span-2 inline relative">
            <label class="cursor-pointer label text-xs">Project Start</label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    // value={project_start ? project_start.toISOString().slice(0, 10) : null}
                    value={project_start ? format(project_start, 'yyyy-MM-dd') : ''}
                    disabled
                    // onChange={handleProject_startDateSelect}

                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderProjectStartDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {projectStartIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={project_start}
                      onSelect={handleProject_startDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 inline relative">
            <label class="cursor-pointer label text-xs">BOM Completion</label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      bom_completion
                        ? format(bom_completion, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderBom_completionDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {bom_completionIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={bom_completion}
                      onSelect={handleBom_completionDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 inline relative">
            <label class="cursor-pointer label text-xs">
              Purchasing completion
            </label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      Purchasing_completion
                        ? format(Purchasing_completion, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderPurchasing_completionDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {Purchasing_completionIsRendered && (
                  <div className=" border-2 rounde block top-[100%] absolute z-10 bg-white">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={Purchasing_completion}
                      onSelect={handlePurchasing_completionDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 inline relative">
            <label class="cursor-pointer label text-xs">
              Manufacturing Start
            </label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      manufacturing_start
                        ? format(manufacturing_start, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderManufacturing_startDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {manufacturing_startIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={manufacturing_start}
                      onSelect={handleManufacturing_startDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 inline relative">
            <label class="cursor-pointer label text-xs">
              Manufacturing End
            </label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      manufacturing_end
                        ? format(manufacturing_end, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderManufacturing_endDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {manufacturing_endIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={manufacturing_end}
                      onSelect={handleManufacturing_endDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2  inline relative col-start-1">
            <label class="cursor-pointer label text-xs">Internal QC</label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      internal_QC
                        ? format(internal_QC, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderInternal_QCDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {internal_QCIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={internal_QC}
                      onSelect={handleInternal_QCDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2  inline relative">
            <label class="cursor-pointer label text-xs">
              Installation Process
            </label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      installation_process
                        ? format(installation_process, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderInstallation_processDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {installation_processIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={installation_process}
                      onSelect={handleInstallation_processDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2  inline relative">
            <label class="cursor-pointer label text-xs">External QC</label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      external_QC
                        ? format(external_QC, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderExternal_QCDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {external_QCIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={external_QC}
                      onSelect={handleExternal_QCDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2  inline relative">
            <label class="cursor-pointer label text-xs">Project End</label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      project_end
                        ? format(project_end, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderProject_endDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {project_endIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={project_end}
                      onSelect={handleProject_endDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2  inline relative">
            <label class="cursor-pointer label text-xs">Completion</label>

            <div class="flex flex-col">
              <div class="mx-auto my-auto w-full sm:w-full md:w-full">
                <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    class=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      completion ? format(completion, 'yyyy-MM-dd') : ''
                    }
                    disabled
                  />
                  <span class="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderCompletionDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {completionIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={completion}
                      onSelect={handleCompletionDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[320px]"></div>
    </div>
  );
}

export default NewJobSubTask;
