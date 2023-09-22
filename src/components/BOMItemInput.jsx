import React from 'react';

function BOMItemInput({ index, onChange }) {
  return (
    <div className="bom-item grid grid-cols-11  grid-flow-row bg-white w-full gap-1 lg:gap-2 lg:text-base col-span-1 text-center font-medium">
      <input
        className=" col-start-2"
        type="text"
        placeholder="Category"
        onChange={(e) => onChange(index, 'category', e.target.value)}
      />
      <input
        className=" col-start-3"
        type="text"
        placeholder="Description"
        onChange={(e) => onChange(index, 'name', e.target.value)}
      />
      <input
        className=" col-start-4"
        type="text"
        placeholder="Unit"
        onChange={(e) => onChange(index, 'unit', e.target.value)}
      />
      <input
        className=" col-start-5"
        type="number"
        placeholder="Rate (LKR)"
        onChange={(e) => onChange(index, 'rate', parseFloat(e.target.value))}
      />
    </div>
  );
}

export default BOMItemInput;
