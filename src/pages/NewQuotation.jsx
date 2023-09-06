import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import {
//   ,
//   createQuotation,
//   getQuotationIDs,
//   getQuotationByID,
// } from "../features/quotations/quotationSlice";
import Spinner from "../components/Spinner";
import {
  getEnquiryByID,
  getEnquiryIDs,
} from "../features/enquiries/enquirySlice";
import {
  materialsSchema,
  preQuotationsSchema,
  quotationSchema,
  quotationsSchema,
} from "../validationSchemas/quotationValidation";

import removeIcon from "../resources/remove.svg";
import {
  createQuotation,
  reset as quotationReset,
} from "../features/quotations/quotationSlice";

import arrowUpIcon from "../resources/arrow-up.svg";
import arrowDownIcon from "../resources/arrow-down.svg";
import { getItemsFromDesign } from "../features/designs/designSlice";

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
  } = useSelector((state) => state.quotation);

  const {
    isLoading: designIsLoading,
    isError: designIsError,
    isSuccess: designIsSuccess,
    message:designMessage,
    enquiryDesignItems
  } = useSelector((state) => state.design);

  const {
    isLoading: enquiryIsLoading,
    isError: enquiryIsError,
    isSuccess: enquiryIsSuccess,
    message: enquiryIsmessage,
    enquiryIDs,
    enquiry,
  } = useSelector((state) => state.enquiry);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [client_name, setClient_name] = useState("");
  const [inquiry_number, setInquiry_number] = useState("");
  const [sitemeasurements, setSitemeasurements] = useState(false);
  const [IHT_Member, setIHT_Member] = useState("");
  const [brief, setBrief] = useState("");

  const [location, setLocation] = useState("create quotation");
  const [itemIndex, setItemIndex] = useState(0);

  const [itemInputSets, setItemInputSets] = useState([
    {
      created_date: new Date().toISOString(),
      site_measurements: false,
      item_code: "",
      itemname: "",
      description: "",
      qty: 0,
      rate: 0,
      comments: "",
      amount: 0,
      label: "",
    },
  ]);

  useEffect(()=>{
    if(enquiryDesignItems.length > 0){
      const initialItemInputSets = enquiryDesignItems.map((item)=>{
        return {
          created_date: new Date().toISOString(),
          site_measurements: false,
          item_code: "",
          itemname: item.itemname,
          description: "",
          qty: 0,
          rate: 0,
          comments: item.comment || '',
          amount: 0,
          label: "",
        }
      })

      setItemInputSets(initialItemInputSets)
    }
  },[enquiryDesignItems])

  const itemsSet = [
    {
      index_no: 1,
      category: "Timber",
      Description: "Local Teak 1”",
      last_purchased_price: 1250.0,
      purchased_store: "",
      unit: "Sq.Ft",
      threshold: 10,
      availability: 20,
    },
    {
      index_no: 2,
      category: "Timber",
      Description: "Local Teak 1 1/8”",
      last_purchased_price: 1250.0,
      purchased_store: "",
      unit: "Sq.Ft",
      threshold: 10,
      availability: 20,
    },
    {
      index_no: 3,
      category: "Boards",
      Description: "MDF 8 x 4 -9 mm",
      last_purchased_price: 5700.0,
      purchased_store: "",
      unit: "Sheet",
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

  const [categoryTotal, setCategoryTotal] = useState([])

  const [total, setTotal] = useState([])

  const [newComponent, setNewComponent] = useState({
    //"index_no": 1,
    category: "",
    Description: "",
    last_purchased_price: 0,
    purchased_store: "",
    unit: "",
    threshold: 10,
    availability: 20,
    qtyPerUnit: 0,
    costPerUnit: 0,
    material_qty: 0,
    total_material_cost: 0,
    remarks: "",
    active: true,
  });

  const onAddComponentSubmit = () => {
    let formattedNewComponent = {
      category: newComponent.category,
      Description: newComponent.Description,
      unit: newComponent.unit,
      last_purchased_price: newComponent.last_purchased_price,
      qtyPerUnit: newComponent.qtyPerUnit,
      costPerUnit: newComponent.costPerUnit,
      material_qty: newComponent.material_qty,
      total_material_cost: newComponent.total_material_cost,
      remarks: newComponent.remarks,
      active: false,
      // name: item.Description,
      // rate: item.last_purchased_price,
      purchased_store: "",
      threshold: 0,
      availability: 0,
    };

    let formattedNewCompToValidate = {
      category: newComponent.category,
      name: newComponent.Description,
      unit: newComponent.unit,
      rate: newComponent.last_purchased_price,
      material_qty: newComponent.material_qty,
      total_material_cost: newComponent.total_material_cost,
      remarks: newComponent.remarks,
      in_store: false,

      //last_purchased_price: newComponent.last_purchased_price,
      // qtyPerUnit: newComponent.qtyPerUnit,
      // costPerUnit: newComponent.costPerUnit,
      // active: true,
      // Description: newComponent.Description,
      // purchased_store: '',
      // threshold: 0,
      // availability: 0,
    };
    const { error } = materialsSchema.validate(formattedNewCompToValidate); // Corrected variable name and input data
    if (error) {
      console.log(error);
      toast.error(error.message);
      return null; // You might want to return something specific here
    } else {
      console.log("schema was valid");
    }

    let updatedItems = [...items]; // Copy the items array

    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex] = [
        ...updatedItems[itemIndex],
        formattedNewComponent,
      ];
      setItems(updatedItems);
    }
  };

  useEffect(() => {}, []);

  const handleAddItemInputSet = () => {
    setItemInputSets([
      ...itemInputSets,
      {
        created_date: new Date().toISOString(),
        site_measurements: false,
        item_code: "",
        itemname: "",
        description: "",
        qty: 0,
        rate: 0,
        comments: "",
        amount: 0,
        label: "",
      },
    ]);
  };

  const handleItemInputChange = (index, field, value) => {
    const updatedInputSets = [...itemInputSets];
    updatedInputSets[index][field] = value;
    if(field === 'qty'){
      updatedInputSets[index]['amount'] = value * updatedInputSets[index]['rate']
    }
    setItemInputSets(updatedInputSets);
  };

  const handleRemoveInputSet = (index) => {
    const updatedInputSets = itemInputSets.filter((_, i) => i !== index);
    setItemInputSets(updatedInputSets);

    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleItemValueChange = (itemIndex, index, field, value) => {
    let updatedItems = [...items]; // Copy the items array

    if (updatedItems[itemIndex]) {
      if (!updatedItems[itemIndex][index]) {
        updatedItems[itemIndex][index] = {}; // Initialize the inner array if it doesn't exist
      }
      updatedItems[itemIndex][index][field] = value; // Update the value at the specified indices

      if(field === 'last_purchased_price' || field === 'material_qty' || field === 'total_material_cost' ){
        updatedItems[itemIndex][index]['total_material_cost'] = parseFloat(updatedItems[itemIndex][index]['last_purchased_price']) * parseFloat(updatedItems[itemIndex][index]['material_qty'])
      }

      console.log(updatedItems);
      setItems(updatedItems);
    }

    if((field === 'last_purchased_price' || field === 'material_qty' || field === 'total_material_cost' || field === 'active')){ 
      console.log(items[itemIndex][index]['active'])

     let categoryTotalCopy =  [...categoryTotal] ;

     let catToChange = updatedItems[itemIndex][index]["category"];
     console.log(catToChange)

     if(!categoryTotalCopy[itemIndex]){
      categoryTotalCopy[itemIndex] = {}
     }

     categoryTotalCopy[itemIndex] [catToChange] = 0;

     updatedItems[itemIndex].map((item) => {
       if (item.category === catToChange && item.active === true) {
          console.log(item.active)
          console.log(categoryTotalCopy[itemIndex][catToChange])
          console.log( parseFloat(item["total_material_cost"] || 0))
         categoryTotalCopy[itemIndex][catToChange] =parseFloat(categoryTotalCopy[itemIndex][catToChange] || 0) + parseFloat(item["total_material_cost"] || 0);
       }
       return item;
     });

     console.log(categoryTotalCopy)
     setCategoryTotal(categoryTotalCopy);

     let totalSum = 0;

     console.log(categoryTotalCopy)
      for (const value of Object.values(categoryTotalCopy[itemIndex])) {
        console.log(parseFloat(value))
        totalSum +=  parseFloat(value);
      }

      const totalCopy = [...total]
      totalCopy[itemIndex] = totalSum
      setTotal(totalCopy)
  
      const itemInputSetscopy = [...itemInputSets]
      itemInputSetscopy[itemIndex]['rate'] = totalSum

      if(itemInputSets[itemIndex]['qty'] && itemInputSets[itemIndex]['qty'] > 0){
        itemInputSetscopy[itemIndex]['amount'] = itemInputSetscopy[itemIndex]['rate'] * itemInputSets[itemIndex]['qty']
      }

      setItemInputSets(itemInputSetscopy)
  }
  };

  const goToComponents = (index) => {
    setLocation("component");
    setItemIndex(index);
    console.log(index);

    if (items[index]) return;

    let updatedItems = [...items]; // Copy the items array

    //updatedItems[index] = null;
    updatedItems[index] = itemsSet;
    console.log(updatedItems);

    setItems(updatedItems);
  };

  const handleSave = () => {
    console.log(itemInputSets);

    const newItemsArray = items.map((subArray) =>
      subArray
        .filter((item) => item.active === true) // Filter active objects
        .map((item) => {
          if (item.index_no) {
            return {
              material_id: item.index_no,
              category: item.category,
              unit: item.unit,
              name: item.Description,
              rate: item.last_purchased_price,
              material_qty: item.material_qty,
              total_material_cost: item.total_material_cost,
              remarks: item.remarks,
              in_store: item.in_store || true,
            };
          } else {
            return {
              category: item.category,
              unit: item.unit,
              name: item.Description,
              rate: item.last_purchased_price,
              material_qty: item.material_qty,
              total_material_cost: item.total_material_cost,
              remarks: item.remarks,
              in_store: item.in_store || true,
            };
          }
        })
    );

    //validate materials
    newItemsArray.map((subArray) =>
      subArray.map((item) => {
        const { error } = materialsSchema.validate(item); // Corrected variable name and input data
        if (error) {
          console.log(error);
          toast.error(error.message);
          return null; // You might want to return something specific here
        }
        return item;
      })
    );


    if (newItemsArray.length !== itemInputSets.length) {
      toast.error("some items do not have quotation details");
      return null;
    }

    const newItemInputSetsArray = itemInputSets.map((itemInputSet, index) => ({
      ...itemInputSet,
      materials: newItemsArray[index],
    }));

    //validate quotations
    newItemInputSetsArray.map((ItemInputSet) => {
      const { error } = quotationSchema.validate(ItemInputSet); // Corrected variable name and input data
      if (error) {
        console.log(error);
        toast.error(error.message);
        return null; // You might want to return something specific here
      }
      return ItemInputSet;
    });

    const finalQuotationsObj = {
      Inquiry_id: inquiry_number,
      brief: brief,
      iht: IHT_Member,
      site_measurements: sitemeasurements,
      list: newItemInputSetsArray,
    };

    //validate quotations validate redundant
    const { error } = quotationsSchema.validate(finalQuotationsObj); // Corrected variable name and input data
    if (error) {
      console.log(error);
      toast.error(error.message);
      return null;
    }

    dispatch(createQuotation(finalQuotationsObj));

    
    
  };

  useEffect(() => {
    if (createQuotationIsError) {
      toast.error(message);
    }

    if (createQuotationIsSuccess) {
      toast.success("Quotation Added!");
      dispatch(quotationReset());
      navigate("/quotations");
    }

    // dispatch(reset());
  }, [
    isError,
    dispatch,
    isSuccess,
    navigate,
    message,
    createQuotationIsError,
    createQuotationIsSuccess,
  ]);

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(getEnquiryIDs());
  }, []);

  useEffect(() => {
    if (enquiry.client_name) {
      setClient_name(enquiry.client_name);
    }
  }, [enquiry]);

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  const onNext = () => {
    const preQuotationObj = {
      Inquiry_id: inquiry_number,
      brief: brief,
      iht: IHT_Member,
      site_measurements: sitemeasurements,
    };
    const { error } = preQuotationsSchema.validate(preQuotationObj);

    if (error) {
      toast.error(error.message);
      console.log(error);
    } else {
      setLocation("items");
      dispatch(getItemsFromDesign(inquiry_number))
    }
  };

  const onEnquiryIDSelect = (enquiryID) => {
    if (enquiryID) {
      setInquiry_number(parseInt(enquiryID));
      dispatch(getEnquiryByID(enquiryID));
    }
  };

  const handleSiteMeasurementsChange = (event) => {
    setSitemeasurements(event.target.value === "true"); // Update the selected option when a radio button is clicked
  };

  let lastRenderedCategory = null;

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <div className="text-sm breadcrumbs">
            <ul>
              {location && location === "create quotation" ? (
                <li>
                  <a
                  // onClick={() => setLocation("create quotation")}
                  >
                    Create Quotation
                  </a>
                </li>
              ) : (
                <></>
              )}
              {location && location === "items" ? (
                <>
                  <li>
                    <a onClick={() => setLocation("create quotation")}>
                      Create Quotation
                    </a>
                  </li>
                  <li>
                    <a>Items</a>
                  </li>
                </>
              ) : (
                <></>
              )}
              {location && location === "component" ? (
                <>
                  <li>
                    <a onClick={() => setLocation("create quotation")}>
                      Create Quotation
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setLocation("items")}>Items</a>
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
          <h1 className="font-bold text-2xl">Quotations</h1>
          <p className="text-xs">
            You are viewing every Quotations that's made so far...
          </p>
        </div>
      </div>
      <hr />

      <div className="w-[92%] bg-white">
        {/* <form onSubmit={onSubmit}></form> */}

        {location === "create quotation" ? (
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
                  onChange={(e) => onEnquiryIDSelect(e.target.value)}
                  value={enquiry.index_no}
                  className="select select-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded font-normal"
                >
                  <option value="" selected disabled>Select an enquiry ID</option>
                  {enquiryIDs.length > 0
                    ? enquiryIDs.map((enquiryID, index) => (
                        <>
                          <option key={index}>{enquiryID.index_no}</option>
                        </>
                      ))
                    : ""}
                </select>
              </p>
            </div>
            <div className="col-span-1 ">
              <p>
                <label className=" text-xs" htmlFor="">
                  IHT Client Service Member
                </label>
                <input
                  className="input input-sm  w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded"
                  type="text"
                  id="IHT_Member"
                  value={IHT_Member}
                  onChange={(e) => setIHT_Member(e.target.value)}
                />
              </p>
            </div>
            <div className="col-span-1">
              <label className="cursor-pointer label text-xs">
                Site Measurements
              </label>
              <div className="flex">
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="radio radio-xs mx-2"
                    id="sitemeasurements"
                    onChange={handleSiteMeasurementsChange}
                    name="sitemeasurements"
                    value={sitemeasurements === true}
                  />
                  <p className=" text-sm">Yes</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="radio radio-xs mx-2"
                    id="sitemeasurements"
                    onChange={handleSiteMeasurementsChange}
                    name="sitemeasurements"
                    value={sitemeasurements === false}
                  />
                  <p className=" text-sm">No</p>
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
                  onChange={(e) => setBrief(e.target.value)}
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

        {location === "items" ? (
          <>
            <div className="lg:grid grid-cols-16 gap-1 bg-white p-5 pt-2 shadow-lg m-2 mt-2 lg:m-10 lg:mt-2">
              <div className=" col-span-16 flex justify-between pb-2">
                <h1 className=" text-xl font-semibold">Items</h1>
                <button
                  className="btn btn-sm text-base normal-case font-medium bg-white border"
                  onClick={handleAddItemInputSet}
                >
                  Add New Item
                </button>
              </div>

              <div className=" col-start-1 col-span-1 text-sm flex items-center">
                No
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Item Code *
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Item name
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Item label
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Description *
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Qty *
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Rate(LKR) *
              </div>
              <div className=" col-span-2 text-sm flex justify-center">
                Amount *
              </div>
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
                      onChange={(e) =>
                        handleItemInputChange(
                          index,
                          "item_code",
                          e.target.value
                        )
                      }
                      className="input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={inputSet.itemname}
                      onChange={(e) =>
                        handleItemInputChange(index, "itemname", e.target.value)
                      }
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={inputSet.label}
                      onChange={(e) =>
                        handleItemInputChange(index, "label", e.target.value)
                      }
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={inputSet.description}
                      onChange={(e) =>
                        handleItemInputChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={inputSet.qty}
                      onChange={(e) =>
                        handleItemInputChange(index, "qty", e.target.value)
                      }
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Rate"
                      value={inputSet.rate}
                      onChange={(e) =>
                        handleItemInputChange(index, "rate", e.target.value)
                      }
                      readOnly
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      type="text"
                      placeholder="Amount"
                      value={inputSet.amount}
                      onChange={(e) =>
                        handleItemInputChange(index, "amount", e.target.value)
                      }
                      readOnly
                      className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                    />
                  </div>
                  <div className=" col-span-1">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className=" m-1 text-3xl">
                        ...
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
                      >
                        <li>
                          <button
                            onClick={() => handleRemoveInputSet(index)}
                            className=" "
                          >
                            Remove item
                            {/* <img src={removeIcon} className=" max-w-none w-[24px]" alt="add input set" /> */}
                          </button>
                        </li>
                        <li>
                          <div onClick={() => goToComponents(index)}>
                            component
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex w-full justify-end px-12">
              <div className="">
                <button className="btn btn-sm m-1 text-sm normal-case font-medium">
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

        {location === "component" ? (
          <>
            <div className="lg:grid grid-cols-10 gap-1 bg-white p-5 pt-2 shadow-lg m-2 mt-2 lg:m-10 lg:mt-2">
              <div className=" col-span-10 flex justify-between pb-2">
                <h1 className=" text-xl font-semibold">Items</h1>
                <button
                  className="btn btn-sm text-base normal-case font-medium bg-white border"
                  onClick={() => window.add_component_modal.showModal()}
                >
                  Add New Component
                </button>
              </div>

              <dialog id="add_component_modal" className="modal">
                <form
                  method="dialog"
                  className="modal-box rounded-md lg:min-w-[800px] p-1 min-h-[600px] relative"
                >
                  <div
                    //key={index}
                    className=" col-span-2 grid grid-cols-2 gap-1 bg-white p-5  m-5"
                  >
                    <div className="col-span-1 flex flex-col">
                      <label className=" text-xs ml-1" htmlFor="Category">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="category"
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                        value={newComponent.category}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <p>
                        <label className=" text-xs ml-1" htmlFor="Description">
                          Description
                        </label>
                        <input
                          type="text"
                          placeholder="Description"
                          className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                          value={newComponent.Description}
                          onChange={(e) =>
                            setNewComponent({
                              ...newComponent,
                              Description: e.target.value,
                            })
                          }
                        />
                      </p>
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <label className=" text-xs ml-1" htmlFor="Unit">
                        Unit
                      </label>
                      <input
                        type="text"
                        placeholder="Unit"
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                        value={newComponent.unit}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            unit: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <label className=" text-xs ml-1" htmlFor="Rate">
                        Rate
                      </label>
                      <input
                        type="text"
                        placeholder="Rate"
                        value={newComponent.last_purchased_price}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            last_purchased_price: e.target.value,
                          })
                        }
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <label className=" text-xs ml-1" htmlFor="Qty per unit">
                        Qty per unit
                      </label>
                      <input
                        type="text"
                        placeholder="Qty per unit"
                        value={newComponent.qtyPerUnit}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            qtyPerUnit: e.target.value,
                          })
                        }
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <label className=" text-xs ml-1" htmlFor="cost per unit">
                        cost per unit
                      </label>
                      <input
                        type="number"
                        placeholder="cost per unit"
                        value={newComponent.costPerUnit}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            costPerUnit: e.target.value,
                          })
                        }
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <label
                        className=" text-xs ml-1"
                        htmlFor="Total material qty"
                      >
                        Total material qty
                      </label>
                      <input
                        type="text"
                        placeholder="Total material qty"
                        value={newComponent.material_qty}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            material_qty: e.target.value,
                          })
                        }
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col">
                      <label
                        className=" text-xs ml-1"
                        htmlFor="total_material_cost"
                      >
                        Total Material Cost
                      </label>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={newComponent.total_material_cost}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            total_material_cost: e.target.value,
                          })
                        }
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                    <div className=" col-span-2 flex flex-col">
                      <label className=" text-xs ml-1" htmlFor="Remarks">
                        Remarks
                      </label>
                      <input
                        type="text"
                        placeholder="Remarks"
                        value={newComponent.remarks}
                        onChange={(e) =>
                          setNewComponent({
                            ...newComponent,
                            remarks: e.target.value,
                          })
                        }
                        className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 p-5">
                    <button
                      className="btn btn-sm m-1 text-sm normal-case font-medium"
                      onClick={() => window.add_component_modal.close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
                      onClick={onAddComponentSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </dialog>

              <div className=" col-start-1 col-span-1 text-sm flex items-center"></div>
              <div className=" col-span-2 text-sm flex justify-center">
                Description
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Unit
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Rate(Rs)
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Qty per Unit
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Cost per Unit
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Total Material Qty
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Total Material Cost
              </div>
              <div className=" col-span-1 text-sm flex justify-center">
                Remarks
              </div>

              {items &&
                items[itemIndex] &&
                items[itemIndex].map((item, index) => {
                  
                  let shouldRenderCategory =
                    item.category !== lastRenderedCategory;

                  if (shouldRenderCategory) {
                    lastRenderedCategory = item.category;
                  }

                  let isCategoryCollapsed = collapsedCategories.includes(
                    item.category
                  );

                  return (
                    <div
                      key={index}
                      //key={item.index_no}
                      className=" col-span-10 lg:grid grid-cols-10 gap-1 bg-white "
                    >
                      

                      {shouldRenderCategory && (
                        <div
                          className="col-span-10 bg-[#D9D9D9] py-2 px-5 flex justify-between"
                          onClick={() => toggleCategoryCollapse(item.category)}
                          style={{ cursor: "pointer" }}
                        >
                          <p>{item.category}</p>
                          <img
                            className={`${
                              isCategoryCollapsed ? "V" : "hidden"
                            } w-5`}
                            src={arrowDownIcon}
                          />
                          <img
                            className={`${
                              !isCategoryCollapsed ? "V" : "hidden"
                            } w-5`}
                            src={arrowUpIcon}
                          />
                        </div>
                      )}

                      {shouldRenderCategory && !isCategoryCollapsed && (
                        <div className="col-span-10 bg-[#BDE3FF] py-2 px-5 flex ">
                        <p>Total Cost</p>
                        <p className=" px-5">{ categoryTotal[itemIndex] && categoryTotal[itemIndex][item.category] && (categoryTotal[itemIndex][item.category])}</p>
                      </div>
                      )}
                      
                      {!isCategoryCollapsed && (
                        <>
                          <div className="col-span-1 flex justify-center items-center">
                            <input
                              id="active"
                              type="checkbox"
                              className="checkbox checkbox-sm "
                              checked={item.active}
                              value={item.active}
                              onChange={(e) =>
                                handleItemValueChange(
                                  //item
                                  itemIndex,
                                  index,
                                  "active",
                                  e.target.checked
                                )
                              }
                            />
                          </div>
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
                                handleItemValueChange(
                                  itemIndex,
                                  index,
                                  "last_purchased_price",
                                  e.target.value
                                )
                              }
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Qty per unit"
                              value={item.qtyPerUnit}
                              onChange={(e) =>
                                handleItemValueChange(
                                  itemIndex,
                                  index,
                                  "qtyPerUnit",
                                  e.target.value
                                )
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
                                handleItemValueChange(
                                  itemIndex,
                                  index,
                                  "costPerUnit",
                                  e.target.value
                                )
                              }
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Total material qty"
                              value={item.material_qty}
                              onChange={(e) =>
                                handleItemValueChange(
                                  itemIndex,
                                  index,
                                  "material_qty",
                                  e.target.value
                                )
                              }
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Amount"
                              value={item.total_material_cost}
                              // onChange={(e) =>
                              //   handleItemValueChange(
                              //     itemIndex,
                              //     index,
                              //     "total_material_cost",
                              //     e.target.value
                              //   )
                              // }
                              disabled
                              className=" input input-sm outline-none text-gray-600 disabled:text-black  bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>
                          <div className=" col-span-1">
                            <input
                              type="text"
                              placeholder="Remarks"
                              value={item.remarks}
                              onChange={(e) =>
                                handleItemValueChange(
                                  itemIndex,
                                  index,
                                  "remarks",
                                  e.target.value
                                )
                              }
                              className=" input input-sm outline-none text-gray-600 bg-[#F2F3F5] rounded w-4/5 m-1 p-0"
                            />
                          </div>

                          {/* {shouldRenderCategory && (
                            <div className="col-span-10 bg-[#BDE3FF] py-2 px-5 flex justify-between">
                              <p>Total Cost</p>
                              <p></p>
                            </div>
                          )} */}
                        </>
                      )}



                    
                    </div>
                  );
                })}

              <div className="col-span-10 bg-[#C94E4E4F] py-2 px-5 flex justify-between">
                <p>Total Cost</p>
                <p>{total[itemIndex] && (total[itemIndex])}</p>
              </div>
            </div>

            <div className=" flex w-full justify-end px-12">
              <div className="">
                <button className="btn btn-sm m-1 text-sm normal-case font-medium">
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
