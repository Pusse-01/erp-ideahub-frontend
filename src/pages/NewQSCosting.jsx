import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

import { getQuotations, getQuotation } from "../features/quotations/quotationSlice";
import { createQSCosting, reset as qsCostingReset } from "../features/qscosting/QSCostingSlice";
import { downloadQSCosting, reset as pdfReset } from '../features/pdf/pdfSlice';

import arrowUpIcon from '../resources/arrow-up.svg';
import arrowDownIcon from '../resources/arrow-down.svg';

function NewQSCosting() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [location, setLocation] = useState('create costing');

  const { quotationIndexNo } = useParams();

  const {
    quotations,
    quotation,
    isLoading,
    isSuccess,
    isError,
    quotationCount,
    quotationCountRevision,
    quotationCountAll,
    deleteQuotationIsSuccess,
    deleteQuotationIsError,
    message,
  } = useSelector((state) => state.quotation);

  useEffect(() => {
    if(quotationIndexNo) {
      dispatch(getQuotation(quotationIndexNo));
    }
  }, [quotationIndexNo]);

  const [job_no, setJob_no] = useState();
  const [client_name, setClient_name] = useState('');
  const [IHT_Member, setIHT_Member] = useState('');
  const [sitemeasurements, setSitemeasurements] = useState(false);
  const [brief, setBrief] = useState('');

  useEffect(() => {
    console.log(quotation);
    if (quotation.length >= 0) {
      setJob_no(quotation[0].inquiry_id);
      setClient_name(quotation[0].client_name);
      setIHT_Member(quotation[0].iht);
      setSitemeasurements(quotation[0].site_measurements);
      setBrief(quotation[0].brief);
    }
  }, [quotation]);

  const onNextProject = () => {
    if (job_no) {
      setLocation('items');
    } else {
      toast.error("Job No Missing");
    }
  };
  
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

  const [items, setItems] = useState([]);

  const [categoryTotal, setCategoryTotal] = useState([]);
  const [total, setTotal] = useState([]);
  const [materialTotal, setMaterialTotal] = useState([]);

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

  const handleItemInputChange = (index, field, value) => {
    const updatedInputSets = [...itemInputSets];
    updatedInputSets[index][field] = value;
    if (field === 'qty') {
      updatedInputSets[index]['amount'] = value * updatedInputSets[index]['rate'];
    }
    setItemInputSets(updatedInputSets);
  };

  const {
    QSCostings,
    createQSCostingIsError,
    createQSCostingIsSuccess,
    message: qsCostingMessage,
  } = useSelector((state) => state.qscosting);

  const [itemIndex, setItemIndex] = useState(0);

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

  const goToComponents = (index) => {
    setLocation('component');
    setItemIndex(index);

    if (items[index]) return;

    let updatedItems = [...items];

    updatedItems[index] = itemsSet;

    setItems(updatedItems);
  };

  const [qsCosting, setQSCosting] = useState({
    totalItemCost: 0,
    subcontractingCost: 0,
    indirectCost: 0,
    profitMargin: 0,
    vatOrTaxes: 0,
    totalJobCost: 0,
  });

  const onNextItems = () => {
      let newTotalItemCost = 0;
      total.forEach((value) => {
        newTotalItemCost += value;
      });
      let updatedQSCosting = {
        ...qsCosting,
        totalItemCost: newTotalItemCost
      };

      const newTotalJobCost = updatedQSCosting.totalItemCost + updatedQSCosting.indirectCost + updatedQSCosting.vatOrTaxes + updatedQSCosting.subcontractingCost + updatedQSCosting.profitMargin;
      updatedQSCosting['totalJobCost'] = newTotalJobCost;

      setQSCosting(updatedQSCosting);
      setLocation('qs costing');
  };

  let lastRenderedCategory = null;

  const [collapsedCategories, setCollapsedCategories] = useState([]);

  const toggleCategoryCollapse = (category) => {
    if (collapsedCategories.includes(category)) {
      setCollapsedCategories(collapsedCategories.filter((c) => c !== category));
    } else {
      setCollapsedCategories([...collapsedCategories, category]);
    }
  };

  const onBackToItems = () => {
      setLocation('items');
  }

  const handleQSCostingChange = (field, value) => {
    let updatedQSCosting = {
      ...qsCosting,
    };
    updatedQSCosting[field] = parseInt(value);
    
    const newTotalJobCost = updatedQSCosting.totalItemCost + updatedQSCosting.indirectCost + updatedQSCosting.vatOrTaxes + updatedQSCosting.subcontractingCost + updatedQSCosting.profitMargin;
    updatedQSCosting['totalJobCost'] = newTotalJobCost;
    
    setQSCosting(updatedQSCosting);
  };

  const { downloadPDFIsError, downloadPDFIsSuccess, message: pdfMessage } = useSelector((state) => state.pdf);

  const handleSave = () => {
    const finalQSCosting = {
      Inquiry_id: job_no,
      total_item_cost: qsCosting.totalItemCost,
      subcontracting_costs: qsCosting.subcontractingCost,
      indirect_costs: qsCosting.indirectCost,
      profit_margin: qsCosting.profitMargin,
      tax: qsCosting.vatOrTaxes,
      total_job_cost: qsCosting.totalJobCost,
    };

    dispatch(createQSCosting(finalQSCosting));
  };

  useEffect(() => {
    if(createQSCostingIsSuccess) {
      toast.success('QS Costing entry Added');

      // dispatch(
      //   downloadQSCosting({
      //     Inquiry_id: job_no,
      //     index_no: quotation.index_no,
      //   })
      // );

      dispatch(qsCostingReset());
    } else if (createQSCostingIsError) {
      toast.error('QS Costing Creating Error');
      console.log(qsCostingMessage);
    }
  }, [dispatch, navigate, createQSCostingIsSuccess, createQSCostingIsError, qsCostingMessage]);

  const handleDownload = () => {
    if(true) {
      console.log({
        Inquiry_id: job_no,
        index_no: quotationIndexNo,
      });
      dispatch(downloadQSCosting({
        Inquiry_id: job_no,
        index_no: quotationIndexNo,
      }));

    } else {
      toast.error("No QS Costing")
    }
  };

  useEffect(() => {
    dispatch(pdfReset());

    if (downloadPDFIsError) {
      toast.error('PDF Download Error');
    }

    if (downloadPDFIsSuccess) {
      toast.success('PDF Download Success');
      navigate('/quotations');
    }
  }, [downloadPDFIsError, downloadPDFIsSuccess]);

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <div className=" float-left">
            <div className="text-sm breadcrumbs">
              <ul>
                {location && location === 'create costing' ? (
                  <li>
                    <a>Project</a>
                  </li>
                ) : (
                  <></>
                )}
                {location && location === 'items' ? (
                  <>
                    <li>
                      <a onClick={() => setLocation('create costing')}>Project</a>
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
                      <a onClick={() => setLocation('create costing')}>Project</a>
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
                {location && location === 'qs costing' ? (
                  <>
                    <li>
                      <a onClick={() => setLocation('create costing')}>Project</a>
                    </li>
                    <li>
                      <a onClick={() => setLocation('items')}>Items</a>
                    </li>
                    <li>
                      <a>QS Costing</a>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>

            <h1 className="font-bold text-2xl">QS Costing</h1>
            <p className="text-xs">You are viewing every Quotations that made so far...</p>
          </div>
        </div>

        <hr />

        <div className="w-[92%] bg-white">
          {location === 'create costing' ? (
            <div className="lg:grid grid-cols-2 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
              <div className="col-span-2 font-medium">
                <p>Create Costing</p>
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
                    placeholder="Client name"
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
                  {/* <label className=" text-xs text-[#FF0000]" htmlFor="">
                    *
                  </label> */}
                  {/* <select
                    value={job_no}
                    className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal text-xs"
                    disabled
                  >
                    <option value="" aria-readonly>
                      Select a Job No
                    </option>
                    {jobIDs.length > 0
                      ? jobIDs.map((job_no, index) => (
                          <>
                            <option key={index}>{job_no.job_no}</option>
                          </>
                        ))
                      : ''}
                  </select> */}                  
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    id="Inquiry_id"
                    placeholder="Job No"
                    value={job_no}
                    disabled
                  />
                </p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    IHT Client Service Number
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="text"
                    id="IHT_Member"
                    placeholder="IHT Client Service Number"
                    value={IHT_Member}
                    disabled
                  />
                </p>
              </div>

              <div className="col-span-1">
                <label className="cursor-pointer label text-xs">Site Measurements</label>
                <div className="flex">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="radio radio-xs mx-2"
                      id="sitemeasurements"
                      name="sitemeasurements"
                      value={sitemeasurements === true}
                      disabled
                    />
                    <p className=" text-sm">Yes</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="radio radio-xs mx-2"
                      id="sitemeasurements"
                      name="sitemeasurements"
                      value={sitemeasurements === false}
                      disabled
                    />
                    <p className="text-sm">No</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <p>
                  <label className=" text-xs" htmlFor="">
                    Brief
                  </label>
                  <textarea
                    className="textarea  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    placeholder="Brief"
                    id="Brief"
                    value={brief}
                    disabled
                  ></textarea>
                </p>
              </div>

              <div className="col-span-2 inline-block">
                <div className="float-right">
                  <button
                    className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                    onClick={onNextProject}
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
                  
                  <div key={index} className=" col-span-16 lg:grid grid-cols-16 gap-1 bg-white ">
                    <div className=" col-span-1"></div>
                    <div className=" col-span-2">
                      <input
                        type="text"
                        placeholder="Item Code"
                        value={inputSet.item_code}
                        // onChange={(e) => handleItemInputChange(index, 'item_code', e.target.value)}
                        className="input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-2">
                      <input
                        type="text"
                        placeholder="Item Name"
                        value={inputSet.itemname}
                        // onChange={(e) => handleItemInputChange(index, 'itemname', e.target.value)}
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-2">
                      <input
                        type="text"
                        placeholder="Label"
                        value={inputSet.label}
                        // onChange={(e) => handleItemInputChange(index, 'label', e.target.value)}
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-2">
                      <input
                        type="text"
                        placeholder="Description"
                        value={inputSet.description}
                        // onChange={(e) => handleItemInputChange(index, 'description', e.target.value)}
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
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
                        // readOnly
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-2">
                      <input
                        type="text"
                        placeholder="Amount"
                        value={inputSet.amount}
                        // onChange={(e) => handleItemInputChange(index, 'amount', e.target.value)}
                        readOnly
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-1">
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className=" m-1 text-3xl">
                          ...
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
                          {/* <li>
                            <button onClick={() => handleRemoveInputSet(index)} className=" ">
                              Remove item
                            </button>
                          </li> */}
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
                  <button className="btn btn-sm m-1 text-sm normal-case font-medium">Cancel</button>
                  <button
                    className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                    onClick={onNextItems}
                  >
                    Next
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
                                    className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                                  />
                                </div>
                                <div className=" col-span-1">
                                  <input
                                    type="number"
                                    placeholder="cost per unit"
                                    value={item.costPerUnit}
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
                  <button
                    className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                    onClick={onBackToItems}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {location === 'qs costing' ? (
            <div className="lg:grid grid-cols-2 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
              <div className="col-span-2 font-medium">
                <p>Create Costing</p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    Total Item Cost
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="number"
                    id="totalItemCost"
                    value={qsCosting.totalItemCost}
                    // onChange={(e) => handleQSCostingChange('totalItemCost', e.target.value)}
                    disabled
                  />
                </p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    Subcontracting cost
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="number"
                    id="subcontractingCost"
                    value={qsCosting.subcontractingCost}
                    onChange={(e) => handleQSCostingChange('subcontractingCost', e.target.value)}
                  />
                </p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    Indirect Costs
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="number"
                    id="indirectCost"
                    value={qsCosting.indirectCost}
                    onChange={(e) => handleQSCostingChange('indirectCost', e.target.value)}
                  />
                </p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    Profit Margin
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="number"
                    id="profitMargin"
                    value={qsCosting.profitMargin}
                    onChange={(e) => handleQSCostingChange('profitMargin', e.target.value)}
                  />
                </p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    VAT/ Taxes
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="number"
                    id="vatOrTaxes"
                    value={qsCosting.vatOrTaxes}
                    onChange={(e) => handleQSCostingChange('vatOrTaxes', e.target.value)}
                  />
                </p>
              </div>

              <div className="col-span-1 ">
                <p>
                  <label className=" text-xs" htmlFor="">
                    Total Job Cost
                  </label>
                  <input
                    className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                    type="number"
                    id="totalJobCost"
                    value={qsCosting.totalJobCost}
                    // onChange={(e) => handleQSCostingChange('totalJobCost', e.target.value)}
                    readOnly
                  />
                </p>
              </div>

              <div className="col-span-2 inline-block">
                <div className="float-right">
                  <button
                    className="btn btn-sm m-1 text-sm normal-case font-medium"
                    onClick={handleSave}
                  >
                    Submit
                  </button>
                  <button
                    
                    className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <></>
          )}

        </div>

      </div>
    </>
  );
}

export default NewQSCosting;
