import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { downloadBom, reset } from '../features/pdf/pdfSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function BOMItem({ BOM }) {
  console.log(BOM);

  const location = useLocation();

  const showStatus = () => {
    switch (BOM.purchase_status) {
      case 'Pending Purchase':
        return (
          <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm  ">Pending</div>
        );
      case 'Approved':
        return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Approved</div>;
      case 'Revision':
        return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Revision</div>;
      case 'Rejected':
        return <div className=" rounded p-2 bg-[#FBF5C4] text-[#8B5401] inline-block text-xs lg:text-sm">Rejected</div>;
      case 'Completed':
        return <div className=" rounded p-2 bg-[#97FAB8] text-[#14AE5C] text-xs lg:text-sm inline-block">Complete</div>;
    }
  };

  const dispatch = useDispatch();

  const { isLoading, isSuccess, downloadPDFIsError, downloadPDFIsSuccess, message } = useSelector((state) => state.pdf);

  useEffect(() => {
    if (downloadPDFIsError) {
      toast.error('PDF Download Error');
    }

    if (downloadPDFIsSuccess) {
      toast.success('PDF Download Success');
    }

    dispatch(reset());
  }, [downloadPDFIsError, downloadPDFIsSuccess]);

  const handleDownload = () => {
    dispatch(
      downloadBom({
        Job_no: BOM.job_no,
        index_no: BOM.index_no,
      })
    );
  };

  return (
    <>
      <div className="col-start-1  "></div>
      <div className="col-start-2  ">{BOM.job_no}</div>
      <div className="col-start-3 col-span-2  ">{BOM.main_job_id}</div>
      <div className="col-start-5 col-span-2  ">{BOM.description}</div>
      <div className="col-start-7 col-span-2  "> {showStatus()}</div>
      <div className="col-start-9 col-span-2">
        <button className="btn btn-sm" onClick={handleDownload}>
          Download File
        </button>
      </div>
      {location.pathname && location.pathname === '/purchasings' ? (
        <div className="col-start-11 col-span-1 ">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className=" m-1 text-3xl">
              ...
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
              <li>
                <Link to={`/purchasings/${BOM.job_no}/edit`} className="">
                  Update Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default BOMItem;
