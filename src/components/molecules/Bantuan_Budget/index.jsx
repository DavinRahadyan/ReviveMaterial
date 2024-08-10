// ../molecules/FloorCementEstimate/index.jsx
import React, { useState, useEffect } from "react";
import totalbudget from "@assets/icons/Dollar.svg";

const FloorCementEstimate = () => {

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mr-60  w-3/4">
      <h2 className="mb-6 text-xl font-bold md:text-2xl text-center">
        Estimasi Biaya
      </h2>
      {/* lg:text-lg */}
        <div className="flex flex-col items-center justify-center w-full">
            <img src={totalbudget} alt="Total Icon" className="w-24 mb-4 md:w-36" />
            <p className="mb-5  text-black text-sm text-justify md:text-base lg:text-lg ">
                Fitur ini merupakan fitur yang dapat membantu dalam menghitung kebutuhan dari seluruh fitur yang ada pada 
                Revive Material dengan cara menekan tambah pada setiap fitur estimasi. Di dalam tabel tersebut terdapat 
                detail mengenai history biaya yang dikeluarkan pada setiap fitur estimasi.
            </p>
        </div>
    </div>
  );
};

export default FloorCementEstimate;