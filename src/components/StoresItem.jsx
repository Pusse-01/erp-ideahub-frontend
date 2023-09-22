import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { deleteInventoryItem } from '../features/stores/storesSlice';

function StoresItem({ storeItem }) {
  const dispatch = useDispatch();

  const handleDeleteInventoryItem = () => {
    dispatch(deleteInventoryItem(parseInt(storeItem.index_no)));
  };

  return (
    <>
      <div className="col-start-1 col-span-1">{storeItem.index_no}</div>
      <div className="col-start-2 col-span-1 ">{storeItem.category}</div>
      <div className="col-start-3 col-span-2 ">{storeItem.description}</div>
      <div className="col-start-5 col-span-2 ">{storeItem.last_purchased_price}</div>
      <div className="col-start-7 col-span-1 ">{storeItem.unit}</div>
      <div className="col-start-8 col-span-2 ">{storeItem.threshold}</div>
      <div
        className={`col-start-10 col-span-1 pl-1 ${
          storeItem?.availability === 0
            ? 'text-[#FF0000]'
            : storeItem?.availability >= storeItem?.threshold
            ? 'text-[#0BDA51]'
            : 'text-[#FFBF00]'
        }`}
      >
        {storeItem.availability === 0 ? 'No Stocks' : storeItem.availability}
      </div>
      <div className="col-start-11 col-span-1">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="text-2xl">
            ...
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
            <li>
              <Link to={`/stores/${storeItem.index_no}/request`} className="">
                Request
              </Link>
            </li>
            <li>
              <Link to={`/stores/${storeItem.index_no}/edit`} className="">
                Edit
              </Link>
            </li>
            <li>
              <div onClick={handleDeleteInventoryItem}>Delete</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default StoresItem;
