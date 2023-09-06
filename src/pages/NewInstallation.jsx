import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getJobIDs,
  getJob,
} from "../features/jobs/jobSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { createInstallation, reset as installationReset } from "../features/installations/installationSlice";
import { installationSchema } from "../validationSchemas/installationSchema";

function NewInstallation() {
  const { user } = useSelector((state) => state.auth);

  const {
    job,
    jobIDs,
    isLoading: jobIsLoading,
    isSuccess: jobIsSuccess,
    message: jobMessage,
  } = useSelector((state) => state.job);

  const {
    createInstallationIsSuccess,
    createInstallationIsError,
    message: installationMessage,
  } = useSelector((state) => state.installation);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [index_no, setIndex_no] = useState(1);
  const [job_no, setJob_no] = useState('');

  const [client_name, setClient_name] = useState("");
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState("");

  const [installation_date, setInstallation_date] = useState(null);
  const [installation_dateIsRendered, setInstallation_dateIsRendered] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileDataArr, setFileDataArr] = useState([]);


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
    if (createInstallationIsError) {
      toast.error(installationMessage);
    }

    if (createInstallationIsSuccess) {
      toast.success("Installation Added!");
      dispatch(installationReset());
      setJob_no('')
      setClient_name('')
      setDescription('')
      setFeedback('')
      setInstallation_date(null)
      setSelectedFiles([])
      setFileDataArr([])
    }

    dispatch(installationReset());
  }, [
    createInstallationIsError,
    dispatch,
    createInstallationIsSuccess,
    navigate,
    installationMessage,
  ]);

  useEffect(() => {
    dispatch(getJobIDs());
  }, []);

  useEffect(() => {
    if (job.client_name) {
      setClient_name(job.client_name);
    }
  }, [job]);

  const onSubmit = (e) => {
    e.preventDefault();

  const installationData = {
      index_no,
      //created_date, 
      installation_date,
      job_no,
      description,
      feedback,
      client_name,
      files: fileDataArr
  };

  const { error } = installationSchema.validate(installationData);
        if (error) {
          toast.error(error.message);
          return null; 
        }
      
  dispatch(createInstallation({installationData, selectedFiles}))

  }

  if (jobIsLoading) {
    return <Spinner />;
  }

  const handleInstallation_dateDateSelect = (date) => {
    setInstallation_date(date);
    setInstallation_dateIsRendered(!installation_dateIsRendered);
  };

  const renderInstallation_dateDatePicker = (e) => {
    e.preventDefault();
    setInstallation_dateIsRendered(!installation_dateIsRendered);
  };

  const onJobIDSelect = (jobID) => {
    setJob_no(jobID)
    dispatch(getJob(jobID));
  };

 // Function to handle file selection
 const handleFileSelect = (event) => {
    const files = event.target.files;
    const allowedTypes = ['image/jpeg', 'image/png'];

    const selectedValidFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...selectedValidFiles,
    ]);

    const fileData = selectedValidFiles.map((file)=>{
      return {
        containerName: file.name,
        blobName: file.name
      }
    })

    setFileDataArr((preFileData)=>[...preFileData, ...fileData])
  };

  // Function to handle file drop and prevent default behavior
  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const allowedTypes = ['image/jpeg', 'image/png'];

    const droppedValidFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...droppedValidFiles,
    ]);
  };

  // Function to handle click on the drop area (trigger file input click)
  const handleDropAreaClick = () => {
    fileInputRef.current.click();
  };

  // Ref for the file input element
  const fileInputRef = React.createRef();

  // Function to render the list of selected files
  const renderSelectedFiles = () => {
    return selectedFiles.map((file, index) => (
      <div key={index}>
        <p>{file.name}</p>
      </div>
    ));
  };

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <h1 className="font-bold ">Installation</h1>
          <p className="text-xs">Create Entry</p>
        </div>
      </div>
      <hr />
      <div className="w-[92%] bg-white">
        <form onSubmit={onSubmit}></form>
        <div className="lg:grid grid-cols-6 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-span-6 font-semibold row-start-1 ">
            <p>Installation</p>
          </div>

          <div className="col-start-1 col-span-3 row-start-2">
            <p>
              <label className=" text-xs" htmlFor="">
                Client Name
              </label>
              <input
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                type="text"
                id="client_name"
                value={client_name}
                readOnly
              />
            </p>
          </div>

          <div className="col-span-3 col-start-1 row-start-3">
            <p>
              <label className=" text-xs" htmlFor="">
                Job No
              </label>
              <label className=" text-xs text-[#FF0000]" htmlFor="">
                *
              </label>
              <select
                onChange={(e) => onJobIDSelect(e.target.value)}
                value={job_no}
                className="select select-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
              >
                <option value="">
                  Select a job ID
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
          </div>

          <div className="col-span-2 col-start-1 inline relative row-start-4">
            <label className="cursor-pointer label text-xs">
              Installation Date
            </label>

            <div className="flex flex-col">
              <div className="mx-auto my-auto w-full sm:w-full md:w-full">
                <form className="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] h-8">
                  <input
                    className=" py-2 w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={
                      installation_date
                        ? format(installation_date, "yyyy-MM-dd")
                        : ""
                    }
                    disabled
                  />
                  <span className="flex items-center rounded rounded-l-none border-0 px-2 ">
                    <button onClick={renderInstallation_dateDatePicker}>
                      <img
                        src={require("../resources/cal.png")}
                        className=" justify-center items-center"
                      />
                    </button>
                  </span>
                </form>
                {installation_dateIsRendered && (
                  <div className=" border-2 rounded block top-[100%] absolute z-10 bg-white p-2">
                    <DayPicker
                      styles={dayPickerStyles}
                      captionLayout="dropdown" // Display the caption in the middle
                      navPosition="caption" // Place the navigation buttons relative to the caption
                      mode="single"
                      selected={installation_date}
                      onSelect={handleInstallation_dateDateSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" col-span-3 col-start-4 row-start-2 row-span-3 p-5">
            <label className="cursor-pointer label text-xs">
              Images
            </label>
            <div className=" bg-[#F7F8FA] p-5 rounded-2xl ">
            <div>
              <div
                className="drop-area relative p-5 min-h-[120px]  rounded-2xl flex items-center justify-center border-dashed border"
                onClick={handleDropAreaClick}
                onDrop={handleFileDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                <p className=" text-sm">Click to browse or drag and drop files here</p>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
              <div className="selected-files">
                <p className=" text-xs p-1">{selectedFiles.length > 0 && <h2>Selected Files:</h2>}
                {renderSelectedFiles()}</p>
                
              </div>
            </div>
            </div>
            
          </div>

          <div className="col-span-6 row-start-5 ">
            <p>
              <label className=" text-xs" htmlFor="">
                Client Feedback
              </label>
              <input
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                type="text"
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </p>
          </div>

          <div className="col-span-6 row-start-6 ">
            <p>
              <label className=" text-xs" htmlFor="">
                Description
              </label>
              <input
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>
          </div>

          <div className="col-span-6 inline-block">
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
      <div className="h-[320px]"></div>
    </div>
  );
}

export default NewInstallation;
