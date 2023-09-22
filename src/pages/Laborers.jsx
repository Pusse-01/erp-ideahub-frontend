import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import Spinner from '../components/Spinner';
import StoresItem from '../components/StoresItem';
import HeadCard from '../components/HeadCard';
import { toast } from 'react-toastify';

import folderIcon from '../resources/folder.svg';
import infoIcon from '../resources/Info.svg';
import refreshIcon from '../resources/refresh.svg';

import {
  getAllStoreItems,
  getLowStockItems,
  getNoStockItems,
  reset,
  getItemCountAll,
  getLowStockItemCount,
  getItemCategoryCount,
  getAllInventoryItemCategories,
  getStoreItemsByCategory,
} from '../features/stores/storesSlice';

function Laborers() {
  // get global state
  const {
    storeItems,
    isLoading,
    allStoreItemCount,
    lowStockItemCount,
    itemCategoryCount,
    storeItemCategories,
    getAllStoreItemsIsSuccess,
    getAllStoreItemsIsError,
    getLowStockItemsIsSuccess,
    getLowStockItemsIsError,
    getNoStockItemsIsSuccess,
    getNoStockItemsIsError,
    deleteStoreItemIsSuccess,
    deleteStoreItemIsError,
    getAllStoreItemCountIsSuccess,
    getAllStoreItemCountIsError,
    getLowStockItemCountIsSuccess,
    getLowStockItemCountIsError,
    getItemCategoryCountIsSuccess,
    getItemCategoryCountIsError,
    getAllInventoryItemCategoriesIsSuccess,
    getAllInventoryItemCategoriesIsError,
    getStockItemsByCategoryIsSuccess,
    getStockItemsByCategoryIsError,
  } = useSelector((state) => state.stores);

  // local state
  const [filter, setFilter] = useState('All');
  const [inventoryItems, setInventoryItems] = useState([]);

  const dispatch = useDispatch();

  // get statistics and handle results
  useEffect(() => {
    dispatch(getItemCountAll());
    dispatch(getLowStockItemCount());
    dispatch(getItemCategoryCount());
    dispatch(getAllInventoryItemCategories());

    if (getAllStoreItemCountIsError) {
      toast.error('Failed to get total item count');
    }

    if (getLowStockItemCountIsError) {
      toast.error('Failed to get low stock item count');
    }

    if (getItemCategoryCountIsError) {
      toast.error('Failed to get item category count');
    }

    if (getAllInventoryItemCategoriesIsError) {
      toast.error('Failed to get inventory item categories');
    }

    //run on unmount
    return () => {
      if (getAllStoreItemsIsSuccess) {
        dispatch(reset());
      }
    };
  }, [
    deleteStoreItemIsSuccess,
    getAllStoreItemsIsError,
    getAllStoreItemCountIsSuccess,
    getAllStoreItemCountIsError,
    getLowStockItemCountIsSuccess,
    getLowStockItemCountIsError,
    getItemCategoryCountIsSuccess,
    getItemCategoryCountIsError,
    getAllInventoryItemCategoriesIsError,
    getAllInventoryItemCategoriesIsSuccess,
  ]);

  // handle item delete
  useEffect(() => {
    if (deleteStoreItemIsError) {
      toast.error('Failed to delete store item');
    }

    if (deleteStoreItemIsSuccess) {
      toast.success('Item deleted successfully');
    }
  }, [deleteStoreItemIsSuccess, deleteStoreItemIsError]);

  // handle filter change
  useEffect(() => {
    if (filter == 'All') {
      dispatch(getAllStoreItems());
    } else if (filter == 'low-stock') {
      dispatch(getLowStockItems());
    } else if (filter == 'no-stock') {
      dispatch(getNoStockItems());
    } else {
    }

    switch (filter) {
      case 'All':
        dispatch(getAllStoreItems());
        break;
      case 'low-stock':
        dispatch(getLowStockItems());
        break;
      case 'no-stock':
        dispatch(getNoStockItems());
        break;
      default:
        dispatch(getStoreItemsByCategory(filter));
        break;
    }
  }, [filter, deleteStoreItemIsSuccess]);

  // handle response for no filter
  useEffect(() => {
    if (filter === 'All') {
      if (getAllStoreItemsIsSuccess) {
        setInventoryItems(storeItems);
      } else if (getAllStoreItemsIsError) {
        toast.error('Failed get all stock items');
      }
    }
  }, [getAllStoreItemsIsSuccess]);

  // handle response for 'low-stock' filter
  useEffect(() => {
    if (filter === 'low-stock') {
      if (getLowStockItemsIsSuccess) {
        setInventoryItems(storeItems);
      } else if (getLowStockItemsIsError) {
        toast.error('Failed get low stock items');
      }
    }
  }, [getLowStockItemsIsSuccess]);

  // handle response for 'no-stock' filter
  useEffect(() => {
    if (filter === 'no-stock') {
      if (getNoStockItemsIsSuccess) {
        setInventoryItems(storeItems);
      } else if (getNoStockItemsIsError) {
        toast.error('Failed get no stock items');
      }
    }
  }, [getNoStockItemsIsSuccess]);

  // handle response for 'category' filters
  useEffect(() => {
    if (!['low-stock', 'no-stock', 'All'].includes(filter)) {
      if (getStockItemsByCategoryIsSuccess) {
        setInventoryItems(storeItems);
      } else if (getStockItemsByCategoryIsError) {
        toast.error('Failed get no stock items by category');
      }
    }
  }, [getStockItemsByCategoryIsSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  const selectedFilter = (e) => {
    setFilter(e.target.id);
  };

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="grid grid-cols-3 gap-7 w-[92%] mt-7 ">
          <HeadCard icon={folderIcon} value={itemCategoryCount} heading={'Total Laborers'} />
          <HeadCard icon={infoIcon} value={allStoreItemCount} heading={'Busy'} />
          <HeadCard icon={refreshIcon} value={lowStockItemCount} heading={'Available'} />
        </div>
        <div className=" inline-block bg-white mt-5 w-[92%] p-5">
          <h className="font-bold text-2xl">Laborers</h>
          <p className=" font-normal text-base text-[#9FA1A6]">All manual workers performing physical tasks</p>
        </div>
        <hr />
        <div className=" grid grid-cols-12 grid-flow-row gap-1 lg:gap-2 bg-white w-[92%] p-1 lg:p-5">
          <div className="col-start-1 col-span-2 dropdown dropdown-bottom dropdown-end m-1">
            <label tabIndex={0} className="btn min-h-[40px] h-[40px] min-w-[180px] m-0 ">
              <img src={require('../resources/call.png')} className=" justify-center items-center" />
              {filter}
              <img src={require('../resources/darrow.png')} className=" justify-center items-center" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-40 ">
              <li>
                <a id="All" onClick={selectedFilter}>
                  All
                </a>
              </li>
              <li>
                <a id="busy" onClick={selectedFilter}>
                  Busy
                </a>
              </li>
              <li>
                <a id="available" onClick={selectedFilter}>
                  Available
                </a>
              </li>
              {/* {storeItemCategories.length > 0
								? storeItemCategories.map(({ category }) => (
										<li id={category}>
											<a
												id={`${category}`}
												onClick={selectedFilter}>
												{category}
											</a>
										</li>
								  ))
								: null} */}
            </ul>
          </div>
          {/* search items - to be implemented in the backend later */}
          {/* <form class="flex flex-row focus-within:outline-[#1b53c5] focus-within:outline rounded bg-[#F2F3F5] min-h-0 h-[40px] m-1 w-[310px]">
						<span class="flex items-center rounded rounded-l-none border-0 px-2 ">
							<button>
								<img
									src={require('../resources/charm_search.png')}
									className=" justify-center items-center"
								/>
							</button>
						</span>
						<input
							class=" py-2 lg:w-full px-2 outline-none text-gray-600 bg-[#F2F3F5] rounded text-sm  min-w-[120px]"
							type="text"
							placeholder="Search or type a command (Ctrl + G)"
							// value={project_start ? project_start.toISOString().slice(0, 10) : null}
							// onChange={handleProject_startDateSelect}
						/>
					</form> */}
          <div className="col-start-10 col-span-2">
            <Link to="/new-inventory-item" className="font-medium">
              <button
                type="button"
                className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[128px]"
              >
                Add New Item
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm text-center">
          <div className="col-start-1 col-span-1">No.</div>
          <div className="col-start-2 col-span-1 ">Category</div>
          <div className="col-start-3 col-span-2 ">Description</div>
          <div className="col-start-5 col-span-2 ">Last Purchased Price</div>
          <div className="col-start-7 col-span-1 ">Unit</div>
          <div className="col-start-8 col-span-2 ">Threshold Amount</div>
          <div className="col-start-10 col-span-1 pl-1">Availability</div>
          <div className="col-start-11 col-span-1">More</div>
          <hr className="col-span-12 mx-3 my-3" />
        </div>

        <div className="grid grid-cols-12  grid-flow-row bg-white w-[92%] text-sm text-center">
          {inventoryItems.length > 0
            ? inventoryItems.map((storeItem) => (
                <>
                  <StoresItem key={storeItem.index_no} storeItem={storeItem} />
                  <hr className="col-span-12 mx-3 my-2" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default Laborers;
