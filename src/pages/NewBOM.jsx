import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { bomMainSchema, materialSchema } from '../validationSchemas/bomSchema';

import { getQuotation, getQuotations, reset as quotationReset } from '../features/quotations/quotationSlice';

import { createBOM, reset as bomReset } from '../features/boms/BOMSlice';

import arrowUpIcon from '../resources/arrow-up.svg';
import arrowDownIcon from '../resources/arrow-down.svg';
import { getJob, getJobIDs } from '../features/jobs/jobSlice';
import { preBomMainSchema } from '../validationSchemas/bomSchema';

function NewQuotation() {
  const { user } = useSelector((state) => state.auth);

  const {
    isLoading,
    isError,
    isSuccess,
    createQuotationIsSuccess,
    createQuotationIsError,
    message,
    quotation,
    quotations,
  } = useSelector((state) => state.quotation);

  const {
    isLoading: enquiryIsLoading,
    isError: enquiryIsError,
    isSuccess: enquiryIsSuccess,
    message: enquiryIsmessage,
    enquiryIDs,
    enquiry,
  } = useSelector((state) => state.enquiry);

  const {
    job,
    jobs,
    jobIDs,
    isLoading: jobIsLoading,
    isSuccess: jobIsSuccess,
    jobCount,
    jobCountRevision,
    jobCountProduction,
    deleteJobIsSuccess,
    deleteJobIsError,
    message: jobMessage,
  } = useSelector((state) => state.job);

  const {
    createBOMIsError,
    createBOMIsSuccess,
    isLoading: bomIsLoading,
    isSuccess: bomIsSuccess,
    message: bomMessage,
  } = useSelector((state) => state.BOM);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [client_name, setClient_name] = useState('');
  const [inquiry_number, setInquiry_number] = useState('');

  const [job_no, setJob_no] = useState(0);
  const [description, setDescription] = useState('');

  const [location, setLocation] = useState('create quotation');
  const [itemIndex, setItemIndex] = useState(0);

  const [itemInputSets, setItemInputSets] = useState([
    {
      created_date: new Date().toISOString(),
      site_measurements: false,
      item_code: '',
      itemname: '',
      description: '',
      qty: 0,
      rate: 0,
      comments: '',
      amount: 0,
      label: '',
    },
  ]);

  const itemsSet = [
    {
      index_no: 1,
      category: 'Timber',
      Description: 'Local Teak 1”',
      last_purchased_price: 1250.0,
      purchased_store: '',
      unit: 'Sq.Ft',
      threshold: 10,
      availability: 20,
    },
    {
      index_no: 2,
      category: 'Timber',
      Description: 'Local Teak 1 1/8”',
      last_purchased_price: 1250.0,
      purchased_store: '',
      unit: 'Sq.Ft',
      threshold: 10,
      availability: 20,
    },
    {
      index_no: 3,
      category: 'Boards',
      Description: 'MDF 8 x 4 -9 mm',
      last_purchased_price: 5700.0,
      purchased_store: '',
      unit: 'Sheet',
      threshold: 10,
      availability: 20,
    },
  ];

  const [collapsedCategories, setCollapsedCategories] = useState([]);

  const toggleCategoryCollapse = (category) => {
    if (collapsedCategories.includes(category)) {
      setCollapsedCategories(collapsedCategories.filter((c) => c !== category));
    } else {
      setCollapsedCategories([...collapsedCategories, category]);
    }
  };

  const [items, setItems] = useState([]);

  const [categoryTotal, setCategoryTotal] = useState([]);

  const [total, setTotal] = useState([]);

  const [materialTotal, setMaterialTotal] = useState([]);

  useEffect(() => {}, []);

  const handleItemInputChange = (index, field, value) => {
    const updatedInputSets = [...itemInputSets];
    updatedInputSets[index][field] = value;
    if (field === 'qty') {
      updatedInputSets[index]['amount'] = value * updatedInputSets[index]['rate'];
    }
    setItemInputSets(updatedInputSets);
  };

  const handleItemValueChange = (itemIndex, index, field, value) => {
    let updatedItems = [...items]; // Copy the items array

    if (updatedItems[itemIndex]) {
      if (!updatedItems[itemIndex][index]) {
        updatedItems[itemIndex][index] = {}; // Initialize the inner array if it doesn't exist
      }
      updatedItems[itemIndex][index][field] = value; // Update the value at the specified indices

      if (field === 'last_purchased_price' || field === 'material_qty' || field === 'total_material_cost') {
        updatedItems[itemIndex][index]['total_material_cost'] =
          parseFloat(updatedItems[itemIndex][index]['last_purchased_price']) *
          parseFloat(updatedItems[itemIndex][index]['material_qty']);
      }
      setItems(updatedItems);
    }

    if (field === 'last_purchased_price' || field === 'material_qty' || field === 'total_material_cost') {
      let categoryTotalCopy = [...categoryTotal];

      let catToChange = updatedItems[itemIndex][index]['category'];

      if (!categoryTotalCopy[itemIndex]) {
        categoryTotalCopy[itemIndex] = {};
      }

      categoryTotalCopy[itemIndex][catToChange] = 0;

      updatedItems[itemIndex].map((item) => {
        if (item.category === catToChange) {
          categoryTotalCopy[itemIndex][catToChange] =
            parseFloat(categoryTotalCopy[itemIndex][catToChange] || 0) + parseFloat(item['total_material_cost'] || 0);
        }
        return item;
      });

      setCategoryTotal(categoryTotalCopy);

      let totalSum = 0;

      for (const value of Object.values(categoryTotalCopy[itemIndex])) {
        totalSum += parseFloat(value);
      }

      const totalCopy = [...total];
      totalCopy[itemIndex] = totalSum;
      setTotal(totalCopy);

      const itemInputSetscopy = [...itemInputSets];
      itemInputSetscopy[itemIndex]['rate'] = totalSum;

      if (itemInputSets[itemIndex]['qty'] && itemInputSets[itemIndex]['qty'] > 0) {
        itemInputSetscopy[itemIndex]['amount'] = itemInputSetscopy[itemIndex]['rate'] * itemInputSets[itemIndex]['qty'];
      }

      setItemInputSets(itemInputSetscopy);
    }
    updateMaterialCost(itemIndex);
  };

  const goToComponents = (index) => {
    setLocation('component');
    setItemIndex(index);

    if (items[index]) return;

    let updatedItems = [...items];

    updatedItems[index] = itemsSet;

    setItems(updatedItems);
  };

  const handleSave = () => {
    let newItemsArray = [];

    items.map((subArray, index) =>
      subArray.map(
        (item) =>
          (newItemsArray = [
            ...newItemsArray,
            {
              category: item.category,
              unit: item.unit,
              name: item.Description,
              rate: item.last_purchased_price,
              material_qty: item.material_qty,
              total_material_cost: item.total_material_cost,
              remarks: item.remarks,
              item_id: item.material_id, //todo
              //in_store: item.in_store || true,
            },
          ])
      )
    );

    newItemsArray.map((item) => {
      const { error } = materialSchema.validate(item);
      if (error) {
        toast.error(error.message);
        return null;
      }
      return item;
    });

    const finalBomObj = {
      job_no,
      //Index_no,
      created_date: new Date().toISOString(),
      items: newItemsArray,
      status: 'Pending',
      description: description || '',
    };

    //validate bom validate redundant
    const { error } = bomMainSchema.validate(finalBomObj); // Corrected variable name and input data
    if (error) {
      toast.error(error.message);
      return null;
    }

    dispatch(createBOM(finalBomObj));
  };

  useEffect(() => {
    if (createBOMIsSuccess) {
      toast.success('BOM entry Added!');
      dispatch(bomReset());
      navigate('/boms');
    }
  }, [isError, dispatch, isSuccess, navigate, message, createBOMIsSuccess, createBOMIsError]);

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(getJobIDs());
  }, []);

  useEffect(() => {
    if (job.client_name) {
      setClient_name(job.client_name);
    }
    if (job.inquiry_number) {
      setInquiry_number(job.inquiry_number);
    }
  }, [job]);

  const onNext = () => {
    const preBOMObj = {
      job_no: job_no,
      description: description,
    };
    const { error } = preBomMainSchema.validate(preBOMObj);

    if (error) {
      toast.error(error.message);
    } else {
      if (inquiry_number) {
        dispatch(
          getQuotations({
            stateFilter: 'any',
            daysCount: -1,
          })
        );
      }
      setLocation('items');
    }
  };

  useEffect(() => {
    if (quotations.length > 0) {
      let quotationId = quotations
        .map((quotation) => {
          if (quotation.inquiry_id === inquiry_number) {
            return quotation.index_no;
          }
        })
        .filter((value) => value !== undefined);

      if (quotationId.length > 0) {
        dispatch(getQuotation(quotationId[quotationId.length - 1]));
        //:todo allow only one quotation per inquiry?
      }
    }
  }, [quotations]);

  useEffect(() => {
    if (quotation && quotation.length > 0) {
      let quotationInputItemSet = [];

      quotation.map((quotation, index) => {
        quotationInputItemSet[index] = {
          created_date: quotation.created_date,
          site_measurements: quotation.site_measurements,
          item_code: quotation.item_code,
          itemname: quotation.itemname,
          description: quotation.description,
          qty: quotation.qty,
          rate: quotation.rate,
          comments: quotation.comments,
          amount: quotation.amount,
          label: quotation.label,
        };

        //quotation
      });
      setItemInputSets(quotationInputItemSet);

      let quotationItemsSet = [[{}]];

      quotation.map((quotation, index) => {
        if (quotation.materials && quotation.materials.length > 0) {
          quotation.materials.map((material, i) => {
            if (!Array.isArray(quotationItemsSet[index])) {
              quotationItemsSet[index] = [];
            }
            quotationItemsSet[index][i] = {
              category: material.category,
              last_purchased_price: material.rate, //:todo
              unit: material.unit,
              material_qty: material.material_qty,
              total_material_cost: material.total_material_cost,
              remarks: material.remarks,
              Description: material.name,
            };
          });
        }
      });

      setItems(quotationItemsSet);

      quotationItemsSet.forEach((innerArray, itemIndex) => {

        const newCategoryTotal = {};
        let newTotal = 0;
        let newMaterialTotal = 0;

        innerArray.forEach((item, index) => {
          // Add total_material_cost to the corresponding categoryTotal
          if (item.category in newCategoryTotal) {
            newCategoryTotal[item.category] += item.total_material_cost;
          } else {
            newCategoryTotal[item.category] = item.total_material_cost;
          }
    
          // Add total_material_cost to the total
          newTotal += item.total_material_cost;
    
          // Exclude Labor category from materialTotal
          if (item.category !== 'Labor') {
            newMaterialTotal += item.total_material_cost;
          }
        }); 

         // Update the state variables with the correct itemIndex
        setCategoryTotal((prevCategoryTotal) => {
          const categoryTotalCopy = [...prevCategoryTotal];
          categoryTotalCopy[itemIndex] = newCategoryTotal;
          return categoryTotalCopy;
        });

        setTotal((prevTotal) => {
          const totalCopy = [...prevTotal];
          totalCopy[itemIndex] = newTotal;
          return totalCopy;
        });

        setMaterialTotal((prevMaterialTotal) => {
          const materialTotalCopy = [...prevMaterialTotal];
          materialTotalCopy[itemIndex] = newMaterialTotal;
          return materialTotalCopy;
        });
      });

    }
  }, [quotation]);

  const onJobNoSelect = (job_no) => {
    if (job_no) {
      setJob_no(parseInt(job_no));
      dispatch(getJob(job_no));
    }
  };

  let lastRenderedCategory = null;

  const updateMaterialCost = (itemIndex) => {
    let sum = 0;
    let items = categoryTotal[itemIndex];
    for (const key in items) {
      if (key !== 'Labor') {
        sum += items[key];
      }
    }
    let materialTotalCopy = [...materialTotal];
    materialTotalCopy[itemIndex] = sum;
    setMaterialTotal(materialTotalCopy);
  };

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <div className="text-sm breadcrumbs">
            <ul>
              {location && location === 'create quotation' ? (
                <li>
                  <a>Create BOM</a>
                </li>
              ) : (
                <></>
              )}
              {location && location === 'items' ? (
                <>
                  <li>
                    <a onClick={() => setLocation('create quotation')}>Create BOM</a>
                  </li>
                  <li>
                    <a>Items</a>
                  </li>
                </>
              ) : (
                <></>
              )}
              {location && location === 'component' ? (
                <>
                  <li>
                    <a onClick={() => setLocation('create quotation')}>Create BOM</a>
                  </li>
                  <li>
                    <a onClick={() => setLocation('items')}>Items</a>
                  </li>
                  <li>
                    <a>Components</a>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <h1 className="font-bold text-2xl">BOMs</h1>
        </div>
      </div>
      <hr />

      <div className="w-[92%] bg-white">
        {location === 'create quotation' ? (
          <div className="lg:grid grid-cols-2 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
            <div className="col-span-2 font-medium">
              <p>Add an inquiry</p>
            </div>
            <div className="col-span-1 ">
              <p>
                <label className=" text-xs" htmlFor="">
                  Client Name
                </label>
                <input
                  className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                  type="text"
                  id="client_name"
                  value={client_name}
                  disabled
                />
              </p>
            </div>
            <div className="col-span-1 ">
              <p>
                <label className=" text-xs" htmlFor="">
                  Job ID
                </label>
                <label className=" text-xs text-[#FF0000]" htmlFor="">
                  *
                </label>
                <select
                  onChange={(e) => onJobNoSelect(e.target.value)}
                  value={job_no}
                  className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal text-xs"
                >
                  <option value="" aria-readonly>
                    Select a Job No
                  </option>
                  {jobIDs.length > 0
                    ? jobIDs.map((job_no, index) => (
                        <>
                          <option key={index} value={job_no.job_no}>{job_no.main_job_id.slice(38)}</option>
                        </>
                      ))
                    : ''}
                </select>
              </p>
            </div>
            <div className="col-span-2">
              <p>
                <label className=" text-xs" htmlFor="">
                  Description
                </label>
                <textarea
                  className="textarea  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                  placeholder="Description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </p>
            </div>
            <div className="col-span-2 inline-block">
              <div className="float-right">
                <button
                  className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                  onClick={onNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {location === 'items' ? (
          <>
            <div className="lg:grid grid-cols-16 gap-1 bg-white p-5 pt-2 shadow-lg m-2 mt-2 lg:m-10 lg:mt-2">
              <div className=" col-span-16 flex justify-between pb-2">
                <h1 className=" text-xl font-semibold">Items</h1>
              </div>

              <div className=" col-start-1 col-span-1 text-sm flex items-center">No</div>
              <div className=" col-span-2 text-sm flex justify-center">Item Code *</div>
              <div className=" col-span-2 text-sm flex justify-center">Item name</div>
              <div className=" col-span-2 text-sm flex justify-center">Item label</div>
              <div className=" col-span-2 text-sm flex justify-center">Description *</div>
              <div className=" col-span-2 text-sm flex justify-center">Qty *</div>
              <div className=" col-span-2 text-sm flex justify-center">Rate(LKR) *</div>
              <div className=" col-span-2 text-sm flex justify-center">Amount *</div>
              <div className=" col-span-1 text-sm"></div>

              {itemInputSets.map((inputSet, index) => (
                <div
                  //key={inputSet.item_code}
                  key={index}
                  className=" col-span-16 lg:grid grid-cols-16 gap-1 bg-white "
                >
                  <div className=" col-span-1"></div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Item Code"
                      value={inputSet.item_code}
                      disabled
                      className="input input-sm outline-none text-gray-600 disabled:text-black bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={inputSet.itemname}
                      disabled
                      className=" input input-sm outline-none text-gray-600 disabled:text-black bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={inputSet.label}
                      disabled
                      className=" input input-sm outline-none text-gray-600 disabled:text-black bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={inputSet.description}
                      disabled
                      className=" input input-sm outline-none text-gray-600 disabled:text-black bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={inputSet.qty}
                      onChange={(e) => handleItemInputChange(index, 'qty', e.target.value)}
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Rate"
                      value={inputSet.rate}
                      onChange={(e) => handleItemInputChange(index, 'rate', e.target.value)}
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Amount"
                      value={inputSet.amount}
                      onChange={(e) => handleItemInputChange(index, 'amount', e.target.value)}
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-1">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className=" m-1 text-3xl">
                        ...
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
                        <li>
                          <div onClick={() => goToComponents(index)}>component</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex w-full justify-end px-12">
              <div className="">
                <button className="btn btn-sm m-1 text-sm normal-case font-medium" onClick={() => navigate('/boms')}>
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
          </>
        ) : (
          <></>
        )}

        {location === 'component' ? (
          <>
            <div className="lg:grid grid-cols-10 gap-1 bg-white p-5 pt-2 shadow-lg m-2 mt-2 lg:m-10 lg:mt-2">
              <div className=" col-span-10 flex justify-between pb-2">
                <h1 className=" text-xl font-semibold">Items</h1>
              </div>

              <div className=" col-start-1 col-span-1 text-sm flex items-center"></div>
              <div className=" col-span-2 text-sm flex justify-center">Description</div>
              <div className=" col-span-1 text-sm flex justify-center">Unit</div>
              <div className=" col-span-1 text-sm flex justify-center">Rate(Rs)</div>
              <div className=" col-span-1 text-sm flex justify-center">Qty per Unit</div>
              <div className=" col-span-1 text-sm flex justify-center">Cost per Unit</div>
              <div className=" col-span-1 text-sm flex justify-center">Total Material Qty</div>
              <div className=" col-span-1 text-sm flex justify-center">Total Material Cost</div>
              <div className=" col-span-1 text-sm flex justify-center">Remarks</div>

              {items &&
                items[itemIndex] &&
                items[itemIndex].map((item, index) => {
                  let shouldRenderCategory = item.category !== lastRenderedCategory;

                  if (shouldRenderCategory) {
                    lastRenderedCategory = item.category;
                  }

                  let isCategoryCollapsed = collapsedCategories.includes(item.category);

                  return (
                    <div key={index} className=" col-span-10 lg:grid grid-cols-10 gap-1 bg-white ">
                      {shouldRenderCategory && (
                        <>
                        {item.category === 'Labor' ?  <div className="col-span-10 bg-[#BDE3FF] py-2 px-5 flex justify-between">
                        <p>Total Material Cost</p>
                        <p>{materialTotal[itemIndex]}</p>
                      </div> : ''}
                        <div
                          className="col-span-10 bg-[#D9D9D9] py-2 px-5 flex justify-between"
                          onClick={() => toggleCategoryCollapse(item.category)}
                          style={{ cursor: 'pointer' }}
                        >
                          <p>{item.category}</p>
                          <img className={`${isCategoryCollapsed ? 'V' : 'hidden'} w-5`} src={arrowDownIcon} />
                          <img className={`${!isCategoryCollapsed ? 'V' : 'hidden'} w-5`} src={arrowUpIcon} />
                        </div>
                        </>
                      )}

                      {shouldRenderCategory && !isCategoryCollapsed && item.category !== 'Labor'  && (
                        <div className="col-span-10 bg-[#BDE3FF] py-2 px-5 flex ">
                          <p> Sub Total</p>
                          <p className=" px-5">
                            {categoryTotal[itemIndex] &&
                              categoryTotal[itemIndex][item.category] &&
                              categoryTotal[itemIndex][item.category]}
                          </p>
                        </div>
                      )}

                      {!isCategoryCollapsed && (
                        <>
                          <div className="col-span-1 flex justify-center items-center"></div>
                          <div className=" col-span-2 flex  items-center">
                            <p className=""> {item.Description}</p>
                          </div>
                          <div className=" col-span-1 flex justify-center items-center">
                            <p className=""> {item.unit}</p>
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Rate"
                              value={item.last_purchased_price}
                              onChange={(e) =>
                                handleItemValueChange(itemIndex, index, 'last_purchased_price', e.target.value)
                              }
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          {item.category !== 'Labor' ? (
                            <>
                              <div className=" col-span-1">
                                <input
                                  type="text"
                                  placeholder="Qty per unit"
                                  value={item.qtyPerUnit}
                                  onChange={(e) =>
                                    handleItemValueChange(itemIndex, index, 'qtyPerUnit', e.target.value)
                                  }
                                  className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                                />
                              </div>
                              <div className=" col-span-1">
                                <input
                                  type="number"
                                  placeholder="cost per unit"
                                  value={item.costPerUnit}
                                  onChange={(e) =>
                                    handleItemValueChange(itemIndex, index, 'costPerUnit', e.target.value)
                                  }
                                  className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                                />
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                          <div className=" col-span-1 col-start-8">
                            <input
                              type="text"
                              placeholder="Total material qty"
                              value={item.material_qty}
                              onChange={(e) => handleItemValueChange(itemIndex, index, 'material_qty', e.target.value)}
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Amount"
                              value={item.total_material_cost}
                              disabled
                              className=" input input-sm outline-none text-gray-600 disabled:text-black disabled:bg-[#F2F3F5  ] bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Remarks"
                              value={item.remarks}
                              onChange={(e) => handleItemValueChange(itemIndex, index, 'remarks', e.target.value)}
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

              <div className="col-span-10 bg-[#BDE3FF] py-2 px-5 flex justify-between">
                <p>Total Labor Cost</p>
                <p>
                  {categoryTotal[itemIndex] && categoryTotal[itemIndex]['Labor'] && categoryTotal[itemIndex]['Labor']}
                </p>
              </div>
              <div className="col-span-10 bg-[#C94E4E4F] py-2 px-5 flex justify-between">
                <p>Total Cost</p>
                <p>{total[itemIndex] && total[itemIndex]}</p>
              </div>
            </div>

            <div className=" flex w-full justify-end px-12">
              <div className="">
                <button className="btn btn-sm m-1 text-sm normal-case font-medium" onClick={() => navigate('/boms')}>
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
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default NewQuotation;
