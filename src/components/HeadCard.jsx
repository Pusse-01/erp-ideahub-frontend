import React from "react";

function HeadCard({ icon, value, heading }) {
  return (
    <div className="col-span-1 bg-white h-[110] shadow-[0px_0px_20px_0px_#00000003] rounded-[10px] p-5 md:p-[30px] inline-block w-full">
      {/* <div className=" h-[50px] w-[50px] rounded-full f9 float-left md:flex items-center justify-center hidden">{icon || <img src={require("../resources/material-symbols_folder-open-rounded.png")} className="h-5  m-auto" />}</div> */}
      <div className=" h-[50px] w-[50px] rounded-full f9 float-left md:flex items-center justify-center hidden">{<img src={icon} /> || <img src={require("../resources/material-symbols_folder-open-rounded.png")} className="h-5  m-auto" />}</div>
      <div className=" float-left text-xs md:text-sm pl-4">
        { value ? <h className=" font-semibold text-xl"> {value}</h> : <h className=" font-semibold text-xl"> 28</h>}
        { heading ? <p>{heading}</p> : <p>Total Projects</p>}
      </div>
    </div>
  );
}

export default HeadCard;
