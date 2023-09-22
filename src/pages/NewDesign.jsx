import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEnquiryIDs, getEnquiryByID } from '../features/enquiries/enquirySlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

import 'react-day-picker/dist/style.css';
import designSchema from '../validationSchemas/designValidation';
import { createDesign, reset as designReset, getDesign } from '../features/designs/designSlice';
import { getURLs, reset as azureReset } from '../features/azure/azureSlice';

import uploadIcon from '../resources/upload.svg';
import plusIcon from '../resources/plus.svg';
import removeIcon from '../resources/remove.svg';
import redRemoveIcon from '../resources/red-remove.svg';
import downloadIcon from '../resources/save-file.svg';

function NewDesign() {
  const { isLoading, enquiryIDs, enquiry } = useSelector((state) => state.enquiry);

  const { enquiryDesigns, createDesignIsSuccess, createDesignIsError, getDesignIsSuccess, getDesignIsError } =
    useSelector((state) => state.design);

  const { urls } = useSelector((state) => state.azure);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [client_name, setClient_name] = useState('');
  const [IHT_Member, setIHT_Member] = useState('');
  const [sitemeasurements, setSitemeasurements] = useState(false);
  const [inquiry_no, setInquiry_no] = useState('');
  const [description, setDescription] = useState('');
  const [vname, setVname] = useState('');

  const [inputSets, setInputSets] = useState([
    { outsourced: false, itemname: '', comment: '', blobname: '', containername: '' },
  ]);
  const [files, setFiles] = useState([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddInputSet = () => {
    setInputSets([...inputSets, { outsourced: false, itemname: '', comment: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputSets = [...inputSets];
    updatedInputSets[index][field] = value;
    setInputSets(updatedInputSets);
  };

  const handleSave = () => {
    const finalFileJsonNames = inputSets.map((file) => {
      if (file.blobname) {
        return {
          outsourced: file.outsourced,
          itemname: file.itemname,
          comment: file.comment,
          containername: file.containername,
          blobname: file.blobname,
        };
      } else {
        return {
          outsourced: file.outsourced,
          itemname: file.itemname,
          comment: file.comment,
        };
      }
    });

    if (files.length < 1) {
      toast.error('Select design files to upload  ');
      return;
    }

    const fileData = {
      //date:Date,
      description,
      sitemeaurements: sitemeasurements,
      files: finalFileJsonNames,
      inquiry_no,
      vname,
    };

    const { error } = designSchema.validate(fileData);
    if (error) {
      toast.error(error.message);
      return;
    }
    dispatch(createDesign({ fileData, files }));

    //setInputSets([{ outsourced: false, itemname: '', comment: '' }]);
  };

  const handleRadioChange = (index, value) => {
    const updatedInputSets = [...inputSets];
    updatedInputSets[index].outsourced = value;
    setInputSets(updatedInputSets);
  };

  const handleFileUpload = (index, file) => {
    const updatedInputSets = [...inputSets];
    updatedInputSets[index].file = file;
    setInputSets(updatedInputSets);

    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedInputSets = [...inputSets];
    updatedInputSets[index].file = null;
    setInputSets(updatedInputSets);

    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);
  };
  const handleRemoveBlobname = (index) => {
    const updatedInputSets = [...inputSets];
    updatedInputSets[index].blobname = null;
    setInputSets(updatedInputSets);
  };

  const handleRemoveInputSet = (index) => {
    const updatedInputSets = inputSets.filter((_, i) => i !== index);
    setInputSets(updatedInputSets);
  };

  const handleSiteMeasurementsChange = (event) => {
    setSitemeasurements(event.target.value === 'true'); // Update the selected option when a radio button is clicked
  };

  useEffect(() => {
    if (createDesignIsError) {
      toast.error('Failed to create design');
    }

    if (createDesignIsSuccess) {
      toast.success('Design Created!');
      dispatch(designReset());
      setInputSets([{ outsourced: false, itemname: '', comment: '', blobname: '', containername: '' }])
      navigate('/designs');
    }

    dispatch(designReset());
  }, [createDesignIsSuccess, createDesignIsError]);

  useEffect(() => {
    dispatch(getEnquiryIDs());
  }, []);

  useEffect(() => {
    setClient_name(enquiry.client_name);
    setIHT_Member(enquiry.iht_member);
    if (enquiry && enquiry.index_no) {
      dispatch(getDesign(enquiry.index_no));
    }
  }, [enquiry]);

  useEffect(() => {
    if (
      enquiryDesigns &&
      enquiryDesigns.length > 0 &&
      enquiryDesigns[enquiryDesigns.length - 1].files &&
      enquiryDesigns[enquiryDesigns.length - 1].files.length
    ) {
      const designsToBeAdded = enquiryDesigns[enquiryDesigns.length - 1].files.map((file) => {
        return {
          outsourced: file.outsourced,
          itemname: file.itemname,
          comment: file.comment,
          containername: file.containername,
          blobname: file.blobname,
          fileInput: file.input,
        };
      });
      setInputSets(designsToBeAdded);
    }
  }, [enquiryDesigns]);

  useEffect(() => {
    if (urls) {
      setTimeout(() => {
        window.open(urls, '_blank');
      }, 3000);
    }
    dispatch(azureReset());
  }, [urls]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <Spinner />;
  }

  const onEnquiryIDSelect = (enquiryID) => {
    setInquiry_no(parseInt(enquiryID));
    dispatch(getEnquiryByID(enquiryID));
  };
  const downloadPdf = (containername, blobname) => {
    setIsButtonDisabled(true); // Disable the button
    setTimeout(() => {
      setIsButtonDisabled(false); // Re-enable the button after 3 seconds
    }, 3000); // 3000 milliseconds (3 seconds)

    console.log(containername, blobname);
    dispatch(getURLs({ Filedetails: { containerName: containername, blobName: blobname } }));
  };

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <h1 className="font-bold ">Designs</h1>
          <p className="text-xs">You are viewing every designs that made so far...</p>
        </div>
      </div>
      <hr />
      <div className="w-[92%] bg-white">
        <form onSubmit={onSubmit}></form>
        <div className="lg:grid grid-cols-6 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-span-6 font-medium">
            <p>Add a job</p>
          </div>
          <div className="col-span-3 ">
            <p className="">
              <label className=" text-xs">Client Name</label>
              <input
                className="input input-sm w-full px-2 outline-none text-gray-900 bg-[#F2F3F5] rounded font-bold"
                type="text"
                id="client_name"
                value={client_name}
                disabled
              />
            </p>
          </div>
          <div className="col-span-3">
            <label className="cursor-pointer label text-xs">Site Measurements</label>
            <div className="flex">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="radio radio-xs mx-2"
                  id="sitemeasurements"
                  checked={sitemeasurements === true}
                  onChange={handleSiteMeasurementsChange}
                  name="sitemeasurements"
                  value={true}
                />
                <p className=" text-sm">Yes</p>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="radio radio-xs mx-2"
                  id="sitemeasurements"
                  checked={sitemeasurements === false}
                  onChange={handleSiteMeasurementsChange}
                  name="sitemeasurements"
                  value={false}
                />
                <p className=" text-sm">No</p>
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <p>
              <label className=" text-xs">Job ID</label>
              <label className=" text-xs text-[#FF0000]">*</label>
              <select
                onChange={(e) => onEnquiryIDSelect(e.target.value)}
                value={enquiry.index_no}
                className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal text-xs"
              >
                <option disabled selected>
                  Select an enquiry ID
                </option>
                {enquiryIDs.length > 0
                  ? enquiryIDs.map((enquiryID) => (
                      <>
                        <option key={enquiryID.index_no}>{enquiryID.index_no}</option>
                      </>
                    ))
                  : null}
              </select>
            </p>
          </div>
          <div className="col-span-3 ">
            <p>
              <label className=" text-xs">IHT Client Service Number</label>
              <input
                className="input input-sm w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                type="text"
                id="IHT_Member"
                value={IHT_Member}
                onChange={(e) => setIHT_Member(e.target.value)}
                disabled
              />
            </p>
          </div>

          <div className="col-span-6">
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
          <div className="col-span-6">
            <p className="flex items-center">
              <label className=" text-xs">Design Files *</label>
              <input
                className="input input-sm  px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded w-2/3 mx-9"
                type="text"
                id="vname"
                value={vname}
                onChange={(e) => setVname(e.target.value)}
                placeholder="Version Name"
              />
              <button onClick={handleAddInputSet}>
                <img src={plusIcon} className=" max-w-none w-[24px]" alt="add input set" />
              </button>
            </p>
          </div>

          <div className="col-span-6 inline-block">
            <div className="float-right">
              <button className="btn btn-sm m-1 text-sm normal-case font-medium" onClick={() => navigate('/designs')}>
                Cancel
              </button>
              <button
                className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                onClick={handleSave}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="p-4">
            {inputSets.map((inputSet, index) => (
              <div key={index} className="flex space-x-4 items-end">
                <div>
                  {index === 0 ? (
                    <label className=" p-1" htmlFor="">
                      Item Name
                    </label>
                  ) : (
                    <></>
                  )}
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={inputSet.itemname}
                    onChange={(e) => handleInputChange(index, 'itemname', e.target.value)}
                    className="px-2 py-1 input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded "
                  />
                </div>

                <div>
                  {index === 0 ? (
                    <label className=" p-1" htmlFor="">
                      Comment
                    </label>
                  ) : (
                    <></>
                  )}
                  <input
                    type="text"
                    placeholder="Comment"
                    value={inputSet.comment}
                    onChange={(e) => handleInputChange(index, 'comment', e.target.value)}
                    className="px-2 py-1 input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded"
                  />
                </div>
                <div>
                  {index === 0 ? (
                    <label className=" p-1" htmlFor="">
                      Outsourced
                    </label>
                  ) : (
                    <></>
                  )}
                  <div className="flex h-8 items-center">
                    <input
                      type="radio"
                      value={true}
                      checked={inputSet.outsourced === true}
                      onChange={() => handleRadioChange(index, true)}
                      className="mr-1 radio radio-xs mx-2"
                    />
                    <label className="mr-2 text-xs">Yes</label>
                    <input
                      type="radio"
                      value={false}
                      checked={inputSet.outsourced === false}
                      onChange={() => handleRadioChange(index, false)}
                      className="radio radio-xs mx-2"
                    />
                    <label className="text-xs">No</label>
                  </div>
                </div>
                {inputSet.blobname ? (
                  <div className="flex items-center py-1 px-2 m-[2px] ">
                    <button
                      className="flex w-[130px]"
                      disabled={isButtonDisabled}
                      onClick={() => downloadPdf(inputSet.containername, inputSet.blobname)}
                    >
                     design_{index+1}.pdf <img className=' w-5 mx-1' src={downloadIcon} />
                    </button>
                    <button onClick={() => handleRemoveBlobname(index)}>
                      <img src={removeIcon} className=" max-w-none w-[24px]" alt="Remove image Button" />
                    </button>
                  </div>
                ) : (
                  <>
                    {inputSet.file ? (
                      <div className="flex items-center py-1 px-2 m-[2px]">
                        <p className="mr-2">{inputSet.file.name}</p>
                        <button onClick={() => handleRemoveFile(index)}>
                          <img src={removeIcon} className=" max-w-none w-[24px]" alt="Remove image Button" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(index, e.target.files[0])}
                          className="hidden"
                          ref={(fileInput) => (inputSet.fileInput = fileInput)}
                        />
                        <button onClick={() => inputSet.fileInput.click()}>
                          <img src={uploadIcon} className=" max-w-none w-[24px]" alt="Upload Button" />
                        </button>
                      </div>
                    )}
                  </>
                )}
                <button onClick={() => handleRemoveInputSet(index)} className="py-1 px-2 m-[2px] ">
                  <img src={redRemoveIcon} className=" max-w-none w-[24px]" alt="x" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[320px]"></div>
    </div>
  );
}

export default NewDesign;
