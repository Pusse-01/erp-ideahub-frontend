import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

import { getStoreItem, getAllInventoryItemCategories, updateStoreItem, reset } from '../features/stores/storesSlice';

function UpdateStoreItem() {
  //fetch item id from route
  const { itemId } = useParams();

  //fetch global state
  const {
    isLoading,
    storeItem,
    storeItemCategories,
    getStoreItemIsSuccess,
    getStoreItemIsError,
    updateStoreItemIsSuccess,
    updateStoreItemIsError,
    getAllInventoryItemCategoriesIsSuccess,
    getAllInventoryItemCategoriesIsError,
  } = useSelector((state) => state.stores);

  // local state
  const [itemCategory, setStoreItemCategory] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('count');
  const [lastPurchasedPrice, setLastPurchasedPrice] = useState(0);
  const [availability, setAvailability] = useState(1);
  const [threshold, setThreshold] = useState(1);
  const [supplier, setSupplier] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get item detaiils
  useEffect(() => {
    dispatch(getStoreItem(itemId));
    dispatch(getAllInventoryItemCategories());

    if (getAllInventoryItemCategoriesIsError) {
      toast.error("Couldn't get inventory item categories. Refresh to try again.");
      return;
    }

    if (getStoreItemIsError) {
      toast.error("Couldn't get item details. Refresh to try again.");
      return;
    }

    if (getStoreItemIsSuccess) {
      setStoreItemCategory(storeItem.category);
      setDescription(storeItem.description);
      setUnit(storeItem.unit);
      setLastPurchasedPrice(storeItem.last_purchased_price);
      setThreshold(storeItem.threshold);
      setAvailability(storeItem?.availability);
      setSupplier(storeItem?.purchased_store);
    }
  }, [
    getStoreItemIsSuccess,
    getStoreItemIsError,
    getAllInventoryItemCategoriesIsError,
    getAllInventoryItemCategoriesIsSuccess,
  ]);

  // handle form submit action results
  useEffect(() => {
    if (updateStoreItemIsError) {
      toast.error('Failed to update store item');
      dispatch(reset());
    }

    if (updateStoreItemIsSuccess) {
      toast.success('Store item updated successfully!');
      dispatch(reset());
      navigate('/stores');
    }
  }, [updateStoreItemIsError, updateStoreItemIsSuccess]);

  // handle input changes
  const onDescriptionChange = (description) => {
    setDescription(description);
  };

  const onStoreItemCategorySelect = (storeItemCategory) => {
    setStoreItemCategory(storeItemCategory);
  };

  const onLastPurchasedPriceChange = (price) => {
    setLastPurchasedPrice(parseFloat(price));
  };

  const onUnitChange = (unit) => {
    setUnit(unit);
  };

  const onSupplierChange = (supplier) => {
    setSupplier(supplier);
  };

  const onAvailabilityChange = (amount) => {
    setAvailability(parseFloat(amount));
  };

  const onThresholdChange = (threshold) => {
    setThreshold(parseFloat(threshold));
  };

  // submit form
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateStoreItem({
        index_no: itemId,
        category: itemCategory,
        description: description,
        last_purchased_price: lastPurchasedPrice,
        purchased_store: supplier ?? '',
        unit: unit,
        threshold: threshold,
        availability: availability,
      })
    );
  };

  //loader
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="drawer-content-custom f9">
      <div className=" inline-block bg-white mt-5 w-[92%] p-5">
        <div className=" float-left">
          <h1 className="font-bold text-lg">Edit Store Item</h1>
          <p className="text-s my-3">Edit details of an inventory item</p>
        </div>
      </div>
      <hr />
      <div className="w-[92%] bg-white">
        <form onSubmit={onSubmit}></form>
        <div className="lg:grid grid-cols-2 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
          <div className="col-start-1 col-span-2 font-medium">
            <p>Edit an item</p>
          </div>
          <div className="col-start-1 col-span-1 ">
            <p>
              <label className="text-xs" for="">
                Description
              </label>
              <label className=" text-xs  text-xs text-[#FF0000]"> *</label>
              <input
                className="input input-sm input-bordered w-full"
                type="text"
                id="description"
                required
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
              />
            </p>
          </div>
          <div className="ccol-start-2 col-span-1">
            <p>
              <label className=" text-xs">Category</label>
              <label className=" text-xs  text-xs text-[#FF0000]"> *</label>
              <select
                onChange={(e) => onStoreItemCategorySelect(e.target.value)}
                value={itemCategory}
                className="select text-xs select-sm px-2 input-bordered w-full font-normal"
              >
                <option disabled selected>
                  Select an item category
                </option>
                {storeItemCategories.length > 0
                  ? storeItemCategories.map(({ category }) => (
                      <>
                        <option key={category}>{category}</option>
                      </>
                    ))
                  : null}
              </select>
            </p>
          </div>
          <div>
            <label htmlFor="last_purchased_price" className="text-xs">
              Last Purchased Price
            </label>
            <label className=" text-xs  text-xs text-[#FF0000]"> *</label>
            <div className="relative">
              <input
                type="number"
                name="price"
                id="price"
                required
                className=" input-sm block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                placeholder=" 0.00"
                step="0.01"
                min={0}
                value={lastPurchasedPrice}
                onChange={(e) => onLastPurchasedPriceChange(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  required
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>LKR</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-start-2 col-span-1">
            <p>
              <label className=" text-xs">Unit</label>
              <label className=" text-xs  text-xs text-[#FF0000]"> *</label>
              <select
                onChange={(e) => onUnitChange(e.target.value)}
                value={unit}
                className="select text-xs select-sm px-2 input-bordered w-full font-normal"
              >
                <option disabled>Select an unit of measurement</option>
                <option key="count">count</option>
                <option key="kg">kg</option>
                <option key="g">g</option>
                <option key="mg">mg</option>
                <option key="ounce">ounce</option>
                <option key="m">m</option>
                <option key="cm">cm</option>
                <option key="mm">mm</option>
                <option key="ft">ft</option>
                <option key="inch">Inch</option>
                <option key="sq_m">sq m</option>
                <option key="sq_cm">sq cm</option>
                <option key="sq_mm">sq mm</option>
                <option key="sq_ft">sq ft</option>
                <option key="sq_inch">sq Inch</option>
                <option key="cubic_m">cubic m</option>
                <option key="cubic_cm">cubic cm</option>
                <option key="cubic_mm">cubic mm</option>
                <option key="cubic_ft">cubic ft</option>
                <option key="cubic_inch">cubic Inch</option>
              </select>
            </p>
          </div>
          <div className="col-span-1 ">
            <p>
              <label className=" text-xs" for="">
                Amount
              </label>
              <input
                className="input input-sm input-bordered block w-full rounded-md  py-1.5 pl-7"
                type="number"
                id="amount"
                step={0.01}
                value={availability}
                onChange={(e) => onAvailabilityChange(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-1 ">
            <p>
              <label className=" text-xs" for="">
                Threshold
              </label>
              <label className=" text-xs  text-xs text-[#FF0000]"> *</label>
              <input
                className="input input-sm input-bordered block w-full rounded-md  py-1.5 pl-7"
                type="number"
                id="threshold"
                required
                step={0.01}
                value={threshold}
                onChange={(e) => onThresholdChange(e.target.value)}
              />
            </p>
          </div>
          <div className="ccol-start-2 col-span-1">
            <p>
              <label className="text-xs" for="">
                Supplier
              </label>
              <input
                className="input input-sm input-bordered w-full"
                type="text"
                id="supplier"
                value={supplier}
                onChange={(e) => onSupplierChange(e.target.value)}
              />
            </p>
          </div>
          <div className="col-span-2 inline-block">
            <div className="float-right">
              <button className="btn btn-sm m-1 text-sm normal-case font-medium" onClick={() => navigate('/stores')}>
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
    </div>
  );
}

export default UpdateStoreItem;
