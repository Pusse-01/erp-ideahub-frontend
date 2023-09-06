import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { getStoreItem, addPurchaseRequest, reset } from '../features/stores/storesSlice';

function NewInventoryItemRequest() {
	//fetch item id from route
	const { itemId } = useParams();

	//fetch global state
	const { isLoading, storeItem, getStoreItemIsSuccess, getStoreItemIsError, addPurchaseRequestIsError, addPurchaseRequestIsSuccess} =
		useSelector((state) => state.stores);

	// local state
	const [itemCategory, setStoreItemCategory] = useState('');
	const [description, setDescription] = useState('');
	const [unit, setUnit] = useState('count');
	const [lastPurchasedPrice, setLastPurchasedPrice] = useState(0);
	const [amount, setAmount] = useState(1);
	const [supplier, setSupplier] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get item detaiils
	useEffect(() => {
		dispatch(getStoreItem(itemId));
		
		if (getStoreItemIsError) {
			toast.error("Couldn't get item details. Refresh to try again.");
		}

		if (getStoreItemIsSuccess) {
			setStoreItemCategory(storeItem.category);
			setDescription(storeItem.description);
			setUnit(storeItem.unit);
			setLastPurchasedPrice(storeItem.last_purchased_price)
		}
	}, [getStoreItemIsSuccess,getStoreItemIsError]);

	// handle form submit action results
	useEffect(() => {
		if (addPurchaseRequestIsError) {
			toast.error('Failed to create purchase request');
			dispatch(reset());
		}

		if (addPurchaseRequestIsSuccess) {
			toast.success('Purchase request created successfully!');
			dispatch(reset());
			navigate('/stores');
		}
	}, [addPurchaseRequestIsError,addPurchaseRequestIsSuccess]);

	// handle input changes
	const onStoreItemCategoryChange = (storeItemCategory) => {
		setStoreItemCategory(storeItemCategory);
	};

	const onDescriptionChange = (description) => {
		setDescription(description);
	};

	const onSupplierChange = (supplier) => {
		setSupplier(supplier);
	};

	const onLastPurchasedPriceChange = (price) => {
		setLastPurchasedPrice(parseFloat(price));
	};

	const onAmountChange = (threshold) => {
		setAmount(parseFloat(threshold));
	};


	// submit form
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addPurchaseRequest({
				description : description,
				last_purchased_price : lastPurchasedPrice,
				amount : amount,
				created_date: (new Date()).toUTCString(),
				category : itemCategory,
				unit : unit,
				supplier : supplier,
				material_id : itemId,
				status : 'Pending'
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
					<h1 className="font-bold text-lg">New Inventory Request</h1>
					<p className="text-s my-3">
						Create a purchase request for an inventory item
					</p>
				</div>
			</div>
			<hr />
			<div className="w-[92%] bg-white">
				<form onSubmit={onSubmit}></form>
				<div className="lg:grid grid-cols-2 gap-2 bg-white p-5 shadow-lg m-2 lg:m-10">
					<div className="col-start-1 col-span-2 font-medium">
						<p>Request item</p>
					</div>
					<div className="col-start-1 col-span-1 ">
						<p>
							<label
								className="text-xs"
								for="">
								Description
							</label>
							<input
								className="input input-sm input-bordered w-full"
								type="text"
								id="description"
								value={description}
								onChange={(e) =>
									onDescriptionChange(e.target.value)
								}
								disabled
							/>
						</p>
					</div>
					<div className="ccol-start-2 col-span-1">
						<p>
							<label
								className="text-xs"
								for="">
								Category
							</label>
							<input
								className="input input-sm input-bordered w-full py-1.5 pl-7 pr-20"
								type="text"
								id="category"
								value={itemCategory}
								onChange={(e) =>
									onStoreItemCategoryChange(e.target.value)
								}
								disabled
							/>
						</p>
					</div>
					<div>
						<label
							htmlFor="last_purchased_price"
							className="text-xs">
							Last Purchased Price
						</label>
						<label className=" text-xs  text-xs text-[#FF0000]">
							{' '}
							*
						</label>
						<div className="relative">
							<input
								type="number"
								name="price"
								id="price"
								className=" input-sm block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
								placeholder=" 0.00"
								step="0.01"
								min={0}
								value={lastPurchasedPrice}
								onChange={(e) =>
									onLastPurchasedPriceChange(e.target.value)
								}
							/>
							<div className="absolute inset-y-0 right-0 flex items-center">
								<label
									htmlFor="currency"
									className="sr-only">
									Currency
								</label>
								<select
									id="currency"
									name="currency"
									className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
									<option>LKR</option>
								</select>
							</div>
						</div>
					</div>
					<div className="col-start-2 col-span-1">
						<p>
							<label
								className="text-xs"
								for="">
								Unit
							</label>
							<input
								className="input input-sm input-bordered w-full"
								type="text"
								id="unit"
								value={unit}
								disabled
							/>
						</p>
					</div>
					<div className="col-span-1 ">
						<p>
							<label
								className=" text-xs"
								for="">
								Amount
							</label>
							<input
								className="input input-sm input-bordered block w-full rounded-md  py-1.5 pl-7"
								type="number"
								id="threshold"
								step={0.01}
								value={amount}
								onChange={(e) => onAmountChange(e.target.value)}
							/>
						</p>
					</div>
					<div className="ccol-start-2 col-span-1">
						<p>
							<label
								className="text-xs"
								for="">
								Supplier
							</label>
							<input
								className="input input-sm input-bordered w-full"
								type="text"
								id="supplier"
								value={supplier}
								onChange={(e) =>
									onSupplierChange(e.target.value)
								}
							/>
						</p>
					</div>
					<div className="col-span-2 inline-block">
						<div className="float-right">
							<button
								className="btn btn-sm m-1 text-sm normal-case font-medium"
								onClick={() => navigate('/stores')}>
								Cancel
							</button>
							<button
								className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white ml-1 submit text-sm normal-case font-medium"
								onClick={onSubmit}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewInventoryItemRequest;
