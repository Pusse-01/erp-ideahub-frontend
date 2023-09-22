import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary -mt-20 -ml-14"></span>
    </div>
  );
}

export default Spinner;
