import downloadIcon from '../resources/save-file.svg';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { getDesign } from '../features/designs/designSlice';
import { getURLs, reset as azureReset } from '../features/azure/azureSlice';
import { getEnquiryByID } from '../features/enquiries/enquirySlice';
const { format } = require('date-fns');

function ViewDesign() {
  const { user } = useSelector((state) => state.auth);

  const {
    // job,
    // isLoading: jobIsLoading,
    // isSuccess: jobIsSuccess,
    urls,
  } = useSelector((state) => state.azure);

  const {
    // isLoading: enquiryIsLoading,
    // isSuccess: enquiryIsSuccess,
    enquiry,
  } = useSelector((state) => state.enquiry);

  const {
    // job,
    isLoading: designIsLoading,
    // isSuccess: designIsSuccess,
    enquiryDesigns,
  } = useSelector((state) => state.design);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enquiryId } = useParams();

  const [client_name, setClient_name] = useState('');
  const [status, setStatus] = useState('Pending');
  const [description, setDescription] = useState('');
  const [sitemeasurements, setSitemeasurements] = useState(null);
  const [project_name, setProject_name] = useState('');

  const [activeIndex, setActiveIndex] = useState(0);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };


  useEffect(() => {
    if (enquiryId) {
      dispatch(getDesign(enquiryId));
    }
    if (enquiryId) {
      dispatch(getEnquiryByID(enquiryId));
    }
  }, []);

  useEffect(() => {
    if (urls) {
      setTimeout(() => {
        window.open(urls, '_blank');
      }, 3000);
      
    }
    dispatch(azureReset());
  }, [urls]);

  useEffect(() => {
    if (enquiryDesigns && enquiryDesigns.length > 0) {
      if (activeIndex > -1) {
        if (enquiryDesigns[activeIndex]) {
          setClient_name(enquiryDesigns[activeIndex].client_name);
          setProject_name(enquiryDesigns[activeIndex].project_name);
          setDescription(enquiryDesigns[activeIndex].description);
          setStatus(enquiryDesigns[activeIndex].status);
          setSitemeasurements(enquiryDesigns[activeIndex].sitemeaurements);
        }
      }
    } else if (enquiry) {
      setClient_name(enquiry.client_name);
      setProject_name(enquiry.project_name);
      setStatus(enquiry.status);
    }
  }, [enquiryDesigns, activeIndex, enquiry]);

  if (designIsLoading) {
    return <Spinner />;
  }

  const downloadPdf = (containername, blobname) => {

    setIsButtonDisabled(true); // Disable the button
    setTimeout(() => {
      setIsButtonDisabled(false); // Re-enable the button after 3 seconds
    }, 3000); // 3000 milliseconds (3 seconds)
    
    console.log(containername, blobname);
    dispatch(getURLs({ Filedetails: { containerName: containername, blobName: blobname } }));
  };

  const showStatus = () => {
    if (status) {
      switch (status) {
        case 'Pending':
          return (
            <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Pending</div>
          );
        case 'Approved':
          return (
            <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Approved</div>
          );
        case 'Revision':
          return (
            <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Revision</div>
          );
        case 'Rejected':
          return (
            <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>
          );
        case 'Completed':
          return (
            <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] text-xs lg:text-sm inline-block">Complete</div>
          );
      }
    }
  };

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-9 w-[92%] p-5">
        <div className="float-left">
          <h1>{project_name}</h1>
        </div>
        <div className=" float-right">{showStatus()}</div>
      </div>
      <hr />
      <div className="w-[92%] bg-white mb-9">
        <form></form>
        <div className="lg:grid grid-cols-5 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-span-2 ">
            <p>
              <label className=" text-xs" htmlFor="">
                Client Name
              </label>
              <input
                className="input input-sm input-bordered w-full"
                type="text"
                id="client_name"
                value={client_name}
                disabled
                //onChange={(e) => setClient_name(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-2 ">
            <p>
              <label className=" text-xs" htmlFor="">
                Job ID
              </label>
              <input
                className="input input-sm input-bordered w-full"
                type="text"
                id="enquiryId"
                value={enquiryId}
                disabled
                //onChange={(e) => setContactNo(e.target.value)}
              />
            </p>
          </div>
          <div className={`col-span-1 ${sitemeasurements === null ? 'hidden' : ''}`}>
            <label className="cursor-pointer label text-xs flex items-center justify-center ">Site Measurements</label>
            <div className="flex items-center justify-center">
              <div className="flex ">
                <input
                  type="radio"
                  className="radio radio-xs mx-2"
                  id="sitemeasurements"
                  checked={sitemeasurements === true}
                  name="sitemeasurements"
                  value={true}
                  disabled
                />
                <p className=" text-sm">Yes</p>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="radio radio-xs mx-2"
                  id="sitemeasurements"
                  checked={sitemeasurements === false}
                  name="sitemeasurements"
                  value={false}
                  disabled
                />
                <p className=" text-sm">No</p>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <p>
              <label className=" text-xs" htmlFor="">
                Description
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                id="description"
                value={description}
                disabled
              ></textarea>
            </p>
          </div>
        </div>

        <div className=" p-5 shadow-lg m-2 lg:m-10">
          <p>Design Files</p>
          <div className="space-y-2">
            {/* {Array.from({ length: 3 }, (_, index) => ( */}
            {enquiryDesigns &&
              enquiryDesigns.length > 0 &&
              enquiryDesigns.map((design, index) => (
                <div key={design.id} className="collapse collapse-arrow rounded-none shadow-md ">
                  <input
                    className=" w-full"
                    type="radio"
                    name="my-accordion-2"
                    checked={index === activeIndex}
                    onChange={() => handleAccordionClick(index)}
                  />
                  <div className="collapse-title text-sm font-medium grid grid-cols-3  h-11">
                    <div className="col-span-1">Revision {design && design.vname ? design.vname : ''}</div>

                    <div className="col-span-1">
                      Last Updated {design && design.date ? format(new Date(design.date), 'dd MMMM yyyy') : ''}
                    </div>
                  </div>

                  <div className="collapse-content">
                    <hr />
                    {design &&
                      design.files &&
                      design.files.map((file, index) => (
                        <>
                          <div className="p-2">
                            <div key={index} className="grid grid-cols-6">
                              <p className="col-span-2">{file.itemname}</p>
                              <p className="col-span-2">{file.comment}</p>
                              <div className="col-span-1">
                                {file.outsourced ? (
                                  <p className="bg-[#C94E4E85] w-fit p-1 rounded text-xs ">Out Sourced</p>
                                ) : (
                                  ''
                                )}
                              </div>
                              <div className="col-span-1 flex items-center justify-center">
                                <button className="w-5" disabled={isButtonDisabled} onClick={() => downloadPdf(file.containername, file.blobname)}>
                                  <img src={downloadIcon} />
                                </button>
                              </div>
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
      </div>
    </div>
  );
}

export default ViewDesign;
