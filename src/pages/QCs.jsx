import React, { useEffect } from 'react';

import { getQCs, reset as qcReset } from '../features/qcs/qcSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import QCItem from '../components/QCItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function QCs() {
  const { qcs, isLoading, isSuccess, deleteQCIsSuccess, deleteQCIsError, message } = useSelector((state) => state.qc);

  const dispatch = useDispatch();

  const [qcItems, setQcItems] = useState([]);
  const [curser, setCurser] = useState(1000);

  useEffect(() => {
    //run on unmount
    return () => {
      if (isSuccess) {
        //dispatch(reset());
      }
    };
  }, []);

  useEffect(() => {
    dispatch(getQCs(curser));
  }, []);

  useEffect(() => {
    if (qcs) {
      setQcItems(qcs);
    }
  }, [qcs]);

  //   useEffect(()=>{
  //     if(deleteQCIsError){
  //       toast.error(message)
  //     }
  //     if(deleteQCIsSuccess){
  //       toast.success("QC Deleted!")
  //       dispatch(getQCs({
  //         "stateFilter": activeTab,
  //         "daysCount": daysCount
  //       }));
  //     }
  //     dispatch(reset())
  //   }, [deleteQCIsError, deleteQCIsSuccess])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="drawer-content-custom f9">
        <div className="  bg-white mt-5 w-[92%] p-5 flex justify-between">
          <div>
            <h className="font-bold text-2xl">Quality Control</h>
            <p className=" font-normal text-base text-[#9FA1A6]">Quality Control Reports</p>
          </div>
          <div>
            <Link to="/new-qc" className="font-medium">
              <button
                type="button"
                className="btn h-[40px] btn-sm bg-[#5c4ec9] text-white hover:bg-[#4b3bc2] text-sm normal-case font-medium m-1 min-w-[128px]"
              >
                Create QC
                <img
                  src={require('../resources/ic_round-keyboard-arrow-right.png')}
                  className=" justify-center items-center"
                />
              </button>
            </Link>
          </div>
        </div>
        <hr />

        <div className=" lg:flex items-center justify-start bg-white w-[92%] p-1 lg:p-5"></div>

        <div className="grid grid-cols-9 grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base p-3 pl-6">
          <div className="col-start-1  ">No</div>
          <div className="col-start-2 ">Job No</div>
          <div className="col-start-3 col-span-2  ">Project Name</div>
          <div className="col-start-5 col-span-2  ">description</div>
          <div className="col-start-7 col-span-2  ">Status</div>
          <div className="col-start-9 col-span-1"></div>
          <hr className="col-span-9 my-3" />
        </div>

        <div className="grid grid-cols-9 grid-flow-row bg-white w-[92%] gap-1 lg:gap-2 text-sm lg:text-base p-3 pl-6">
          {qcs && qcs.length > 0
            ? qcs.map((qc) => (
                <>
                  <QCItem key={qc._id} qc={qc} />
                  <hr className="col-span-9  my-3" />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default QCs;
